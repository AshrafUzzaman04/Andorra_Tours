import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import deleteAlert from "../../../helpers/deleteAlert";

function SmtpIndex() {
    const { t } = useTranslation();
    const [resData, setResData] = useState(null);
    const [reIndex, setReIndex] = useState(0);

    useEffect(() => {
        callFetch("smtp-configurations", "GET", [], null).then((res) => {
            setResData(res);
        });
    }, [reIndex]);

    return (
        <>
            <div className="d-sm-flex justify-content-between">
                <div>
                    <NavLink to="/user-settings/smtp/create" className="btn btn-icon bg-gradient-primary">
                        {t('Add new SMTP')}
                    </NavLink>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card mb-4">
                        <div className="card-header pb-0">
                            <h6>{t('All SMTP')}</h6>
                        </div>
                        <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('ID')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Name')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Email')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Host')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Port')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('User')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Password')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Type')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Status')}</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">{t('Actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {resData && resData.data.map((smtp) => (
                                            <tr key={smtp.id}>
                                                <td className="align-middle text-center">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.id}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.sender_name}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.sender_email}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.smtp_host}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.smtp_port}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.smtp_user}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <p className="text-xs font-weight-bold mb-0">{smtp.smtp_password}</p>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    <span className="badge badge-sm bg-gradient-info">{smtp.smtp_type}</span>
                                                </td>
                                                <td className="align-middle text-center text-sm">
                                                    {smtp.status === '1' ? <span className="badge badge-sm bg-gradient-success">{t('Active')}</span> : <span className="badge badge-sm bg-gradient-danger">{t('Inactive')}</span>}
                                                </td>
                                                <td>
                                                    <div className="text-center dropstart">
                                                        <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className="fa fa-ellipsis-v text-xs"></i>
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                <NavLink to={'/user-settings/smtp/' + smtp.id + '/edit'} className="dropdown-item">
                                                                    {t('Edit')}
                                                                </NavLink>
                                                            </li>
                                                            <li><hr className="dropdown-divider" /></li>
                                                            <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'smtp-configurations', smtp.id, t).then(res => setReIndex(reIndex + 1))}>{t('Delete')}</a></li>
                                                        </ul>
                                                    </div>
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

export default SmtpIndex;
