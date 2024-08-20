import callFetch from "helpers/callFetch";
import deleteAlert from "helpers/deleteAlert";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';

function LanguageCreateModal(props) {
    const { t } = useTranslation();
    const [customerCategories, setCustomerCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const {
        setValue,
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        if(props?.modalData?.id){
            callFetch("languages/" + props?.modalData?.id, "GET", []).then((res) => {
                for (let [key, value] of Object.entries(res.data)) {
                    setValue(key, value);
                }
            });
        }else{
            reset();
        }
    },[props?.modalData]);
    const onSubmit = (formData) => {
        setSaving(true);
        callFetch(props?.modalData?.id ? "languages/"+props?.modalData?.id:"languages", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            reset();
            setRefresh(refresh + 1);
            props.refreshParent();
        });
    };


    return (
        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            {props?.modalData?.id && <input type="hidden" defaultValue="PUT" {...register("_method")} />}
            <div className="modal fade" id="customerCategoryModal" tabIndex={-1} role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="categoryModalLabel">{t(`${props?.modalData ? props?.modalData?.modalTitle:"Language Create"}`)}</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>
                                        {t('Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Business')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>
                                        {t('Language Code')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Business')}
                                        {...register("language_code", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.language_code && errors.language_code.message}</div>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>
                                        {t('Status')} *
                                    </label>
                                    <select className="form-control mb-4" {...register("status", {
                                            required: true,
                                        })}
                                        required>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                    <div className="invalid-feedback">{errors.status && errors.status.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
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
                    </div>
                </div>
            </div>
        </form>
    );
}

export default LanguageCreateModal