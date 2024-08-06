import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import CustomerCategoryModal from "../customer/CustomerCategoryModal";
import dateFormat from "dateformat";
import { NumericFormat } from 'react-number-format';

const OrderCreate = () => {
    const { t } = useTranslation();
    const params = useParams()
    const [customerId, setCustomerId] = useState(0);
    const [customer, setCustomer] = useState([]);
    const [contactPersons, setContactPersons] = useState([]);
    const [data, setData] = useState([]);
    const [editDelay, setEditDelay] = useState(0);
    const [emails, setEmails] = useState([{ name: '', email: '', currentEmail: '' }]);
    const [items, setItems] = useState([{ id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]);
    const [itemSummery, setItemSummery] = useState({ items: [], emails: [], subTotal: 0, discountPercentage: 0, discount: 0, taxPercentage: 20, tax: 0, total: 0 });
    const [currency, setCurrency] = useState('€');
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [quotation,setQuotation] = useState([])
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    const [orderId,setOrderId] = useState(0)
    const [quotationId,setQuotationId] = useState(0)
    const {
      register,
      handleSubmit,
      setError,
      setValue,
      formState: { errors },
  } = useForm();
  useEffect(() => {
    var subTotal = 0;
    items.map((item) => {
        subTotal += item.total;
    });
    itemSummery.subTotal = subTotal;
    itemSummery.tax = parseFloat((subTotal * (itemSummery.taxPercentage / 100)).toFixed(2));
    itemSummery.discount = parseFloat((subTotal * (itemSummery.discountPercentage / 100)).toFixed(2));
    itemSummery.total = subTotal - itemSummery.discount + itemSummery.tax;
    itemSummery.items = items;
    setItemSummery(itemSummery);
    setRefresh2(refresh2 + 1);
}, [refresh]);

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
  useEffect(() => {
    callFetch("order/create", "GET", []).then((res) => {
        setValue('order_nr', res.data.order_nr);
        setQuotation(res.data.quotation);
        setCustomer(res.data.customer)
        setData(res.data)
        setEditDelay(editDelay + 1);
    });
        
  }, [refresh]);

  useEffect(() => {
    if (customerId < 1)
        return;
    callFetch("quotations/contact-persons/" + customerId, "GET", []).then((res) => {
        setContactPersons(res.data);
        setValue('quotation_nr',res.quotation !== null ?res.quotation.id:'')
        setEmails([{ name: '', email: '', currentEmail: '' }]);
        itemSummery.emails = [];
        setItemSummery(itemSummery);
        setRefresh2(refresh2 + 1);
    });
}, [customerId]);

useEffect(() => {
    if (quotationId < 1)
        return;
    callFetch("quotations/customers/" + quotationId, "GET", []).then((res) => {
        setValue('customer_name',res?.data?.customer.id)
        const contacts = JSON.parse(res?.data?.customer?.contact_person)
        const product = JSON.parse(res?.data?.quotation?.product_details)
        for(let[key,value] of Object.entries(res?.data?.quotation)){
            setValue(key,value)
        }
         setContactPersons(contacts);
         setItems(product.items)
         setItemSummery(product);
    });
}, [quotationId]);

  useEffect(()=>{
    if (editDelay == 1){
        if(params.id){
            callFetch("quotations/"+ params.id,"GET", []).then((res) => {
                const product = JSON.parse(res.data.product_details)
                const contact = JSON.parse(res?.customer?.contact_person)
                 setValue('quotation_nr',res.data.id);
                 setValue('customer_name',res?.customer?.id)
                 for(let[key,value] of Object.entries(res.data)){
                    setValue(key,value)
                }
                setItems(product.items)
                setData(res.data)
                setItemSummery(product);
                setContactPersons(contact);
               
            });
        }
    }
  },[editDelay])

  const onSubmit = (formData) => {
      setSaving(true);
        formData.total = itemSummery.total;
        formData.subTotal = itemSummery.subTotal;
        formData.product_details = JSON.stringify(itemSummery);
      callFetch("order", "POST", formData, setError).then((res) => {
          setOrderId(res.data)
          setSaving(false);
          if (!res.ok) return;
          setSubmitSuccess(true);
      });
  };

  return submitSuccess ? <Navigate to={'/customer-management/orders/'+orderId+'/edit'} /> :
      <div className="row">
          <div className="col-12">
              <div className="card mb-4">
                  <div className="card-header pb-0">
                      <h6>{t('Create Order')}</h6>
                  </div>
                  <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                          <div className="row g-3">
                              <div className="col-md-3">
                                  <label>
                                      {t('Order Number')} *
                                  </label>
                                  <input
                                      type="text"
                                      className="form-control mb-4"
                                      placeholder={t('eg. 123')}
                                      {...register("order_nr", {
                                          required: true,
                                      })}
                                      readOnly
                                      required
                                  />
                                  <div className="invalid-feedback">{errors.order_nr && errors.order_nr.message}</div>
                              </div>
                              <div className="col-md-3">
                                  <label>
                                      {t('Customer Name')} *
                                  </label>
                                  <select className=" form-control" {...register("customer_name",{required: true,})} 
                                            onChange={(e) => {
                                                let customerId = e.target.value;
                                                setCustomerId(customerId);
                                            }} required >
                                    <option>----</option>
                                        {
                                            customer?.map(customer=>{
                                                return <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            })
                                        }
                                  </select>
                                  
                                  <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                              </div>
                              <div className="col-md-3">
                                  <label>
                                      {t('Quotation Nr.')}
                                  </label>
                                  <select className=" form-control"  {...register("quotation_nr",{required: true,})} required onChange={(e)=>{let quotation_nr = e.target.value; setQuotationId(quotation_nr)}} >
                                      <option>----</option>
                                      {
                                        quotation?.map(quot_nr=>{
                                            return <option key={quot_nr.id} value={quot_nr.id}>{quot_nr.identity_number}</option>
                                        })
                                      }
                                      
                                  </select>
                                  <div className="invalid-feedback">{errors.quotation_nr && errors.quotation_nr.message}</div>
                              </div>
                              <div className="col-md-3">
                                  <label>
                                      {t('Date')}
                                  </label>
                                  <input
                                      type="date"
                                      readOnly
                                      className="form-control mb-4"
                                      placeholder={t('eg. 98765432')}
                                      defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
                                      {...register("created_date",{required: true,})} required
                                  />
                                  <div className="invalid-feedback">{errors.created_date && errors.created_date.message}</div>
                              </div>
                          </div>

                          <div className="row g-3">
                                <div className="col-md-12">
                                    <label>{t('Title')} *</label>
                                    <input type="text" className="form-control" placeholder={t('eg. Title')}
                                        {...register("title", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.title && errors.title.message}</div>
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <label>{t('Description')}</label>
                                    <textarea className="form-control" rows="3"
                                        defaultValue="hiermit bestätigen wir den Eingang Ihrer Bestellung Zahl vom DD. Monat YYYY, gemäß unserem Angebot mit
                                        der Zahl 20180036."
                                        placeholder={"eg. " + t('Description')}
                                        {...register("description")}></textarea>
                                </div>
                            </div>
                            <div className="mt-3">

                            <div className="mt-3">
                                {items && items.map((item, i) => (
                                    <div key={i}>
                                        {i > 0 && <hr />}
                                        <div className="row mt-2">
                                            <div className="col-md-6">
                                                <label>{t('Product')}</label>
                                                <select value={item.id + '*' + item.price} className="form-control" placeholder={t('Select Product')} onChange={(e) => {
                                                    let idTitle = e.target.value.split('*');
                                                    items[i].id = idTitle[0];
                                                    items[i].title = e.target.options[e.target.selectedIndex].text;
                                                    items[i].price = parseFloat(idTitle[1]);
                                                    items[i].currentPrice = parseFloat(idTitle[1]);
                                                    items[i].quantity = 1;
                                                    items[i].total = parseFloat(idTitle[1]);
                                                    setItems(items);
                                                    setRefresh(refresh + 1);
                                                }}>
                                                    <option value="">--</option>
                                                    {data.products && data.products.map((product, i) => (
                                                        <option key={i} value={product.id + '*' + product.price}>{product.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-2">
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
                                                <input type="number" className="form-control d-inline" style={{ width: '84%' }} placeholder="eg. 0.00" value={parseFloat(item.total).toFixed(2)} readOnly />
                                                &nbsp;
                                                <i className="fa-solid fa-circle-xmark text-danger" data-key={i} onClick={() => { delete items[i]; deleteProduct(); }}></i>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <p className="btn btn-dark" style={{ cursor: 'pointer' }} onClick={() => { setItems([...items, { id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]); setRefresh(refresh + 1); }}><i className="fa-solid fa-circle-plus"></i>&nbsp;{t('Add Product')}</p>
                                    </div>
                                </div>

                            </div>
                            <hr />
                                <div className="row">
                                    <div className="col-md-6 offset-md-6 border">
                                        <div className="row">
                                            <div className="col-md-7 border-end">
                                                <label className="d-block text-end">{t('Sub Total')}</label>
                                            </div>
                                            <div className="col-md-5">
                                                <p className="text-end">
                                                    <NumericFormat 
                                                        value={itemSummery.subTotal}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix= {' '+currency}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row border-top">
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
                                                        suffix= {' '+currency}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row border-top">
                                            <div className="col-md-3 border-end">
                                                <label className="d-block text-end">{t('Tax')}</label>
                                            </div>
                                            <div className="col-md-3 border-end">
                                                <input type="number" defaultValue="20" className="form-control" onChange={(e) => {
                                                    let value = 0;
                                                    if (e.target.value.length && !isNaN(e.target.value))
                                                        value = e.target.value;
                                                    itemSummery.taxPercentage = parseFloat(value);
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
                                                        value={itemSummery.tax}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix= {' '+currency}
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
                                                        value={itemSummery.total}
                                                        displayType="text" 
                                                        thousandSeparator={"."} 
                                                        decimalSeparator=","
                                                        decimalScale={2}
                                                        fixedDecimalScale
                                                        suffix= {' '+currency}
                                                    /> 
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />



                            {emails && emails.map((email, i) => (
                                <div key={i} className="row mt-3">
                                    <div className="col-md-4">
                                        <label>{t('Name')}</label>
                                        <select className="form-control" value={email.name + '*' + email.email} onChange={(e) => {
                                            var cp = e.target.value.split('*');
                                            emails[i].name = cp[0];
                                            emails[i].email = cp[1];
                                            emails[i].currentEmail = cp[1];
                                            setEmails(emails);
                                            itemSummery.emails = emails;
                                            setItemSummery(itemSummery);
                                            setRefresh2(refresh2 + 1);
                                        }}>
                                            <option value="">--</option>
                                            {contactPersons && contactPersons.map((person, pi) => person.name && (
                                                <option key={pi} value={person.name + '*' + person.emails[0]}>{person.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <label>{t('Email')}</label>
                                        <input type="email" style={{ width: '93%' }} className="form-control d-inline-block " value={email.currentEmail} onChange={(e) => {
                                            emails[i].currentEmail = e.target.value;
                                            setEmails(emails);
                                            itemSummery.emails = emails;
                                            setItemSummery(itemSummery);
                                            setRefresh2(refresh2 + 1);
                                        }} placeholder={t('eg. email@mail.com')} />
                                        &nbsp;
                                        <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={i} onClick={() => { delete emails[i]; deleteEmail(); }}></i>

                                        <br />
                                    </div>
                                </div>
                            ))}
                            <p className="btn btn-dark mt-2" style={{ cursor: 'pointer' }} onClick={() => { setEmails([...emails, { name: '', email: '', currentEmail: '' }]); setRefresh2(refresh2 + 1); }}><i className="fa-solid fa-circle-plus"></i>&nbsp;{t('Add Contact Person')}</p>

                          <div className="col-12 mb-4 mt-5">
                          
                              {!saving && (
                                  <button type="submit" className="btn btn-primary">
                                      {t('Save')}
                                  </button>
                              )}
                              {saving && (
                                  <button type="submit" className="btn btn-disabled" disabled>
                                      {t('Saving ...')}
                                  </button>
                              )}
                              
                          </div>
                          
                      </form>
                      
                      
                  </div>
              </div>

              

              <CustomerCategoryModal refreshParent={() => setRefresh(refresh + 1)} />
          </div>
      </div>;
}

export default OrderCreate