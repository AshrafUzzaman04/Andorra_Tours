import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import callFetch from "helpers/callFetch";
import SoftEditor from "components/SoftEditor";

const QuestionAnswer = ({ formData }) => {
    const { register, handleSubmit, setError, setValue, getValues, errors } = formData;
    const [editorContent, setEditorContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        if (answers?.length === 0) {
            setAnswers([{ id: 0, question: "", answer: "" }])
        }
    }, [0])

    useEffect(() => {
        const jsonDetails = getValues("answers");
        if (jsonDetails?.length > 0) {
            setAnswers(JSON.parse(jsonDetails))
        }
    }, [0])


    function deleteProduct() {
        var titems = [];
        answers.map((t) => {
            if (!t)
                return;
            titems.push(t);
        });
        setAnswers(titems);
        setRefresh(refresh + 1);
        setValue("answers", JSON.stringify(answers))
    }
    return (
        <>
            <div className="row g-3">
                <div className="col-md-12">
                    <div class="form-group">
                        <label>{t("Question Title")} *</label>
                        <input
                            type="text"
                            className="form-control mb-4"
                            placeholder={t("Question Title")}
                            {...register("question_title", {
                                required: true,
                            })}
                            required
                        />
                        <div className="invalid-feedback">
                            {errors.question_title && errors.question_title.message}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    answers && answers?.map((answer, i) => (
                        <>
                            <div key={i} className="col-md-6">
                                <label>{t("Question")} *</label>
                                <input
                                    type="text"
                                    className="form-control mb-4"
                                    placeholder={t("Question")}
                                    defaultValue={answer?.question}
                                    onChange={(e) => {
                                        answers[i].id = i + 1;
                                        answers[i].question = e.target.value;
                                        setAnswers(answers)
                                        setValue("answers", JSON.stringify(answers))

                                    }}
                                    required
                                />
                                <div className="invalid-feedback">
                                    {errors.question && errors.question.message}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex align-items-center w-100">
                                    <div class="form-group w-100">
                                        <label>{t("Answer")} *</label>
                                        <input
                                            type="text"
                                            className="form-control mb-4"
                                            placeholder={t("Answer")}
                                            defaultValue={answer?.answer}
                                            onChange={(e) => {
                                                answers[i].id = i + 1;
                                                answers[i].answer = e.target.value;
                                                setAnswers(answers)
                                                setValue("answers", JSON.stringify(answers))

                                            }}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            {errors.answer && errors.answer.message}
                                        </div>
                                    </div>
                                    &nbsp;
                                    <i className="fa-solid fa-circle-xmark text-danger cursor-pointer" data-key={i} onClick={() => { delete answers[i]; deleteProduct(); }}></i>
                                </div>
                                
                            </div>

                        </>
                    ))
                }
                <div className="col-md-12">
                    <button type="button" className="btn btn-sm btn-primary" onClick={() => setAnswers([...answers, { id: 0, question: "", answer: "" }])}>Add <i class="fas fa-plus"></i> </button>
                </div>
            </div>
        </>
    )
}

export default QuestionAnswer