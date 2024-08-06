import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import callFetch from "../helpers/callFetch";
import { useTranslation } from 'react-i18next';

function Signin() {
    const { t } = useTranslation();
    let tempAuth = Cookies.get('token') ? true : false;
    const [signinSuccess, setSigninSuccess] = useState(tempAuth);
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        callFetch('user/login?toast=false', 'POST', formData, setError)
            .then(loginData => {
                if (!loginData.ok){
                    if(loginData.message == 'Invalid signin credentials'){
                        setErrorMessage(loginData.message);
                    }else{
                        setErrorMessage('');
                    }
                    return;
                }else{
                    setErrorMessage('');
                }
                console.log(loginData.data.user)
                Cookies.set('token', loginData.data.token);
                Cookies.set('user', JSON.stringify({
                    id: loginData.data.user.id,
                    name: loginData.data.user.name,
                    email: loginData.data.user.email,
                    photo: loginData.data.user.photo,
                }));
                // Cookies.set('permissions', JSON.stringify(loginData.data.permissions));
                window.location.href = process.env.REACT_APP_FRONTEND_URL + 'dashboard';
                //setSigninSuccess(true);
            });
    }

    return signinSuccess ? <Navigate to='/dashboard' /> :
        <>
            <main className="main-content  mt-0">
                <section>
                    <div className="page-header min-vh-75">
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-4 col-lg-5 col-md-6 d-flex flex-column mx-auto">
                                    <div className="card card-plain mt-8">
                                        <div className="card-header pb-0 text-left bg-transparent">
                                            <img src="/assets/img/logo.png" className="img-fluid" alt="" />
                                        </div>
                                        <div className="card-body">
                                            <form className={`needs-validation ${Object.keys(errors).length ? 'was-validated' : ''}`} onSubmit={handleSubmit(onSubmit)} noValidate>
                                                <label>{t('Email')}</label>
                                                <div className="mb-3">
                                                    <input type="email" className="form-control" placeholder={t('Email')} {
                                                        ...register('email', {
                                                            required: true
                                                        })
                                                    } required />
                                                    <div className="invalid-feedback">
                                                        {t(errors.email && errors.email.message)}
                                                    </div>
                                                </div>
                                                <label>{t('Password')}</label>
                                                <div className="mb-3">
                                                    <input type="password" className="form-control" placeholder={t('Password')} {
                                                        ...register('password', {
                                                            required: true
                                                        })
                                                    } required />
                                                    <div className={"invalid-feedback"}>
                                                        {t(errors.password && errors.password.message)}
                                                    </div>
                                                    <div className={t(errorMessage ? "text-danger d-block invalid-credential" : 'invalid-credential')}>
                                                        {t(errorMessage ? errorMessage : '')}
                                                    </div>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input" type="checkbox" {...register("checkbox")} />
                                                    <label className="form-check-label" htmlFor="rememberMe">{t('Remember me')}</label>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary w-100 mt-4 mb-0">{t('Sign in')}</button>
                                                </div>
                                            </form>
                                        </div>
                                        {/*
                                            <div className="card-footer text-center pt-0 px-lg-2 px-1">
                                                <p className="mb-4 text-sm mx-auto">
                                                    {t('Forgot password?')}
                                                    <a href="google.com" className="text-success text-gradient font-weight-bold">{t('Click here')}</a>
                                                </p>
                                            </div>
                                        */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {/*
                <footer className="footer py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-8 mx-auto text-center mt-1">
                                <p className="mb-0 text-secondary">
                                    Copyright © {new Date().getFullYear()} INGTEC. All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            */}
        </>;
}

export default Signin;
