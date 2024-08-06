import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import callFetch from 'helpers/callFetch';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import SoftSelect from 'components/SoftSelect';
const SeminarEdit = () => {
  const { t } = useTranslation();
  const animated = makeAnimated()
  const params = useParams()
  const [saving, setSaving] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [selectStudent,setSelectedSutdent] = useState([])
  const [students,setStudents] = useState([])
  const [workshopname,setWorkShopname] = useState([])
  const [workshopteacher,setWorkshopTeacher] = useState()
  const [defaults,setDeafault] = useState([])
  const [show,setShow] = useState(false);
  const {
      register,
      handleSubmit,
      setError,
      setValue,
      formState: { errors },
  } = useForm();
  useEffect(()=>{
      callFetch("seminar/create", "GET" ,[]).then((res)=>{
        setValue('seminar_nr',res.data)
        setWorkshopTeacher(res.workshop_teacher)
        setWorkShopname(res.workshop_name)
        const StudentsData = []
        for(let i=0; i < res.students.length; i++){
            StudentsData.push(res.students[i])
        }
        setStudents(StudentsData)
        setShow(true)
      })
    callFetch("seminar/"+params.id+"/edit","GET" ,[]).then((res)=>{
      setDeafault(JSON.parse(res.data.students))
      for(let [key,value] of Object.entries(res.data)){
        setValue(key,value)
      }
    
    })
    
  },[refresh,params.id])
  const onSubmit = (formData) =>{
      formData.students = JSON.stringify(selectStudent)
      setSaving(true);
      callFetch("seminar/" + params.id, "POST", formData, setError).then((res) => {
        setSaving(false);
        if (!res.ok) return;
        setSubmitSuccess(true);
      });
  }
  
  
  const options = students.map(student=>{
      return { value: student.student_name, label:student.student_name, id:student.id } 
  })

  return submitSuccess ? <Navigate to='/course-management/seminars' /> :
    <div className="row">
        <div className="col-12">
            <div className="card mb-4">
                <div className="card-header pb-0">
                    <h6>{t('Add Seminar')}</h6>
                </div>
                <div className="card-body">
                    <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <input type="hidden" defaultValue="PUT" {...register("_method")} />
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>
                                    {t('Seminar NR.')} *
                                </label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t('eg. 123')}
                                    {...register("seminar_nr", {
                                        required: true,
                                    })}
                                    readOnly
                                    required
                                />
                                <div className="invalid-feedback">{errors.seminar_nr && errors.seminar_nr.message}</div>
                            </div>
                            <div className="col-md-6">
                                <label>
                                    {t('Seminar Date')} *
                                </label>
                                <input
                                    type="date"
                                    className="form-control mb-4"
                                    placeholder={t('eg. Jhon Doe')}
                                    {...register("seminar_date", {
                                        required: true,
                                    })}
                                    required
                                />
                                <div className="invalid-feedback">{errors.seminar_date && errors.seminar_date.message}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>
                                    {t('Workshop name')} *
                                </label>
                                <select className="form-control mb-4"{...register("courses_id", {required: true,})}required  >
                                    <option value="">--</option>
                                    {
                                        workshopname?.map((item,index)=>{
                                            return <option key={index} value={item.id} >{item.course_title}</option>
                                        })
                                    }
                                </select>
                                <div className="invalid-feedback">{errors.courses_id && errors.courses_id.message}</div>
                            </div>
                            <div className="col-md-6">
                                <label>{t('Students Name')}</label>
                                {
                                  defaults?.length !== 0 && <Select
                                  noOptionsMessage={() => t('No Options')}
                                  placeholder={t('Select...')}
                                  components={animated}
                                  isClearable
                                  isMulti 
                                  options={options}
                                  isSearchable
                                  closeMenuOnSelect={false}
                                  onChange={(event)=>setSelectedSutdent(event)}
                                  defaultValue={defaults}
                                />
                              
                                }
                                {
                                  defaults?.length === 0 && <Select
                                  noOptionsMessage={() => t('No Options')}
                                  placeholder={t('Select...')}
                                  components={animated}
                                  isClearable
                                  isMulti 
                                  options={options}
                                  isSearchable
                                  closeMenuOnSelect={false}
                                  onChange={(event)=>setSelectedSutdent(event)}
                                />
                              
                                }
                                {/* <input type="text" className="form-control mb-4" {...register("students")} /> */}
                                <div className="invalid-feedback">{errors.students && errors.students.message}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>
                                        {t('Workshop City')}
                                    </label>
                                    <input {...register("workshop_city")} type="text" className=' form-control' placeholder={t('workshop city')} />
                                    <div className="invalid-feedback">{errors.workshop_city && errors.workshop_city.message}</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label>
                                    {t('Workshop Teacher')}
                                </label>
                                <select
                                 className="form-control"
                                 {...register("workshop_teacher")}>
                                 <option value="">--</option>
                                 {
                                    workshopteacher?.map((teacher,index)=>{
                                        return<option key={index} value={teacher.name}>{teacher.name}</option>
                                    })
                                 }
                                 
                                </select>       
                                <div className="invalid-feedback">{errors.workshop_teacher && errors.workshop_teacher.message}</div>
                            </div>
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

export default SeminarEdit