import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import MemberIndexTable from './MemberIndexTable';

function EditMembers(props) {
    const { t } = useTranslation();
    const submitBtn = useRef();
    const [data, setData] = useState([]);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [suppliers, setSuppliers] = useState([]);

     const {
          register,
          handleSubmit,
          setError,
          setValue,
          formState: { errors },
     } = useForm();

     useEffect(() => {
          if(props.id){
               callFetch("projectmember/"+props.id+"/edit", "GET", []).then((res) => {
                    setData(res.data);
                    setSuppliers(res.data.suppliers);
     
                    for(let [key,value] of Object.entries(res.data.member)){
                         setValue(key,value)
                    }
               });
          }
      }, [props.id]);
    
     const onSubmit = (formData) => {
          setSaving(true);
          callFetch("projectmember/"+props.id, "POST", formData, setError).then((res) => {
          setSaving(false);
          setRefresh(refresh+1);
          props.refresh((refresh+1+1+1));
          if (!res.ok) return;
          setSubmitSuccess(true);
          });
     };

    return(
     <>
          <form onSubmit={handleSubmit(onSubmit)}> 
               <input type="hidden" defaultValue="PUT" {...register("_method")} />
               <div className="modal fade" id="editMemberModal" tabindex="-1" role="dialog" aria-labelledby="editMemberModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                         <div className="modal-content">
                              <div className="modal-header">
                              <h6 className="modal-title" id="editMemberModalLabel" style={{fontWeight: 'bold'}}>{t('Edit')}</h6>
                              <button type="button" className="btn-close text-dark" id="editMemberModalClose" data-bs-dismiss="modal" aria-label="Close">
                                   <span aria-hidden="true">&times;</span>
                              </button>
                              </div>
                              <div className="modal-body">
                                   <div className="row g-3">
                                        <div className="col-md-12">
                                             <select
                                                className="form-control mb-4 flat-pickr"
                                                {...register("supplier_id", {
                                                    required: true,
                                                })}
                                                >
                                                  {suppliers && suppliers.map((supplier) => (
                                                       <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                                  ))}
                                            </select>
                                             <div className="invalid-feedback">{errors.supplier_id && errors.supplier_id.message}</div>
                                        </div>

                                        <div className="col-md-12">
                                             <select
                                                className="form-control mb-4 flat-pickr"
                                                {...register("title", {
                                                    required: true,
                                                })}
                                                >
                                                       <option value={"Planer"}>Planer</option>
                                                       <option value={"Ausführer"}>Ausführer</option>
                                                       <option value={"Begleitende Kontrolle"}>Begleitende Kontrolle</option>
                                                       <option value={"Sicherheit / Brandschutz"}>Sicherheit / Brandschutz</option>
                                                       <option value={"Sonstige"}>Sonstige</option>
                                            </select>
                                             <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-footer">
                                   <button type="button" className="btn bg-gradient-default btn-start" data-bs-dismiss="modal" aria-label="Close">{t('Cancel')}</button>
                                   {!saving && (
                                        <button data-bs-dismiss="modal" aria-label="Close" type="submit" style={{textTransform: 'capitalize', padding: '0.50rem 2rem'}} className="btn bg-gradient-primary btn-start mt-2">{t('Save')} </button>
                                   )}
                                   {saving && (
                                   <button type="submit" style={{textTransform: 'capitalize', padding: '0.50rem 2rem'}} className="btn btn-disabled mt-2" disabled>{t('Saving ...')}</button>
                                   )}
                              </div>
                         </div>
                    </div>
               </div>
          </form>          
     </>
    );
}

export default EditMembers;
