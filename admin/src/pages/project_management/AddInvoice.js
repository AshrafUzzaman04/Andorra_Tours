import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import dateFormat from "dateformat";
import callFetch from "helpers/callFetch";
import SoftButton from "components/SoftButton";
import { NumericFormat } from 'react-number-format';
import { KeyboardArrowDown } from "@mui/icons-material";
import { Menu,MenuItem } from "@mui/material";
import Overview from "./Overview";

const AddInvoice = (props) => {
    const { t } = useTranslation();
    const params = useParams()
    const [customerId, setCustomerId] = useState(0);
    const [customer, setCustomer] = useState([]);
    const [contactPersons, setContactPersons] = useState([]);
    const [data, setData] = useState([]);
    const [editDelay, setEditDelay] = useState(0);
    const [currency, setCurrency] = useState('EUR');
    const [emails, setEmails] = useState([{ name: '', email: '', currentEmail: '' }]);
    const [items, setItems] = useState([{ id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]);
    const [itemSummery, setItemSummery] = useState({ items: [], emails: [], subTotal: 0, discountPercentage: 0, discount: 0, taxPercentage: 20, tax: 0, total: 0 });
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [order,setOrder] = useState([])
    const [refresh, setRefresh] = useState(0);
    const [refresh2, setRefresh2] = useState(0);
    const [orderId,setOrderId] = useState(0)
    const [quotationId,setQuotationId] = useState(0)
    const [invoiceLink,setInvoiceLink] = useState("")
    const [menu, setMenu] = useState(null);
    const [invoiceId,setInvoiceId] = useState(0)
    const [nullOrder,setNullOrder] = useState(false)

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
    if(invoiceId){
        return;
    }
    callFetch("invoice/create", "GET", []).then((res) => {
        setValue('invoice_nr', res.data.invoice_nr);
        setData(res.data)
        setOrder(res.data.order);
        setCustomer(res.data.customer)
        setEditDelay(editDelay + 1);
    });
        
  }, []);
  
//   useEffect(() => {
//     if (customerId < 1)
//         return;
//     callFetch("customer/" + customerId, "GET", []).then((res) => {
//         // const itemSummery = JSON.parse(res?.data?.product_details)
//         setContactPersons(res.data);
//         setValue('order_nr',res.data.id)
//         setItemSummery(itemSummery);
//         setRefresh2(refresh2 + 1);
//         setOrderId(0)
//     });
//   }, [customerId,props.childRefersh]);
  
  useEffect(() => {
    if (orderId < 1)
        return;
    callFetch("invoice/" +orderId, "GET", []).then((res) => {
        const product = JSON.parse(res?.data?.order?.product_details)
         setItems(product.items)
         setItemSummery(product);
    });
  }, [orderId]);

  useEffect(()=>{
    if(params.id){
        callFetch("quotation/" +params.id, "GET", []).then((res) => {
            setValue('order_nr',res?.data?.order.id)
            setNullOrder(res?.data?.order)
            const product = res?.data?.invoice !== null ? JSON.parse(res?.data?.invoice?.product_detail):JSON.parse(res?.data?.order?.product_details)
            setItems(product.items)
            setItemSummery(product);
            setQuotationId(res?.data?.order.quotation_nr)
            setOrderId(res?.data?.order.id)
                if(res.data.invoice){
                    for(let[key,value] of Object.entries(res.data.invoice)){
                        setValue(key,value)
                    }
                    setInvoiceLink(res?.inoice_link)
                }
                setInvoiceId(res?.data?.invoice?.id)
        });
    }
  },[editDelay])
  
  const onSubmit = (formData) => {
    setSaving(true);
    formData.total = itemSummery.total;
    formData.quotation_id = quotationId;
    formData.product_details = JSON.stringify(itemSummery);
    callFetch(invoiceId > 0 ? "invoice/"+invoiceId:"invoice", "POST", formData, setError).then((res) => {
        setInvoiceId(res.invoice_id)
        setInvoiceLink(res.inoice_link)
        setSaving(false);
        if (!res.ok) return;
        setSubmitSuccess(true);
    });
  };
 
  
  
  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () =>{
      window.open(invoiceLink, '_blank').focus();
      setMenu(null);
  } 
  
  const renderMenu = (
    <Menu
        anchorEl={menu}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={Boolean(menu)}
        onClose={closeMenu}
        keepMounted
      >
        <MenuItem onClick={closeMenu}>Invoice PDF</MenuItem>
      </Menu>
  )
    

