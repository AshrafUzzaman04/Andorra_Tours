import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { callFetch } from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DepartmentManageModal from "./DepartmentManageModal";
import DesignationManageModal from "./DesignationManageModal";

function EmployeeCreate() {
    const { t } = useTranslation();
    const [designations, setDesignations] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [roles, setRoles] = useState([]);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    
    useEffect(() => {
        callFetch("employees/create", "GET", []).then((res) => {
            setValue('employee_identity_number', res.data.id);
            setRoles(res.data.roles);
        });

        callFetch("designations", "GET", []).then((res) => {
            setDesignations(res.data);
        });

        callFetch("departments", "GET", []).then((res) => {
            setDepartments(res.data);
        });
    }, [refresh]);

    const onSubmit = (formData) => {
        setSaving(true);
        callFetch("employees", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    };

    return submitSuccess ? <Navigate to='/human-resources/employees' /> :
        <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t('Add Employee')}</h6>
                    </div>
                    <div className="card-body">
                        <form className={`needs-validation ${Object.keys(errors).length ? "was-validated" : ""}`} onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Employee ID')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 123')}
                                        {...register("employee_identity_number", {
                                            required: true,
                                        })}
                                        readOnly
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.employee_identity_number && errors.employee_identity_number.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Employee Name')} *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. Jhon Doe')}
                                        {...register("name", {
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
                                        {t('Employee Email')} *
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control mb-4"
                                        placeholder={t('eg. email@mail.com')}
                                        {...register("email", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.email && errors.email.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>{t('Profile Picture')}</label>
                                    <input type="file" className="form-control mb-4" {...register("photo")} />
                                    <div className="invalid-feedback">{errors.photo && errors.photo.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>
                                        {t('Password')} *
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control mb-4"
                                        placeholder={t('eg. ********')}
                                        {...register("password", {
                                            required: true,
                                        })}
                                        required
                                    />
                                    <div className="invalid-feedback">{errors.password && errors.password.message}</div>
                                </div>
                                <div className="col-md-6">
                                    <label>
                                        {t('Mobile')}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control mb-4"
                                        placeholder={t('eg. 98765432')}
                                        {...register("mobile")} />
                                    <div className="invalid-feedback">{errors.mobile && errors.mobile.message}</div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Funktion')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("role", {
                                                required: true,
                                            })}
                                            required>
                                            <option value="">--</option>
                                            {roles && roles.map((role) => (
                                                <option key={role.id} value={role.id}>{t(role.name)}</option>
                                            ))}
                                        </select>
                                    </div>

                                   {/*
                                     <div className="form-group">
                                        <label>
                                            {t('Designation')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("designation_id", {
                                                required: true,
                                            })}
                                            style={{ float: 'left', width: '65%' }}
                                            required
                                        >
                                            <option value="">--</option>
                                            {designations && designations.map((designation) => (
                                                <option key={designation.id} value={designation.id}>{designation.name}</option>
                                            ))}
                                        </select>
                                        &nbsp;
                                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#designationModal" style={{ padding: '11px 25px' }}>{t('Add')}</button>
                                        <div className="invalid-feedback">{errors.designation_id && errors.designation_id.message}</div>
                                    </div>
                                   */}
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Department')} *
                                        </label>
                                        <br />
                                        <select
                                            className="form-control"
                                            {...register("department_id", {
                                                required: true,
                                            })}
                                            style={{ float: 'left', width: '65%' }}
                                            required
                                        >
                                            <option value="">--</option>
                                            {departments && departments.map((department) => (
                                                <option key={department.id} value={department.id}>{department.name}</option>
                                            ))}
                                        </select>
                                        &nbsp;
                                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#departmentModal" style={{ padding: '11px 25px' }}>{t('Add')}</button>
                                        <div className="invalid-feedback">{errors.department_id && errors.department_id.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Gender')}
                                        </label>
                                        <select
                                            className="form-control"
                                            {...register("gender")}>
                                            <option value="">--</option>
                                            <option value="Male">{t('Male')}</option>
                                            <option value="Female">{t('Female')}</option>
                                            <option value="Other">{t('Others')}</option>
                                        </select>
                                        <div className="invalid-feedback">{errors.gender && errors.gender.message}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Joining Date')} *
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control mb-4 flatpickr"
                                            placeholder={t('eg. 16-04-2022')}
                                            {...register("joining_date", {
                                                required: true,
                                            })}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.joining_date && errors.joining_date.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>
                                            {t('Date of Birth')}
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control mb-4 flatpickr"
                                            placeholder={t('eg. 16-04-2022')}
                                            {...register("date_of_birth")} />
                                        <div className="invalid-feedback">{errors.date_of_birth && errors.date_of_birth.message}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-3">
                                <div className="form-group mb-4">
                                    <label>
                                        {t('Address')}
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="4"
                                        placeholder={t('eg. 1234 My street, City')}
                                        {...register("address")}></textarea>
                                    <div className="invalid-feedback">{errors.address && errors.address.message}</div>
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

                {/* Department, Designation Modal Start */}
                <DesignationManageModal refreshParent={() => setRefresh(refresh + 1)} />
                <DepartmentManageModal refreshParent={() => setRefresh(refresh + 1)} />
                {/* Department, Designation Modal End */}
            </div>
        </div>;
}

export default EmployeeCreate;
