"use client"
import React, { FormEvent, ReactEventHandler, useState } from 'react'
import FormBuilderInputs from './FormBuilderInputs'
export interface parsedDataTypes {
    title: string,
    fields: FieldsTypes[]
}
export interface FieldsTypes {
    length: number
    name: string,
    type: string | number,
    label: string,
    placeholder: string
}
export interface MergerTypes {
    parsedForm: parsedDataTypes[]
}
export default function MultiStepFrom({ parsedForm }: MergerTypes) {
    const [steps, setSteps] = useState(0);
    const hasOdd = parsedForm[steps]?.fields.some((field) => field.length % 2 !== 0);
    const hasEven = parsedForm[steps]?.fields.some((field) => field.length % 2 === 0);
    const onSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (parsedForm?.length - 1 !== steps) {
            setSteps((prevSteps) => prevSteps + 1);
        }

    };

    return (
        <>
            {
                parsedForm?.length !== 0 && <div className="background-card">
                    <section className="section-box box-subscriber background-body pt-150">
                        <div className="container">
                            <div className="dynamic-from-card dynamic-form-card d-flex align-items-center justify-content-center p-5 wow fadeInUp">
                                <div className="row">
                                    <div className="col-lg-12 mb-30">
                                        <h2 className="neutral-1000 mb-25 text-center">{parsedForm[steps]?.title}</h2>
                                        <div className="form-contact">
                                            <form onSubmit={onSubmit}>
                                                <div className="row">
                                                    {parsedForm && parsedForm[steps]?.fields?.map((form: any, index: any) => (
                                                        <div key={index} className={`${index === 0 ? "col-lg-12" : "col-lg-4"}`}>
                                                            <FormBuilderInputs label={form?.label} name={form?.name} type={form?.type} placeholder={form?.placeholder} options={form?.options}/>
                                                        </div>
                                                    ))}

                                                    {
                                                        steps > 0 ? <div className="row">
                                                            <div className="col-lg-6 mt-40">
                                                                <button onClick={() => setSteps(steps - 1)} className="btn btn-book">
                                                                    Back
                                                                </button>
                                                            </div>
                                                            <div className="col-lg-6 mt-40">
                                                                <button className="btn btn-book">Send message
                                                                    <svg width={17} height={16} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div> : <div className="col-lg-12 mt-40">
                                                            <button className="btn btn-book">Send message
                                                                <svg width={17} height={16} viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    }

                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            }
        </>
    )
}
