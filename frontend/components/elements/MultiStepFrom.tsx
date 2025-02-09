"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import FormBuilderInputs from './FormBuilderInputs'
import Fetch from '@/helper/Fetch'
import { useParams, useRouter } from "next/navigation";
import { toast } from 'react-toastify';

export interface parsedDataTypes {
    title: string,
    fields: FieldsTypes[]
}

export interface FieldsTypes {
    length: number
    name: string,
    type: string | number,
    label: string,
    placeholder: string,
    options?: any
}

export interface MergerTypes {
    parsedForm: parsedDataTypes[]
}

export default function MultiStepForm({ parsedForm }: MergerTypes) {
    const { slug } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [steps, setSteps] = useState(0);
    const [formData, setFormData] = useState<Record<number, Record<string, any>>>({}); // Store step-wise data

    // Handle input changes dynamically for each step
    const handleInputChange = (stepIndex: number, fieldName: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [stepIndex]: {
                ...prevData[stepIndex],
                [fieldName]: value
            }
        }));
    };

    // Handle form submission
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (steps < parsedForm.length - 1) {
            setSteps(steps + 1);
        } else {
            submitDataToServer();
        }
    };

    // Send form data to the backend
    const submitDataToServer = async () => {
        setLoading(true);
        try {
            const response = await Fetch.post('/service-newsletter/formSubmit', {serviceSlug:slug, formData: JSON.stringify(formData)});

            if (response) {
                toast.success("Newsletter Submitted Successfully!");

                // Wait 3 seconds, then reload the page
                setTimeout(() => {
                    setFormData({}); // Clear form data
                    setSteps(0); // Reset step to the first step
                    setLoading(false);
                    router.refresh();
                }, 300);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            {parsedForm?.length !== 0 && (
                <div className="background-card">
                    <section className="section-box box-subscriber background-body pt-150">
                        <div className="container">
                            <div className="p-5 dynamic-from-card dynamic-form-card d-flex align-items-center justify-content-center">
                                <div className="row">
                                    <div className="col-lg-12 mb-30">
                                        <h2 className="text-center neutral-1000 mb-25">
                                            {parsedForm[steps]?.title}
                                        </h2>
                                        <div className="form-contact">
                                            <form onSubmit={onSubmit}>
                                                <div className="row">
                                                    {parsedForm[steps]?.fields?.map((form, index) => (
                                                        <div key={index} className={`${index === 0 ? "col-lg-12" : "col-lg-4"}`}>
                                                            <FormBuilderInputs
                                                                label={form?.label}
                                                                name={form?.name}
                                                                type={form?.type}
                                                                placeholder={form?.placeholder}
                                                                options={form?.options}
                                                                value={formData[steps]?.[form.name] || ''}
                                                                onChange={(value) => handleInputChange(steps, form.name, value)}
                                                            />
                                                        </div>
                                                    ))}

                                                    <div className="row">
                                                        {steps > 0 && (
                                                            <div className="mt-40 col-lg-6">
                                                                <button type="button" onClick={() => setSteps(steps - 1)} className="btn btn-book">
                                                                    Back
                                                                </button>
                                                            </div>
                                                        )}
                                                        <div className="mt-40 col-lg-6">
                                                            <button disabled={loading} className="btn btn-book">
                                                                {steps < parsedForm.length - 1 ? "Next" : "Submit"}
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
