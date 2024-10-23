import React from 'react'

export interface FieldsTypes{
    name: string,
    type: string | number,
    label: string,
    placeholder: string,
    options?: any
}
export default function FormBuilderInputs({label, name, type, placeholder,options}:FieldsTypes) {
    switch (type) {
        case "text":
            return <div className="form-group">
                <label className="text-sm-medium neutral-1000">{label}</label>
                <input className={`form-control ${name}`} type={type} placeholder={placeholder} required />
            </div>
        case "date":
            return <div className="form-group">
                <label className="text-sm-medium neutral-1000">{label}</label>
                <input className={`form-control ${name}`} type={type} placeholder={placeholder} required />
            </div>
         case "textarea":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <textarea 
                        className={`form-control ${name}`} 
                        placeholder={placeholder} 
                        required 
                    />
                </div>
            );

        case "checkbox":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">
                        <input 
                            className={`form-control ${name}`} 
                            type="checkbox" 
                            required 
                        /> {label}
                    </label>
                </div>
            );

        case "radio":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    {
                        options && options.map((option: any, index: any) => (
                            <div key={index}>
                                <input 
                                    className={`form-control ${name}`} 
                                    type="radio" 
                                    name={name} 
                                    value={option.value} 
                                    required 
                                />
                                {option.label}
                            </div>
                        ))
                    }
                </div>
            );

        case "select":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <select className={`form-control ${name}`} required>
                        {
                            options && options.map((option: any, index: any) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>
            );

        case "file":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <input 
                        className={`form-control ${name}`} 
                        type="file" 
                        required 
                    />
                </div>
            )
        default:
            return <div className="form-group">
                <label className="text-sm-medium neutral-1000">{label}</label>
                <input className={`form-control ${name}`} type={typeof type === 'number' ? String(type) : type} placeholder={placeholder} required />
            </div>
    }
}
