import callFetch from "helpers/callFetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from "react-router-dom";
const CustomerPasswordChange = () => {
    let params = useParams();
    const { t } = useTranslation();
    const [passwords,setPasswords] = useState({current_password:"",new_password:"",conform_password:"",id:''})
    const [saving, setSaving] = useState(false);
    const [perror,setPerror] = useState([])
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) =>{
        setSaving(true);
        formData.id = params.id
        callFetch('customer/password',"POST",formData, setError).then((res)=>{
            setSaving(false);
            if (!res.ok) return;
            setValue('current_password','')
            setValue('new_password','')
            setValue('conform_password','')
        })
        
   }
  return (
    <>
                            <div className="card mb-4" >
                                <div className="card-header pb-0" >
                                    <h6>{t('Password Update')}</h6>
                                </div>
                                <div className="card-body">
                                <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                                <div>
                                    <label>
                                        {t('Current Password')} *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        placeholder={t('Current Passwrod')}
                                        {...register("current_password",{
                                            required:true
                                        })}
                                        required
                                    />
                                    
                                    <div className="invalid-feedback">{errors.current_password && errors.current_password.message}</div>
                                    
                                </div>

                                <div>
                                    <label className="mt-4">
                                        {t('New Password')} *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control "
                                        placeholder={t('New Password')}
                                        {...register("new_password",{
                                            required:true
                                        })}
                                        required
                                    />
                                    
                                    <div className="invalid-feedback">{errors.new_password && errors.new_password.message}</div>
                                </div>

                                <div>
                                    <label className="mt-4">
                                        {t('Conform Password')} *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder={t('Conform Password')}
                                        {...register("conform_password",{
                                            required:true
                                        })}
                                        required
                                    />
                                    
                                    <div className="invalid-feedback">{errors.conform_password && errors.conform_password.message}</div>
                                </div>

                            <div className="col-12 mb-2 mt-4">
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
    </>
  )
}

export default CustomerPasswordChange