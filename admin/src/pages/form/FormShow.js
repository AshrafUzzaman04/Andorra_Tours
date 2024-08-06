import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { callFetch } from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import flatpickr from "flatpickr";

function FormShow() {
    let params = useParams();
    const { t } = useTranslation();
    const [formView, setFormView] = useState('');
    const [saving, setSaving] = useState(false);
    const [refresh, setRefresh] = useState(1);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        callFetch("forms/" + params.id + "/edit", "GET", [], []).then((res) => {
            setFormView(res.data.form.view);
            var employeeOptions = [];
            res.data.employees.map((employee) => {
                employeeOptions.push({ 'value': employee.user.id, 'label': employee.user.name });
            });

            var fOptions = [];
            res.data.customers.map((customer) => {
                fOptions.push({ 'value': customer.id, 'label': customer.name });
            });

            flatpickr(".flat-pickr");

            setTimeout(() => {
                if (document.querySelector('.choice-name')) {
                    let elements = document.querySelectorAll('.choice-name');
                    Array.from(elements).forEach((element, index) => {
                        let choices = new window.Choices(element, {
                            removeItemButton: true
                        });
                        choices.setChoices(
                            employeeOptions,
                            'value',
                            'label',
                            false
                        );
                    });
                }

                if (document.querySelector('.choice-company')) {
                    let elements = document.querySelectorAll('.choice-company');
                    Array.from(elements).forEach((element, index) => {
                        let choices2 = new window.Choices(element, {
                            removeItemButton: true
                        });
                        choices2.setChoices(
                            fOptions,
                            'value',
                            'label',
                            false
                        );
                    });
                }
            }, 400);
        });
    }, []);

    return submitSuccess ? <Navigate to='/forms' /> :
        <div className="row">
            <div className="col-lg-10 col-12 mx-auto">
                <ul id="theForm" dangerouslySetInnerHTML={{ __html: formView }}></ul>
            </div>
        </div>;
}

export default FormShow;
