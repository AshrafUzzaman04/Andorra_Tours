import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import dateFormat from "dateformat";
import flatpickr from "flatpickr";
import { NumericFormat } from 'react-number-format';
import callFetch from "helpers/callFetch";

const Invoice = (props) => {
    let params = useParams();
    const { t } = useTranslation();
    const [invoiceId, setInvoiceId] = useState((props.id ? props.id : 0));
    const [quationId, setQuationId] = useState(0);
    const [auftragId, setAftragId] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [contactPersons, setContactPersons] = useState([]);
    const [data, setData] = useState([]);
    const [emails, setEmails] = useState([{ name: '', email: '', currentEmail: '' }]);
    const [items, setItems] = useState([{ id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]);
    const [itemSummery, setItemSummery] = useState({ items: [], emails: [], subTotal: 0, amountPerchantage: 30, discountPercentage: 0, discount: 0, taxPercentage: 19, tax: 0, total: 0 });
    const [quotation, setQuotation] = useState(0);
    const [saving, setSaving] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    const [createInv, setCreateInv] = useState(false);
    const submitBtnRef = useRef(null);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    useEffect(() => {
      if(props.isUpdate != 0){ 
        submitBtnRef.current.click();
      }
      
    }, [props.isUpdate]);

    useEffect(() => {
        var subTotal = 0;
        items.map((item) => {
            subTotal += item.total;
        }); 
        itemSummery.subTotal = subTotal;
        itemSummery.amount   = parseFloat((itemSummery.amountPerchantage / 100) * itemSummery.subTotal);
        // setSubtotal(subTotal);
        setValue('amountPerchantage', itemSummery.amountPerchantage);
        setValue('tax', itemSummery.taxPercentage);
        itemSummery.tax = parseFloat((itemSummery.amount * (itemSummery.taxPercentage / 100)).toFixed(2));
        itemSummery.discount = parseFloat((itemSummery.amount * (itemSummery.discountPercentage / 100)).toFixed(2));
        itemSummery.total = subTotal - itemSummery.discount + itemSummery.tax;
        itemSummery.items = items;
        setItemSummery(itemSummery);
        setRefresh2(refresh2 + 1);
    }, [refresh]);

    // const calculateInvoiceAmount = (perchantage) => {
    //     var amount = parseFloat((perchantage / 100) * subtotal).toFixed(2); 
    //     // alert(amount);
    //     // setSubtotal(amount);
    //     itemSummery.subTotal = amount; 
    //     itemSummery.tax = parseFloat((amount * (itemSummery.taxPercentage / 100)).toFixed(2));
    //     itemSummery.discount = parseFloat((amount * (itemSummery.discountPercentage / 100)).toFixed(2));
    //     itemSummery.total = amount - itemSummery.discount + itemSummery.tax;
    //     itemSummery.items = items;
    //     console.log(itemSummery);
    //     setItemSummery(itemSummery);
    //     setRefresh2(refresh2 + 1);
    // }

    useEffect(() => { }, [refresh2]);
    
    useEffect(() => {
        if(quationId > 0){
            callFetch("quation/" + quationId + "/edit", "GET", []).then((res) => {
                items[0].id = res.data.speicher;
                items[0].price = Number(res.data.gesami_netto);
                items[0].quantity = 1;
                items[0].currentPrice = Number(res.data.gesami_netto);
                items[0].total = items[0].currentPrice * items[0].quantity;
                setItems(items);
                
                setRefresh(refresh + 1);
                setRefresh2(refresh2 + 1);
            });
        }
    }, [quationId]);

    useEffect(() => {
        if(auftragId > 0){
            callFetch("order/" + auftragId + "/edit", "GET", []).then((res) => {
                items[0].id = 1;
                items[0].price = Number(res.data.order.netto);
                items[0].quantity = 1;
                items[0].currentPrice = Number(res.data.order.netto);
                items[0].total = items[0].currentPrice * items[0].quantity;
                setItems(items);
                setRefresh(refresh + 1);
                setRefresh2(refresh2 + 1);
            });
        }
    }, [auftragId]);

    useEffect(() => {
        setInvoiceId(props.id);
        flatpickr(".flat-pickr");
        if(invoiceId && invoiceId > 0){
          callFetch("invoices/" + invoiceId+"/edit", "GET", []).then((res) => {
               setData(res.data);
               //setValue('id', res.data.id);
               for (let [key, value] of Object.entries(res.data.invoice)) {
                    if(key == 'netto' || key == 'brutto'){
                        setValue(key, Number(value));
                    }else{
                        setValue(key, value);
                    }
               }
               let product_details = JSON.parse(res.data.invoice.product_details);
               setItemSummery(product_details);
               setItems(product_details.items);
               setRefresh(refresh + 1)
          });
        }else{
            if(props.orderId > 0){
                setAftragId(props.orderId);
                setQuationId(0);
                setValue('auftrag_id', props.orderId);
                setValue('quation_id', 0);
            }else if(props.quationId > 0){
                setQuationId(props.quationId);
                setAftragId(0);
                setValue('quation_id', props.quationId);
                setValue('auftrag_id', 0);
            }
 
                callFetch("invoices/create", "GET", []).then((res) => {
                    setValue('id', res.data.id);
                }); 
                
            
        } 
    }, [props]);

    function deleteProduct() {
        var titems = [];
        items.map((t) => {
            if (!t)
                return;
            titems.push(t);
        });
        setItems(titems);
        setRefresh(refresh + 1);
    }

    function deleteEmail() {
        var temails = [];
        emails.map((e) => {
            if (!e && e !== '')
                return;
            temails.push(e);
        });
        setEmails(temails);
        itemSummery.emails = temails;
        setItemSummery(itemSummery);
        setRefresh2(refresh2 + 1);
    }

    const onSubmit = (formData) => {
        setSaving(true);
        formData.brutto = itemSummery.total;
        formData.product_details = JSON.stringify(itemSummery);
        callFetch((invoiceId && invoiceId > 0 ? "invoices/" + invoiceId : 'invoices'), "POST", formData, setError).then((res) => {
            setSaving(false); 
            setInvoiceId(res.id);
            if (!res.ok) return;
            setQuotation(res.data);
            setSubmitSuccess(true);
        });
    };

  return (
    <div className="row">
            <div className="col-sm-12">
                <div className="card mb-4"> 
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            
                            {invoiceId && invoiceId > 0 ? (
                                <input type="hidden" defaultValue="PUT" {...register("_method")} />
                            ) : <></>}

                            <div className="row g-3">
                                <div className="col-md-3">
                                    <label>{t('Invoice Nr.')} *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={t('eg: 700001')}
                                        {...register("id", {
                                            required: true,
                                        })}
                                        readOnly
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.identity_number && errors.identity_number.message}</div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        
                                        {getValues('quation_id') > 0 ? (
                                            <>
                                                <label>
                                                    {t('Angebot')} *
                                                </label>
                                                <br />

                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    {...register("quation_id", {
                                                        required: true,
                                                    })}
                                                    readOnly
                                                    required
                                                />
                                                <div className="invalid-feedback">{errors.quation_id && errors.quation_id.message}</div>                                            
                                            </>
                                        ) : getValues('auftrag_id') ? (
                                        <>
                                            <label>
                                                {t('Auftrag')} *
                                            </label>
                                            <br />
                                            <input
                                                type="number"
                                                className="form-control"
                                                {...register("auftrag_id", {
                                                    required: true,
                                                })}
                                                readOnly
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.auftrag_id && errors.auftrag_id.message}</div>                                        
                                        </>
                                        ) : <></>}
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="form-group">
                                        <label>
                                            {t('Currency')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("currency", {
                                                required: true,
                                            })}
                                            onChange={(e) => {
                                                setCurrency(e.target.value);
                                            }}
                                            readOnly
                                            required
                                        >
                                            <option value="EUR">EUR (€)</option>
                                            <option value="USD">USD ($)</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.currency && errors.currency.message}</div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label>
                                        {t('Invoice Date')} *
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control mb-4 flat-pickr"
                                        placeholder={t('eg. 2001-03-20')}
                                        defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
                                        {...register("quotation_date", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.start_date && errors.start_date.message}</div>
                                </div>
                            </div>

                            <div className="row mt-3 d-none">
                                <div className="col-md-12">
                                    <label>{t('Description')}</label>
                                    <textarea className="form-control" rows="3"
                                        defaultValue=""
                                        placeholder="eg. Description"
                                        {...register("description")}></textarea>
                                </div>
                            </div>

                            <div className="mt-3">
                                {items && items.map((item, i) => (
                                    <div key={i} className="d-none">
                                        {i > 0 && <hr />}
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <div>
                                                    <label>{t('Product')}</label>
                                                    <select value={items[i].id} className="form-control" placeholder={t('Select Product')} onChange={(e) => {
                                                        items[i].id = e.target.value;
                                                        items[i].title = '';
                                                        items[i].price = 0;
                                                        items[i].currentPrice =0;
                                                        items[i].quantity = 1;
                                                        items[i].total = 0;
                                                        setItems(items);
                                                        setRefresh(refresh + 1);
                                                    }}>
                                                        <option value="">--</option>
                                                        {data.products && data.products.map((product, i) => (
                                                            <option key={i} value={product.id}>{product.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-2">
                                                <div>
                                                    <label>{t('Qty/Hrs')}</label>
                                                    <input type="number" className="form-control" placeholder="eg. 0.00" defaultValue="1" onChange={(e) => {
                                                        let value = 0;
                                                        if (e.target.value.length && !isNaN(e.target.value))
                                                            value = e.target.value;
                                                        items[i].quantity = parseFloat(value);
                                                        items[i].total = items[i].currentPrice * items[i].quantity;
                                                        setItems(items);
                                                        setRefresh(refresh + 1);
                                                    }} />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <label>{t('Unit Price')}</label>
                                                <input type="number" className="form-control" placeholder="eg. 0.00" value={item.currentPrice ? item.currentPrice : ''} onChange={(e) => {
                                                    let value = 0;
                                                    if (e.target.value.length && !isNaN(e.target.value))
                                                        value = e.target.value;
                                                    items[i].currentPrice = parseFloat(value);
                                                    items[i].total = items[i].currentPrice * items[i].quantity;
                                                    setItems(items);
                                                    setRefresh(refresh + 1);
                                                }} />
                                            </div>
                                            <div className="col-md-2">
                                                <label>{t('Amount')}</label>
                                                <input type="number" className="form-control d-inline" style={{ width: '84%' }} placeholder="eg. 0.00" value={item.total} readOnly />
                                                &nbsp;
                                                <i className="fa-solid fa-circle-xmark text-danger" data-key={i} onClick={() => { delete items[i]; deleteProduct(); }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="row mt-3 d-none">
                                    <div className="col-md-12">
                                        <p className="btn btn-dark" style={{ cursor: 'pointer' }} onClick={() => { setItems([...items, { id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]); setRefresh(refresh + 1); }}><i className="fa-solid fa-circle-plus"></i>&nbsp;{t('Add Item')}</p>
                                    </div>
                                </div>

                                <hr />

                                <div className="row">
                                    <div className="col-md-6 offset-md-6 border">
                                        <div className="row">
                                            <div className="col-md-7 border-end">
                                                <label className="d-block text-end">{t('Sub Total')}</label>
                                                <select {...register('amountPerchantage')} onChange={(e) =>{ itemSummery.amountPerchantage = parseFloat(e.target.value); setItemSummery(itemSummery);
                                                    setRefresh(refresh + 1) }} className="form-control mb-2" style={{width: '70%', position: 'relative', left: '68px'}}>
                                                    <option value="0">--</option>
                                                    <option value="100">100%</option>
                                                    <option value="70">70%</option>
                                                    <option value="30">30%</option>
                                                </select>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="text-end">
                                                    <NumericFormat 
                                                        value={itemSummery.amount}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix={currency == 'EUR' ? ' € ' : ' $ '}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row border-top d-none">
                                            <div className="col-md-3 border-end">
                                                <label className="d-block text-end">{t('Discount')}</label>
                                            </div>
                                            <div className="col-md-3 border-end">
                                                <input type="number" className="form-control" onChange={(e) => {
                                                    let value = 0;
                                                    if (e.target.value.length && !isNaN(e.target.value))
                                                        value = e.target.value;
                                                    itemSummery.discountPercentage = parseFloat(value);
                                                    setItemSummery(itemSummery);
                                                    setRefresh(refresh + 1);
                                                }} />
                                            </div>
                                            <div className="col-md-1 border-end">
                                                <p className="text-end">%</p>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="text-end">
                                                    <NumericFormat 
                                                        value={itemSummery.discount}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix={currency == 'EUR' ? ' € ' : ' $ '}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row border-top">
                                            <div className="col-md-3 border-end">
                                                <label className="d-block text-end">{t('Tax')}</label>
                                            </div>
                                            <div className="col-md-4 border-end">
                                               <select {...register('tax')} className="form-control" onChange={(e) => {
                                                    let value = 19;
                                                    if (e.target.value.length && !isNaN(e.target.value))
                                                        value = e.target.value;
                                                    itemSummery.taxPercentage = parseFloat(value);
                                                    setItemSummery(itemSummery);
                                                    setRefresh(refresh + 1);
                                                }}>
                                                    <option value="19">19%</option>
                                                    <option value="0">0%</option> 
                                               </select>
                                            </div>
                                             
                                            <div className="col-md-5">
                                                <p className="text-end">
                                                    <NumericFormat 
                                                        value={itemSummery.tax}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix={currency == 'EUR' ? ' € ' : ' $ '}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row bg-gray-200">
                                            <div className="col-md-7">
                                                <label className="d-block text-end">{t('Total')}</label>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="text-end">
                                                    <NumericFormat 
                                                        value={itemSummery.amount + itemSummery.tax}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix={currency == 'EUR' ? ' € ' : ' $ '}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
 

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    {!saving && (
                                        <button type="submit" ref={submitBtnRef} className="btn btn-primary" style={{visibility: 'hidden'}}>
                                            {t('Save')}
                                        </button>
                                    )}
                                    {saving && (
                                        <button type="submit" className="btn btn-disabled" disabled style={{visibility: 'hidden'}}>
                                            {t('Saving ...')}
                                        </button>
                                    )} 
                                </div>
                            </div>
                        </form>

                        
                    </div>
                </div>
            </div>
             
        </div>
  )
}

export default Invoice