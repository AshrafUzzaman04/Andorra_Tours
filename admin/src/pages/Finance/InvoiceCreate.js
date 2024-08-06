import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { NumericFormat } from 'react-number-format';
import dateFormat from "dateformat";
import callFetch from "helpers/callFetch";
import CustomerCategoryModal from "pages/customer_management/customer/CustomerCategoryModal";

const InvoiceCreate = () => {
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
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [order,setOrder] = useState([])
  const [refresh, setRefresh] = useState(0);
  const [refresh2, setRefresh2] = useState(0);
  const [orderId,setOrderId] = useState(0)
  const [invoiceId,setInvoiceId] = useState(0)
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
  callFetch("invoice/create", "GET", []).then((res) => {
      setData(res.data)
      setValue('invoice_nr', res.data.invoice_nr);
      setOrder(res.data.order);
      setCustomer(res.data.customer)
      setEditDelay(editDelay + 1);
  });
      
}, [refresh]);

useEffect(() => {
  if (customerId < 1)
      return;
  callFetch("customer/" + customerId, "GET", []).then((res) => {
      const itemSummery = JSON.parse(res?.data?.product_details)
      setContactPersons(res.data);
      setValue('order_nr',res.data.id)
      setValue('title',res.data?.title)
      setValue('description',res.data?.description)
      setItems(itemSummery.items)
      setItemSummery(itemSummery);
      setRefresh2(refresh2 + 1);
      setOrderId(0)
  });
}, [customerId]);

useEffect(() => {
  if (orderId < 1)
      return;
  callFetch("invoice/" +orderId, "GET", []).then((res) => {
      setValue('customer_name',res?.data?.customer.id)
      const product = JSON.parse(res?.data?.order?.product_details)
       setItems(product.items)
       setValue('title',res.data?.order?.title)
       setValue('description',res.data?.order?.description)
       setItemSummery(product);
       setCustomerId(0)
  });
}, [orderId]);

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
              setItemSummery(product);
              setContactPersons(contact);
             
          });
      }
  }
},[editDelay])

const onSubmit = (formData) => {
    setSaving(true);
      formData.total = itemSummery.total;
      formData.product_details = JSON.stringify(itemSummery);
    callFetch("invoice", "POST", formData, setError).then((res) => {
        setInvoiceId(res.invoice_id)
        setSaving(false);
        if (!res.ok) return;
        setSubmitSuccess(true);
    });
};
  return submitSuccess ? <Navigate to={'/finance/invoice/'+invoiceId+'/edit'} /> :
  <div className="row">
      <div className="col-12">
          <div className="card mb-4">
              <div className="card-header pb-0">
                  <h6>{t('Create Invoice')}</h6>
              </div>
              <div className="card-body">
                    <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                      <div className="row g-3">
                          <div className="col-md-3">
                              <label>
                                  {t('Invoice Number')} *
                              </label>
                              <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder={t('eg. 123')}
                                  {...register("invoice_nr", {
                                      required: true,
                                  })}
                                  readOnly
                                  required
                              />
                              <div className="invalid-feedback">{errors.invoice_nr && errors.invoice_nr.message}</div>
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
                              
                              <div className="invalid-feedback">{errors.customer_name && errors.customer_name.message}</div>
                          </div>
                          <div className="col-md-3">
                              <label>
                                  {t('Order Nr.')}
                              </label>
                              <select className=" form-control"  {...register("order_nr",{required: true,})} required onChange={(e)=>{let order_id = e.target.value; setOrderId(order_id)}} >
                                  <option>----</option>
                                  {
                                    order?.map(order_nr=>{
                                        return <option key={order_nr.id} value={order_nr.id}>{order_nr.order_nr}</option>
                                    })
                                  }
                                  
                              </select>
                              <div className="invalid-feedback">{errors.order_nr && errors.order_nr.message}</div>
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
                                    placeholder={t("eg. ") + t('Description')}
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
                                                <input type="number" className="form-control" placeholder="eg. 0.00" value={item.quantity === 1 ? 1:item.quantity} defaultValue="1" onChange={(e) => {
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
                                    <p className="text-end">{<NumericFormat
                                        value={itemSummery.subTotal}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix=' €'
                                    />}</p>
                                </div>
                            </div>
                            <div className="row border-top">
                                <div className="col-md-3 border-end">
                                    <label className="d-block text-end">{t('Discount')}</label>
                                </div>
                                <div className="col-md-3 border-end">
                                    <input type="number" className="form-control" value={itemSummery.discountPercentage > 0 ? itemSummery.discountPercentage:''} onChange={(e) => {
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
                                    <p className="text-end">{<NumericFormat
                                        value={itemSummery.discount}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix=' €'
                                    />}</p>
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
                                    <p className="text-end">{<NumericFormat
                                        value={itemSummery.tax}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix=' €'
                                    />}</p>
                                </div>
                            </div>
                            <div className="row bg-gray-200">
                                <div className="col-md-7">
                                    <label className="d-block text-end">{t('Total')}</label>
                                </div>
                                <div className="col-md-5">
                                    <p className="text-end">{<NumericFormat
                                        value={itemSummery.total}
                                        displayType="text"
                                        thousandSeparator={","}
                                        decimalSeparator="."
                                        decimalScale={2}
                                        fixedDecimalScale
                                        suffix=' €'
                                    />}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                        </div>

                        <hr />



                       
                        {/* <p className="btn btn-dark mt-2" style={{ cursor: 'pointer' }} onClick={() => { setEmails([...emails, { name: '', email: '', currentEmail: '' }]); setRefresh2(refresh2 + 1); }}><i className="fa-solid fa-circle-plus"></i>&nbsp;{t('Add Contact Person')}</p> */}

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

export default InvoiceCreate
