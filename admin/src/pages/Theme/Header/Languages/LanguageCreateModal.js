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
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset
    } = useForm();

    let serial = 1;

    useEffect(() => {
        callFetch("customer-categories", "GET", []).then((res) => {
            setCustomerCategories(res.data);
        });
    }, [refresh]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("customer-categories", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            reset();
            setRefresh(refresh + 1);
            props.refreshParent();
        });
    };

    function doCategoryUpdate(e, id) {
        let name = e.target.parentNode.parentNode.parentNode.getElementsByClassName('category-input')[0].value;
        callFetch("customer-categories/" + id, "POST", { name: name, _method: 'PUT' }).then((res) => {
            if (!res.ok) return;
            setRefresh(refresh + 1);
            props.refreshParent();
        });
    }

    return (
        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="modal fade" id="customerCategoryModal" tabIndex={-1} role="dialog" aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="categoryModalLabel">{t('Language Create')}</h5>
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
                                        {t('Status')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Status')}
                                        {...register("status", {
                                            required: true,
                                        })}
                                        required
                                    />
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