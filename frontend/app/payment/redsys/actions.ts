'use server'
import crypto from 'crypto-js';

const MERCHANT_KEY = process.env.NEXT_PUBLIC_REDSYS_KEY!; // Base64 key
const CURRENCY = '978'; // Euro
const TRANSACTION_TYPE = '0'; // Authorization
const TERMINAL = process.env.NEXT_PUBLIC_REDSYS_TERMINAL || '001';
const URL_OK = `${process.env.NEXT_PUBLIC_REDSYS_URL_OK}/payment/success`;
const URL_KO = `${process.env.NEXT_PUBLIC_REDSYS_URL_KO}/payment/failure`;
const MERCHANT_CODE = process.env.NEXT_PUBLIC_REDSYS_MERCHANT_CODE;

export async function initiatePayment(amount: number, orderId: string) {
    
    try {
        const amountInCents = Math.round(amount * 100).toString().padStart(4, '0');
        const paddedOrderId = orderId.padStart(6, '0').slice(-6);

        const merchantParameters = {
            DS_MERCHANT_AMOUNT: amountInCents,
            DS_MERCHANT_ORDER: paddedOrderId,
            DS_MERCHANT_MERCHANTCODE: MERCHANT_CODE,
            DS_MERCHANT_CURRENCY: CURRENCY,
            DS_MERCHANT_TRANSACTIONTYPE: TRANSACTION_TYPE,
            DS_MERCHANT_TERMINAL: TERMINAL,
            DS_MERCHANT_MERCHANTURL: process.env.NEXT_PUBLIC_REDSYS_URL_NOTIFICATION,
            DS_MERCHANT_URLOK: URL_OK,
            DS_MERCHANT_URLKO: URL_KO,
        };

        const merchantParametersBase64 = crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(JSON.stringify(merchantParameters)));
        let key = crypto.enc.Base64.parse(MERCHANT_KEY);
        if (key.sigBytes < 24) {
            key = key.concat(crypto.lib.WordArray.random(24 - key.sigBytes));
        }
        const iv = crypto.enc.Hex.parse('0000000000000000');
        const orderId3DES = crypto.TripleDES.encrypt(paddedOrderId, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.ZeroPadding }).ciphertext.toString(crypto.enc.Base64);
        const signature = crypto.HmacSHA256(merchantParametersBase64, crypto.enc.Base64.parse(orderId3DES)).toString(crypto.enc.Base64);

        return {
            success: true,
            url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
            params: {
                Ds_SignatureVersion: 'HMAC_SHA256_V1',
                Ds_MerchantParameters: merchantParametersBase64,
                Ds_Signature: signature,
            },
        };
    } catch (error) {
        console.error('Error initiating payment:', error);
        return { success: false, error: 'Failed to initiate payment' };
    }
}