return nullOrder ?
  <div className="row">
      <div className="col-12">
            <div className="mb-3">
                <Overview title="Invoice" quation_id={quotationId} />
            </div>
          <div className="card mb-4">
              <div className="card-header pb-0">
                  <h6>{t('Add Invoices')}</h6>
              </div>
             <div className="card-body">
                <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    {invoiceId > 0 && <input type="hidden" defaultValue="PUT" {...register("_method")} />}
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
                                        readOnly
                                        className="form-control mb-4 flat-pickr"
                                        placeholder={t('eg. 2001-03-20')}
                                        defaultValue={dateFormat(new Date(), "yyyy-mm-dd")}
                                        {...register("created_date", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.created_date && errors.created_date.message}</div>
                                </div>
                      </div>
                      {/* <div className="row g-3 d-none">
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
                        <div className="row mt-3 d-none">
                            <div className="col-md-12">
                                <label>{t('Description')}</label>
                                <textarea className="form-control" rows="3"
                                    placeholder={"eg. " + t('Description')}
                                    {...register("description")}></textarea>
                            </div>
                        </div> */}

                        <div className="mt-3">
                        {/* <div className="mt-3 d-none">
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
                                                <input type="number" className="form-control" placeholder={t("eg. 0.00")} value={item.quantity === 1 ? 1:item.quantity} defaultValue="1" onChange={(e) => {
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
                                                <input type="number" className="form-control" placeholder={t("eg. 0.00")} value={item.currentPrice ? item.currentPrice : ''} onChange={(e) => {
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

                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <p className="btn btn-dark" style={{ cursor: 'pointer' }} onClick={() => { setItems([...items, { id: 0, title: '', quantity: 0, price: 0, currentPrice: 0, total: 0 }]); setRefresh(refresh + 1); }}><i className="fa-solid fa-circle-plus"></i>&nbsp;{t('Add Product')}</p>
                                    </div>
                                </div>

                            </div> */}
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
                                            <select className="form-control" value={itemSummery.discountPercentage} onChange={(e) => {
                                                let value = 0;
                                                if (e.target.value.length && !isNaN(e.target.value))
                                                  value = e.target.value;
                                                itemSummery.discountPercentage = parseFloat(value);
                                                setItemSummery(itemSummery);
                                                setRefresh(refresh + 1);
                                            }}>
                                                    <option value="0">--</option>
                                                    <option value="100">100%</option>
                                                    <option value="70">70%</option>
                                                    <option value="30">30%</option>
                                                </select>
                                            {/* <input type="number" className="form-control" value={itemSummery.discountPercentage > 0 ? itemSummery.discountPercentage:''} onChange={(e) => {
                                                let value = 0;
                                                if (e.target.value.length && !isNaN(e.target.value))
                                                  value = e.target.value;
                                                itemSummery.discountPercentage = parseFloat(value);
                                                setItemSummery(itemSummery);
                                                setRefresh(refresh + 1);
                                            }} /> */}
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
                            {
                                invoiceLink && (
                                    <SoftButton onClick={openMenu} variant="outlined" color="secondary" className="mb-3 ms-2" style={{ fontWeight:"600" }}>
                                        {t('Actions')}&nbsp;
                                        <KeyboardArrowDown />
                                    </SoftButton>
                                )
                            }
                          
                          
                          
                      </div>
                      
                  </form>
                  {renderMenu}
             </div>
          </div>
      </div>
  </div>:<></>;
}

export default AddInvoice