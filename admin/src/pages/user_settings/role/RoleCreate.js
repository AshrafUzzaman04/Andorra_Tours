import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";

function RoleCreate() {
    let displayName = '';
    let params = useParams();
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
    };

    useEffect(() => {
        callFetch("roles/create", "GET", [], setError).then((res) => {
            setResData(res.data);
            setValue('role_for', 0);
        });
    }, [setError, setValue, params]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("roles", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/user-settings/roles' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Create New Role')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Role Name')} <b>*</b>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('Role Name')}
                                        {...register("name", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.name && errors.name.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="card">
                                    <label>{t('Permissions')}</label>

                                    <div className="form-check">
                                        <input className="form-check-input" id="selectAll" onChange={handleSelectAll} type="checkbox" checked={isCheckAll} />
                                        <label htmlFor="selectAll" className="mb-0">Select All</label>
                                    </div>
                                    
                                    <div className="table-responsive">
                                        <table className="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Title')}</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Read')}</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Create')}</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Update')}</th>
                                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Delete')}</th>
                                                    
                                                    {/*Other users data*/}
                                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Read Others')}</th>
                                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Update Others')}</th>
                                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Delete Others')}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {resData?.permissions ?
                                                    Object.keys(resData.permissions).map((permissionname, key) => (
                                                        <>
                                                        {permissionname != 'Dashboard' ? (
                                                            <tr key={'permissionname' + key}>
                                                                <td>{t(permissionname)}</td>
                                                                {resData.permissions[permissionname] && resData.permissions[permissionname].map((permission, permissionkey) => (
                                                                    <td className="text-center" key={'permissions' + permissionkey}>
                                                                        {/* <div className="form-check d-inline-block" style={{ paddingLeft: '0' }} data-optional={permission.display_name !== displayName ? displayName = permission.display_name : ''}>
                                                                            <input className="form-check-input mx-0" type="checkbox" value={permission.name} {...register("permission")} />
                                                                        </div> */}

                                                                        {
                                                                            permission.name == 'read-others-employee'  ||
                                                                            permission.name == 'update-others-employee' ||
                                                                            permission.name == 'delete-others-employee' ||

                                                                            permission.name == 'read-others-workShop'  ||
                                                                            permission.name == 'update-others-workShop' ||
                                                                            permission.name == 'delete-others-workShop' ||

                                                                            permission.name == 'read-others-student'  ||
                                                                            permission.name == 'update-others-student' ||
                                                                            permission.name == 'delete-others-student' ||

                                                                            permission.name == 'read-others-seminar'  ||
                                                                            permission.name == 'update-others-seminar' ||
                                                                            permission.name == 'delete-others-seminar' ||

                                                                            permission.name == 'read-others-supplier'  ||
                                                                            permission.name == 'update-others-supplier' ||
                                                                            permission.name == 'delete-others-supplier' ||

                                                                            permission.name == 'read-others-product'  ||
                                                                            permission.name == 'update-others-product' ||
                                                                            permission.name == 'delete-others-product' ||

                                                                            permission.name == 'read-others-form'  ||
                                                                            permission.name == 'update-others-form' ||
                                                                            permission.name == 'delete-others-form' ||

                                                                            permission.name == 'read-others-smtp'  ||
                                                                            permission.name == 'update-others-smtp' ||
                                                                            permission.name == 'delete-others-smtp' ||

                                                                            permission.name == 'read-others-role'  ||
                                                                            permission.name == 'update-others-role' ||
                                                                            permission.name == 'delete-others-role' ? (
                                                                            <>
                                                                                
                                                                            </>
                                                                        ) : <>
                                                                        <div className="form-check" data-optional={permission.display_name !== displayName ? displayName = permission.display_name : ''}>
                                                                            <input checked={isCheckAll} className="form-check-input mx-0" type="checkbox" value={permission.name} {...register("permission")} />
                                                                        </div>
                                                                        </>}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                        ) : <></>}
                                                        </>
                                                        
                                                    )) : <></>}
                                            </tbody>
                                        </table>

                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Dashboard Permissions')}</th>
                                                </tr>
                                            </thead>
                                            {resData?.permissions?
                                                Object.keys(resData.permissions).map((permissionname, key) => (
                                                <>
                                                {permissionname == 'Dashboard' ? (
                                                    <tbody key={'permissionname'.key}>
                                                        {resData.permissions[permissionname] && resData.permissions[permissionname].map((permission, permissionkey) => (
                                                            <tr key={'permissions'.permissionkey}>
                                                                <td>
                                                                    <div className="form-check" data-optional={permission.display_name !== displayName ? displayName = permission.display_name : ''}>
                                                                        <input id={permission.display_name+permissionkey} checked={isCheckAll} className="form-check-input mx-0" type="checkbox" value={permission.name} {...register("permission")} />
                                                                        <label htmlFor={permission.display_name+permissionkey}>{permission.name }</label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                ) : <></>}
                                                </>
                                            )) : <></> }
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 my-4">
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

export default RoleCreate;
