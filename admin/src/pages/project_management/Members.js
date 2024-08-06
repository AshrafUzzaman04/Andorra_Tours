import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, NavLink, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import MemberIndexTable from './MemberIndexTable';

function Members() {
    let params = useParams();
    var currentAllEmployees = [];
    var currentCustomers = [];
    var currentSupliers = [];
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
          callFetch("projectmember/create", "GET", []).then((res) => {
              setData(res.data);
              setSuppliers(res.data.suppliers);
          });
      }, []);
    
     const onSubmit = (formData) => {
          formData.project_id = params.id;
          setSaving(true);
          callFetch("projectmember", "POST", formData, setError).then((res) => {
          setSaving(false);
          setRefresh(refresh+1);
          if (!res.ok) return;
          setSubmitSuccess(true);
          });
     };

    return(
     <>
          <div className="row">
               <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-body px-0 pt-2 pb-2 project-members">
                              <MemberIndexTable refresh={refresh} project_id={params.id}/>
                        </div>
         
                         <div className="card-body">
                              <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                   <div className="row g-3">
                                        <div className="col-md-4">
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

                                        <div className="col-md-4">
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

                                        <div className="col-md-4">
                                             {!saving && (
                                                  <button type="submit" className="btn btn-primary">
                                                  {t('Add')}
                                                  </button>
                                             )}
                                             {saving && (
                                                  <button type="submit" className="btn btn-disabled" disabled>
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
     </>
    );
}

export default Members;
