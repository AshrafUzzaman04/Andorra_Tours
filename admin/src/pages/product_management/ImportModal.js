import { React, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import "./style.css"
import * as XLSX from 'xlsx';
import callFetch from "helpers/callFetch";
import SoftTypography from "components/SoftTypography";
import File from "./import/employee.csv"
import FileXLSX from "./import/employee.xlsx"
import SoftAlert from "components/SoftAlert";
const ImportModal = (props) => {
    const { t } = useTranslation();
    const [saving, setSaving] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [fileData,setFileData] = useState({});
    const [fileName,setFileName] = useState("");
    const [success,setSuccess] = useState(null);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
        reset
        
    } = useForm();
    const ReadExcel = (file) => {
        setFileData(file)
        setFileName(file.name);
    }

    const onSubmit = (formData) => {
        setSaving(true);
        formData.Files = fileData
        callFetch("import-product/", "POST", formData, setError).then((res) => {
            setSaving(false);
            setSuccess(res.data)
            setValue('Files','')
            setRefresh(refresh+1);
            props.refreshParent()
        })
    };

    
  return (
    <div className="modal fade" id="importModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="modal-header">
                <h5 className="modal-title" id="importModalLabel">{t('Import')}</h5>
                <button type="button" onClick={()=>{setSuccess(null);setFileName(null);setValue("Files","")}} className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button> 
            </div>
            <div className="modal-body">
                <SoftTypography variant="caption" color="text" >
                    {t('Before import your file please download')} 
                    {/* <a className="ms-2 text-blue-700" href={File} download="Product">CSV,</a> */}
                    <a className="ms-2 text-blue-700" href={FileXLSX} download="Product">XLSX</a>
                </SoftTypography>
                <hr />
                {
                  success?.status === 200 && <SoftAlert icon="none" color="success" dismissible>
                      {success?.success}
                </SoftAlert>
                }

                {
                  success?.status === 400 && <SoftAlert icon="none" color="warning" dismissible>
                      {success?.success}
                </SoftAlert>
                }
                
                <div className="drop_box">
                    <header>
                    <SoftTypography variant="h4" color="text" >{t('Select File here')}</SoftTypography>
                        {/* <h4></h4> */}
                    </header>
                    {
                      fileName ? <p style={{ color:"#0909f3"}}>{fileName}</p>:<p>{t('Files Supported')}: CSV</p>
                    }
                    
                    <input type="file" accept=".csv,.xlsx,.jpg" id="fileID" style={{display:"none"}} {...register("Files",{require:true}) } onChange={(e)=>ReadExcel(e.target.files[0])} required   />
                    <label for="fileID" className="btn">{t('Choose File')}</label>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={()=>{setSuccess(null);setFileName(null);setValue("Files","")}} className="btn bg-gradient-secondary" data-bs-dismiss="modal">{t('Close')}</button>
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
  )
}

export default ImportModal