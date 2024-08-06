import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import dateFormat from "dateformat";
import flatpickr from "flatpickr";
import { NumericFormat } from 'react-number-format';
import Invoice from "./Invoice";
import SoftAlert from "components/SoftAlert";
import Overview from "./Overview";
import callFetch from "helpers/callFetch";


const Invoices = (props) => {
    let params = useParams();
    const { t } = useTranslation();  
    const [saving, setSaving] = useState(false);
    const [update, setUpdate] = useState(0);
    const [adding, setAdding] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [loadInv, setLoadInv] = useState(0);
    const [receivedError, setReceivedError] = useState(null);

    useEffect(() => { 
        callFetch("get-invoices/" + props.orderId, "GET", []).then((res) => { 
            setInvoices(res.invoices);
            setSaving(false);
        }); 
    }, [loadInv, update]);

    const addInvoice = () => {
        setAdding(true);
        callFetch("add-invoice/"+props.orderId, "GET", []).then((res) => {
            if(res.error){
                if(res.error == '100'){
                    setReceivedError(t('Inovice has created for receivable amount'));
                    setAdding(false);
                }else{
                    setReceivedError('No invoice created yet for this order. Save this and try to add another invoice.');
                    setAdding(false);
                }
            }else{
                setLoadInv(loadInv + 1);
                setAdding(false);
            } 
            
        });
    }
  return (
    <div className="row">
    <div className="col-sm-12">
        <Overview quation_id={props.quationId ? props.quationId : 0} title={t("Invoice")} />
        <div className="mb-4 mt-3"> 
            <div className="">
                {Array.isArray(invoices) && !invoices.length ? <Invoice projectid={props.projectid} quationId={props.quationId} orderId={props.orderId} isUpdate={update} /> : ''} 
                {invoices && invoices.map((inv) => 
                    <Invoice projectid={props.projectid} id={inv.id} quationId={props.quationId} orderId={props.orderId} isUpdate={update}/>
                )} 
                <div className="row mt-1"> 
                        {receivedError && <SoftAlert color="error" dismissible> {receivedError} </SoftAlert> }
                        <div className="col-md-12"> 
                            {!saving && (
                                <button type="button" className="btn btn-primary" onClick={() => {setUpdate(update + 1); setSaving(true); setLoadInv(loadInv+1) }}>
                                    {t('Save')}
                                </button>
                            )}
                            {saving && (
                                <button type="submit" className="btn btn-disabled" disabled>
                                    {t('Saving ...')}
                                </button>
                            )} 
                            {!adding && (
                                <button type="button" className="btn btn-primary" onClick={() => addInvoice()} style={{marginLeft: '5px'}}>
                                    {t('Add Invoice')}
                                </button>
                            )}
                            {adding && (
                                <button type="button" className="btn btn-disabled" disabled style={{marginLeft: '5px'}}>
                                    {t('Creating...')}
                                </button>
                            )} 
                        </div>
                    </div>
            </div>
        </div>
    </div>
    {/* <div className="col-sm-3"> 
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('Email')}</h6>
                </div>
                <div className="card-body">
                    <EmailForm id={params.id} invoices={invoices}/>
                </div>
            </div> 
    </div> */}
</div>
  )
}

export default Invoices