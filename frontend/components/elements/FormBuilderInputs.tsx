import React from 'react'

export interface FieldsTypes {
    name: string,
    type: string | number,
    label: string,
    placeholder: string,
    options?: any,
    value?: any,
    onChange: (value: any) => void
}

export default function FormBuilderInputs({ label, name, type, placeholder, options, value, onChange }: FieldsTypes) {
    switch (type) {
        case "text":
        case "date":
        case "file":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <input
                        className={`form-control ${name}`}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required
                    />
                </div>
            );
        case "textarea":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <textarea
                        className={`form-control ${name}`}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required
                    />
                </div>
            );

        case "checkbox":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                            required
                        /> {label}
                    </label>
                </div>
            );

        case "radio":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    {options?.map((option: any, index: any) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name={name}
                                value={option.value}
                                checked={value === option.value}
                                onChange={(e) => onChange(e.target.value)}
                                required
                            />
                            {option.label}
                        </div>
                    ))}
                </div>
            );

        case "select":
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <select
                        className={`form-control ${name}`}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required
                    >
                        {options?.map((option: any, index: any) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            );

        default:
            return (
                <div className="form-group">
                    <label className="text-sm-medium neutral-1000">{label}</label>
                    <input
                        className={`form-control ${name}`}
                        type={typeof type === 'number' ? String(type) : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        required
                    />
                </div>
            );
    }
}
