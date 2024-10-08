import React, { useEffect, useState } from 'react'
import { Plus, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react'
import callFetch from 'helpers/callFetch'
import { useParams } from 'react-router-dom'

export default function FormBuilder() {
    const params = useParams();
    const [refresh, setRefresh] = useState(0);
    const [saving, setSaving] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errors, setError] = useState();
    const [form, setForm] = useState();
    const [formStructure, setFormStructure] = useState([
        {
            title: "ACTIVIDAD GRUPAL",
            fields: [
                { name: "parroquia", label: "Parroquia", type: "text" },
                { name: "fechaEntrada", label: "Fecha Entrada", type: "date" },
                { name: "fechaSalida", label: "Fecha Salida", type: "date" },
                { name: "personas", label: "Personas", type: "number" },
            ]
        },
        {
            title: "ACTIVIDAD GRUPAL",
            fields: [
                { name: "nombre", label: "Nombre", type: "text", placeholder: "Nombre" },
                { name: "apellido", label: "Apellido", type: "text", placeholder: "Apellido" },
                { name: "email", label: "Email", type: "email", placeholder: "Dirección E-Mail" },
                { name: "telefono", label: "Teléfono", type: "tel", placeholder: "Teléfono" },
                { name: "peticion", label: "Petición / Comentarios", type: "textarea" },
                { name: "informado", label: "Me Gustaría Estar Informado De Las Novedades De Tours Andorra", type: "checkbox" },
                { name: "acepto", label: "Acepto Términos Y Condiciones De Tours Andorra", type: "checkbox" },
            ]
        }
    ])

    const fieldTypes = [
        { value: "text", label: "Text" },
        { value: "number", label: "Number" },
        { value: "email", label: "Email" },
        { value: "tel", label: "Telephone" },
        { value: "date", label: "Date" },
        { value: "textarea", label: "Textarea" },
        { value: "checkbox", label: "Checkbox" },
        { value: "radio", label: "Radio" },
        { value: "select", label: "Select" },
        { value: "file", label: "File Upload" },
    ]

    useEffect(() => {
        callFetch("form/" + params?.id, "GET", []).then((res) => {
            if (!res.ok) return;
            if (res?.data?.form) {
                setFormStructure(JSON.parse(res?.data?.form));
            }
            setForm(res?.data)
        });
    }, [refresh])

    const addStep = () => {
        setFormStructure([...formStructure, { title: "New Step", fields: [] }])
    }

    const removeStep = (stepIndex) => {
        setFormStructure(formStructure.filter((_, index) => index !== stepIndex))
    }

    const addField = (stepIndex) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex].fields.push({ name: "", label: "", type: "text" })
        setFormStructure(newFormStructure)
    }

    const removeField = (stepIndex, fieldIndex) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex].fields.splice(fieldIndex, 1)
        setFormStructure(newFormStructure)
    }

    const updateStep = (stepIndex, key, value) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex][key] = value
        setFormStructure(newFormStructure)
    }

    const updateField = (stepIndex, fieldIndex, key, value) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex].fields[fieldIndex][key] = value
        if (key === 'type' && value === 'select' && !newFormStructure[stepIndex].fields[fieldIndex].options) {
            newFormStructure[stepIndex].fields[fieldIndex].options = []
        }
        setFormStructure(newFormStructure)
    }

    const addOption = (stepIndex, fieldIndex) => {
        const newFormStructure = [...formStructure]
        if (!newFormStructure[stepIndex].fields[fieldIndex].options) {
            newFormStructure[stepIndex].fields[fieldIndex].options = []
        }
        newFormStructure[stepIndex].fields[fieldIndex].options.push({ value: '', label: '' })
        setFormStructure(newFormStructure)
    }

    const updateOption = (stepIndex, fieldIndex, optionIndex, key, value) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex].fields[fieldIndex].options[optionIndex][key] = value
        setFormStructure(newFormStructure)
    }

    const removeOption = (stepIndex, fieldIndex, optionIndex) => {
        const newFormStructure = [...formStructure]
        newFormStructure[stepIndex].fields[fieldIndex].options.splice(optionIndex, 1)
        setFormStructure(newFormStructure)
    }

    const moveStep = (stepIndex, direction) => {
        if ((direction === 'up' && stepIndex > 0) || (direction === 'down' && stepIndex < formStructure.length - 1)) {
            const newFormStructure = [...formStructure]
            const step = newFormStructure.splice(stepIndex, 1)[0]
            newFormStructure.splice(direction === 'up' ? stepIndex - 1 : stepIndex + 1, 0, step)
            setFormStructure(newFormStructure)
        }
    }

    const saveFormStructure = () => {
        const formData = {};
        formData.form = JSON.stringify(formStructure, null, 2);
        formData.service_id = params?.id;
        if (form?.service_id) formData._method = "PUT";
        setSaving(true);
        callFetch(form?.service_id ? "form/" + form?.service_id : "form", "POST", formData, setError).then((res) => {
            setSaving(false);
            if (!res.ok) return;
            setSubmitSuccess(true);
            setRefresh(refresh + 1);
        });
    }

    return (
        <div className="row mt-4">
            <div className="col-12">
                <div className="accordion" id="formBuilderAccordion">
                    {formStructure.map((step, stepIndex) => (
                        <div className="accordion-item mb-3" key={stepIndex}>
                            <div className="card rounded">
                                <div className="accordion-header d-flex align-items-center justify-content-between" id={`heading${stepIndex}`}>
                                    <div>
                                        <button
                                            className="accordion-button collapsed flex-grow-1 text-dark"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${stepIndex}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${stepIndex}`}
                                        >
                                            Step {stepIndex + 1}: {step.title}
                                        </button>
                                    </div>
                                    <div className="d-flex align-items-center pt-3 me-2">
                                        <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => moveStep(stepIndex, 'up')}>
                                            <ChevronUp size={16} />
                                        </button>
                                        <button className="btn btn-outline-secondary btn-sm me-1" onClick={() => moveStep(stepIndex, 'down')}>
                                            <ChevronDown size={16} />
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeStep(stepIndex)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div
                                    id={`collapse${stepIndex}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${stepIndex}`}
                                    data-bs-parent="#formBuilderAccordion"
                                >
                                    <div className="accordion-body">
                                        <div className="mb-3">
                                            <label htmlFor={`step-title-${stepIndex}`} className="form-label">Step Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`step-title-${stepIndex}`}
                                                value={step.title}
                                                onChange={(e) => updateStep(stepIndex, 'title', e.target.value)}
                                            />
                                        </div>
                                        {step.fields.map((field, fieldIndex) => (
                                            <div key={fieldIndex} className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title d-flex justify-content-between align-items-center">
                                                        Field {fieldIndex + 1}
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => removeField(stepIndex, fieldIndex)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </h5>
                                                    <div className="mb-3">
                                                        <label htmlFor={`field-name-${stepIndex}-${fieldIndex}`} className="form-label">Field Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id={`field-name-${stepIndex}-${fieldIndex}`}
                                                            value={field.name}
                                                            onChange={(e) => updateField(stepIndex, fieldIndex, 'name', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor={`field-label-${stepIndex}-${fieldIndex}`} className="form-label">Field Label</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id={`field-label-${stepIndex}-${fieldIndex}`}
                                                            value={field.label}
                                                            onChange={(e) => updateField(stepIndex, fieldIndex, 'label', e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor={`field-type-${stepIndex}-${fieldIndex}`} className="form-label">Field Type</label>
                                                        <select
                                                            className="form-select"
                                                            id={`field-type-${stepIndex}-${fieldIndex}`}
                                                            value={field.type}
                                                            onChange={(e) => updateField(stepIndex, fieldIndex, 'type', e.target.value)}
                                                        >
                                                            {fieldTypes.map((type) => (
                                                                <option key={type.value} value={type.value}>
                                                                    {type.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {field.type === 'select' && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Select Options</label>
                                                            {field.options && field.options.map((option, optionIndex) => (
                                                                <div key={optionIndex} className="d-flex align-items-center ">
                                                                    <input
                                                                        type="text"
                                                                        className="form-control me-2"
                                                                        placeholder="Value"
                                                                        value={option.value}
                                                                        onChange={(e) => updateOption(stepIndex, fieldIndex, optionIndex, 'value', e.target.value)}
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        className="form-control me-2"
                                                                        placeholder="Label"
                                                                        value={option.label}
                                                                        onChange={(e) => updateOption(stepIndex, fieldIndex, optionIndex, 'label', e.target.value)}
                                                                    />
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-danger btn-sm mt-2"
                                                                        onClick={() => removeOption(stepIndex, fieldIndex, optionIndex)}
                                                                    >
                                                                        <Trash2 size={16} />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary btn-sm"
                                                                onClick={() => addOption(stepIndex, fieldIndex)}
                                                            >
                                                                <Plus size={16} /> Add Option
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="mb-3">
                                                        <label htmlFor={`field-placeholder-${stepIndex}-${fieldIndex}`} className="form-label">Placeholder (optional)</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id={`field-placeholder-${stepIndex}-${fieldIndex}`}
                                                            value={field.placeholder || ''}
                                                            onChange={(e) => updateField(stepIndex, fieldIndex, 'placeholder', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            type="button"
                                            className="btn btn-primary w-100"
                                            onClick={() => addField(stepIndex)}
                                        >
                                            <Plus size={16} className="me-2" /> Add Field
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-3">
                    {!saving && (
                        <>
                            <button type="button" className="btn btn-primary me-2" onClick={addStep}>
                                <Plus size={16} className="me-2" /> Add Step
                            </button>
                            <button type="button" className="btn btn-success" onClick={saveFormStructure}>
                                <Save size={16} className="me-2" /> Save
                            </button>
                        </>
                    )}
                    {saving && (
                        <>
                            <button disabled type="button" className="btn btn-primary me-2" onClick={addStep}>
                                <Plus size={16} className="me-2" /> Add Step
                            </button>
                            <button disabled type="button" className="btn btn-success" onClick={saveFormStructure}>
                                <Save size={16} className="me-2" /> Saveing...
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}