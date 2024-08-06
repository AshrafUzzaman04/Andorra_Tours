import React, { useEffect, useState } from 'react'
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/SoftEditor";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';
const WorkshopEdit = () => {
    const params = useParams()
    const [editorValue, setEditorValue] = useState('')
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [editDelay,setEditDelay] = useState(0)
    const [title,setTitle] = useState([{ title: '' }])
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const handleTitleInput = (event,index) =>{
        // const {name, value} = event.target
        // const list = [...title]
        // list[index][name] = value
        const values = [...title];
        values[index][event.target.name] = event.target.value; 
        // setSalaryCategory(values);
        setTitle(values)
    }
    const AddTitleInput = () =>{
        setTitle([...title, { title: '' }])
    }
    
    const RemoveTitleInput = (index) =>{
        const values = [...title]
        values.splice(index,1)
        setTitle(values)
    }
    
        useEffect(()=>{
            callFetch('course/'+params.id +'/edit','GET',[]).then((res=>{
                setTitle(JSON.parse(res.data.course_content));
                for(let[key,value] of Object.entries(res.data)){
                    setValue(key,value)
                }
                
            }))
        },[editDelay,params.id])
    
    const onSubmit = (formData) =>{
        formData.course_content = JSON.stringify(title)
        setSaving(true)
        callFetch('course/'+params.id, "POST", formData, setError).then((res)=>{
            setSaving(false)
            if(!res.ok)return;
            setSubmitSuccess(true)
        })
    }




  return submitSuccess ? <Navigate to='/course-management/workshops' /> :
  <div className="row">
      <div className="col-12">
          <div className="card mb-4">
              <div className="card-header pb-0">
                  <h6>{t('Course Information')}</h6>
              </div>
              <div className="card-body">
                  <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                  <input type="hidden" defaultValue="PUT" {...register("_method")} />
                      <div className="row g-3">
                          <div className="col-md-6">
                                <label>
                                  {t('Course Title')} *
                                </label>
                                <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder={t('Course Title')}
                                  {...register("course_title", {
                                      required: true,
                                  })}
                                  required
                                />
                                <div className="invalid-feedback">{errors.course_title && errors.course_title.message}</div>
                          </div>
                          <div className="col-md-6">
                              <label>
                                  {t('Course Short Title')} *
                              </label>
                              <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder={t('Course Short Title')}
                                  {...register("course_short_title", {
                                      required: true,
                                  })}
                                  required
                              />
                              <div className="invalid-feedback">{errors.course_short_title && errors.course_short_title.message}</div>
                          </div>
                      </div>
                      <div className="row g-3">
                          <div className="col-md-4">
                            <label>
                                  {t('Course NR')} *
                              </label>
                              <input
                                  type="text"
                                  className="form-control mb-4"
                                  placeholder={t('course nr')}
                                  {...register("course_nr", {
                                      required: true,
                                  })}
                                  readOnly
                                  required
                              />
                              <div className="invalid-feedback">{errors.course_nr && errors.course_nr.message}</div>
                          </div>
                          <div className="col-md-4">
                              <label>{t('Course Duration in Min.')}</label>
                              <input className='form-control mb-4' type="number" {...register("course_duration")} />
                              <div className="invalid-feedback">{errors.course_duration && errors.course_duration.message}</div>
                          </div>
                          <div className="col-md-4">
                                <label>{t('Dokumentart')} *</label>
                                <select className='form-control mb-4'required {...register("dokumentart",{required:true})}>
                                    <option value={"Zeugnis"}>{t('Zeugnis')}</option>
                                    <option value={"Urkunde"}>{t('Urkunde')}</option>
                                    <option value={"Zertifikat"}>{t('Zertifikat')}</option>
                                </select>
                                <div className="invalid-feedback">{errors.course_duration && errors.course_duration.message}</div>
                            </div>
                      </div>
                      <div className="row g-3">
                          <div className="col-md-12">
                              <div className="form-group">
                                  <label>
                                      {t('Course Description')}
                                  </label>
                                  <input required
                                    placeholder={t('course description')} {...register('course_description',{required:true})} className='form-control' />
                                  <div className="invalid-feedback">{errors.course_description && errors.course_description.message}</div>
                              </div>
                          </div>
                      </div>
                      
                    {title.map((Title,index)=>{
                            return<div key={index} className="row g-3">
                            <div className="col-md-12">
                                    <div className="form-group">
                                        <label>
                                            {t(`Course Content ${index + 1}`)}
                                        </label>
                                          <div className=' d-flex align-items-center mb-4' >
                                              <input
                                              value={Title.title}
                                              type="text"
                                              className="form-control flatpickr"
                                              placeholder={t('Course content')}
                                              name="title"
                                              onChange={event => handleTitleInput(event,index)} />
                                              {
                                                title.length !==1 &&
                                                <div onClick={()=>RemoveTitleInput(index)} className='text-danger cursor-pointer ' >
                                                  <i className="fa-solid fa-circle-xmark ms-2"></i>
                                                </div>
                                              }
                                              
                                          </div>
                                        <div className="invalid-feedback">{errors.course_content && errors.course_content.message}</div>
                                    </div>
                            </div>
                            
                        </div>
                        })
                    }
                    <div className="row g-3">
                            <div className="col-sm-2"><button type="button" className="btn btn-outline-secondary mt-3" onClick={() => AddTitleInput()}>+{t('Add')}</button></div>
                            <div className="col-sm-5"></div>
                            <div className="col-sm-2"></div>
                    </div>
                     
                     
                      <div className="col-12 mb-4">
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

          
      </div>
  </div>;
}

export default WorkshopEdit