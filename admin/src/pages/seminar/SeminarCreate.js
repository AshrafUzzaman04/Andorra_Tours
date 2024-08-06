import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import callFetch from 'helpers/callFetch';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const SeminarCreate = () => {
    const { t } = useTranslation();
    const animated = makeAnimated()
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [selectStudent,setSelectedSutdent] = useState([])
    const [students,setStudents] = useState([])
    const [workshopname,setWorkShopname] = useState([])
    const [workshopteacher,setWorkshopTeacher] = useState()
    console.log(students);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    
    useEffect(()=>[
        callFetch("seminar/create", "GET" ,[]).then((res)=>{
            setValue('seminar_nr',res.data)
            setWorkshopTeacher(res.workshop_teacher)
            setWorkShopname(res.workshop_name)
            const StudentsData = []
            for(let i=0; i < res.students.length; i++){
                StudentsData.push(res.students[i])
                
            }
            setStudents(StudentsData)
        })
    ],[refresh])
    const onSubmit = (formData) =>{
        formData.students = JSON.stringify(selectStudent)
        setSaving(true);
        callFetch("seminar", "POST", formData, setError).then((res)=>{
            setSaving(false)
            if(!res.ok)return;
            setSubmitSuccess(true)
        })
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
                                <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label>
                                    {t('Workshop name')} *
                                </label>
                                <select className="form-control mb-4"{...register("courses_id", {required: true,})}required  >
                                    <option>--</option>
                                    {
                                        workshopname?.map((item,index)=>{
                                            
                                            return <option key={index} value={item.id}>{item.course_title}</option>
                                            
                                        })
                                    }
                                </select>
                                <div className="invalid-feedback">{errors.courses_id && errors.courses_id.message}</div>
                            </div>
                            <div className="col-md-6">
                                <label>{t('Students Name')}</label>
                                <Select 
                                    noOptionsMessage={() => t('No Options')}
                                    className=''
                                    placeholder={t('Select...')}
                                    components={animated}
                                    isClearable
                                    isMulti 
                                    options={options}
                                    isSearchable
                                    closeMenuOnSelect={false}
                                    onChange={(event)=>setSelectedSutdent(event)}
                                />
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
                                    <input {...register("workshop_city")} type="text" className=' form-control' placeholder={t('Workshop City')} />
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

export default SeminarCreate