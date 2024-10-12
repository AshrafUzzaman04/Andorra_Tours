import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faPencilAlt, faTrash, faVolumeUp, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import callFetch from 'helpers/callFetch';
import { Navigate, NavLink, useParams } from 'react-router-dom';

export default function TranslationEditor() {
    const params = useParams();
    const [sourceText, setScorceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState(false);
    useEffect(() => {
        if(!params)return;
        callFetch("getTranslationByKey/" + params?.code + "/" + params?.id, "GET", []).then((res) => {
            setScorceText(res.data?.key);
            setTranslatedText(res.data?.value);
        });
    }, [params]);

    const handleUpdate = () => {
        const formData = {};
        formData.key = sourceText;
        formData.value = translatedText;
        callFetch("updateTranslation/" + params?.code, "POST", formData, []).then((res) => {
            if (!res.ok) return;
            setSubmitSuccess(true);
        });
    }

    return submitSuccess ? <Navigate to="/translations"/>: (
        <div className="mt-4">
            <style>
                {`
          .translation-box {
            border-radius: 4px;
            padding: 15px;
            height: 200px;
            position: relative;
          }
          .flag-icon {
            width: 20px;
            height: 15px;
            margin-right: 5px;
          }
          .lang-code {
            color: #6c757d;
            font-size: 0.9em;
          }
          .action-icons {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #6c757d;
          }
          .action-icons svg {
            margin-left: 10px;
            cursor: pointer;
          }
          .file-info {
            position: absolute;
            bottom: 15px;
            left: 15px;
            color: #6c757d;
            font-size: 0.9em;
          }
          .translation-arrow {
            font-size: 24px;
            color: #007bff;
          }
          .btn-cancel {
            background-color: #e7f1ff;
            color: #007bff;
            border: none;
          }
          .btn-save {
            background-color: #007bff;
            color: white;
            border: none;
          }
          .editable-translation {
            width: 100%;
            height: 100px;
            border: none;
            resize: none;
            font-size: 1rem;
            padding: 0;
            margin-top: 10px;
          }
          .editable-translation:focus {
            outline: none;
          }
        `}
            </style>
            <div className="row justify-content-center">
                <div className="col-md-5 mb-3">
                    <div className="card">
                        <div className="translation-box">
                            <div>
                                <img src="https://flagcdn.com/w20/gb.png" alt="English" className="flag-icon" />
                                <span className="lang-code">en</span>
                            </div>
                            <div className="mt-3">{sourceText}</div>
                            <div className="action-icons">
                                <FontAwesomeIcon icon={faCopy} />
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            
                        </div>
                        <div className="card-footer p-0 border-top">
                            <div className="d-flex align-content-center align-items-center justify-content-start p-2">
                                <FontAwesomeIcon icon={faVolumeUp} className="me-2" />
                                message.php
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-1 mb-3">
                    <div className="text-center d-flex justify-content-center mt-7 mb-3">
                        <FontAwesomeIcon icon={faChevronRight} className="translation-arrow" />
                    </div>
                </div>

                <div className="col-md-5 mb-3">
                    <div className="card">
                        <div className="translation-box">
                            <div>
                                <img src={`https://flagcdn.com/w20/${params?.code}.png`} alt="Catalan" className="flag-icon" />
                                <span className="lang-code">{params?.code}</span>
                            </div>
                            <textarea
                                className="editable-translation"
                                value={translatedText}
                                onChange={(e) => setTranslatedText(e.target.value)}
                                placeholder="Enter translation here"
                            />
                        </div>
                        <div className="card-footer p-0 border-top">
                            <div className="d-flex justify-content-end">
                                <button className="py-2 mb-0 w-100 border-0 bg-white rounded-start rounded-2 text-danger fw-bold">CANCEL</button>
                                <button onClick={handleUpdate} className="py-2 mb-0 border-0 text-info bg-success w-100 rounded-end text-white fw-bold">SAVE TRANSLATION</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

           
        </div>
    );
}