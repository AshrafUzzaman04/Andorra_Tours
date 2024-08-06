import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import deleteAlert from "../../../helpers/deleteAlert";

function DepartmentManageModal(props) {
    const { t } = useTranslation();
    const [departments, setdepartments] = useState([]);
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
        callFetch("departments", "GET", []).then((res) => {
            setdepartments(res.data);
        });
    }, [refresh]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("departments", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            reset();
            setRefresh(refresh + 1);
            props.refreshParent();
        });
    };

    function doDepartmentUpdate(e, id) {
        let name = e.target.parentNode.parentNode.parentNode.getElementsByClassName('department-input')[0].value;
        callFetch("departments/"+id, "POST", {department_name: name, _method: 'PUT'}).then((res) => {
            if (!res.ok) return;
            setRefresh(refresh + 1);
            props.refreshParent();
        });
    }

    return (
        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <div className="modal fade" id="departmentModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="departmentModalLabel">{t('Department')}</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('#')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Department')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {departments && departments.map((department) => (
                                            <tr key={department.id}>
                                                <td className="align-middle text-center">
                                                    <p className="text-xs font-weight-bold mb-0">{serial++}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <input className="form-control department-input" defaultValue={department.name} placeholder={t('eg. Team Lead')} />
                                                </td>
                                                <td className="align-middle">
                                                    <p className="mt-3 mb-0">
                                                        <button type="button" className="btn btn-outline-dark p-2 btn-sm" onClick={(e) => doDepartmentUpdate(e, department.id)}>{t('Update')}</button>
                                                        &nbsp;
                                                        <button type="button" className="btn btn-danger p-2 btn-sm" onClick={(e) => deleteAlert(e, 'departments', department.id, t).then(res => {setRefresh(refresh + 1);props.refreshParent();})}>{t('Delete')}</button>
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="row g-3">
                                <div className="col-md-12">
                                    <label>
                                        {t('Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Marketing')}
                                        {...register("department_name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.department_name && errors.department_name.message}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">{t('Close')}</button>
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

export default DepartmentManageModal;
