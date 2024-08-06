import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import deleteAlert from "../../../helpers/deleteAlert";
import Cookies from 'js-cookie';

function RoleIndex() {
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [reIndex, setReIndex] = useState(0);

    useEffect(() => {
        callFetch("roles", "GET", [], null).then((res) => {
            setResData(res);
        });
    }, [reIndex]);

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    {Cookies.get('permissions').indexOf("role-create") !== -1 ? (
                        <>
                            <NavLink to="/user-settings/roles/create" className="btn btn-icon btn-primary">
                                {t('Add New Role')}
                            </NavLink>
                        </>
                    ) : <></>}
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All Roles')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('ID')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Name')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Role For')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Default')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resData && resData.data.map((role) => (
                                            <tr key={role.id}>
                                                <td className="align-middle text-center">
                                                    <p className="text-xs font-weight-bold mb-0">{role.id}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{t(role.name)}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    {role.role_for === '1' ? <span className="badge badge-sm bg-gradient-dark">{t('General User')}</span> : <span className="badge badge-sm bg-gradient-info">{t('System User')}</span>}
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    {role.is_default === '1' ? <span className="badge badge-sm bg-gradient-success">{t('Yes')}</span> : <span className="badge badge-sm bg-gradient-secondary">{t('No')}</span>}
                                                </td>
                                                <td>
                                                    {Cookies.get('permissions').indexOf("role-update") !== -1 ||
                                                        Cookies.get('permissions').indexOf("role-delete") !== -1 ? (
                                                        <div className="text-center dropstart m-auto" style={{ maxWidth: '20px', padding: '5px 16px 5px 5px' }}>
                                                            <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className="fa fa-ellipsis-v text-xs"></i>
                                                            </a>
                                                            <ul className="dropdown-menu">
                                                                {Cookies.get('permissions').indexOf("role-update") !== -1 ? (
                                                                    <li>
                                                                        <NavLink to={'/user-settings/roles/' + role.id + '/edit'} className="dropdown-item">
                                                                            {t('Edit')}
                                                                        </NavLink>
                                                                    </li>
                                                                ) : <></>}
                                                                <li><hr className="dropdown-divider" /></li>
                                                                {Cookies.get('permissions').indexOf("role-delete") !== -1 ? (
                                                                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'roles', role.id, t).then(res => setReIndex(reIndex + 1))}>{t('Delete')}</a></li>
                                                                ) : <></>}
                                                            </ul>
                                                        </div>
                                                    ) : <></>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoleIndex;
