import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage, faSignOutAlt, faCog, faTrash, faPlus, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LanguagesIcon } from 'lucide-react';
import callFetch from 'helpers/callFetch';
import { useForm } from 'react-hook-form';
import deleteAlert from 'helpers/deleteAlert';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const availableLanguages = [
    { name: 'Arabic', code: 'ar', flag: 'sa', progress: 0 },
    { name: 'Bengali', code: 'bn', flag: 'bd', progress: 0 },
    { name: 'Chinese', code: 'zh', flag: 'cn', progress: 0 },
    { name: 'Dutch', code: 'nl', flag: 'nl', progress: 0 },
    { name: 'English', code: 'en', flag: 'gb', progress: 0 },
    { name: 'French', code: 'fr', flag: 'fr', progress: 0 },
    { name: 'German', code: 'de', flag: 'de', progress: 0 },
    { name: 'Greek', code: 'el', flag: 'gr', progress: 0 },
    { name: 'Hindi', code: 'hi', flag: 'in', progress: 0 },
    { name: 'Italian', code: 'it', flag: 'it', progress: 0 },
    { name: 'Japanese', code: 'ja', flag: 'jp', progress: 0 },
    { name: 'Korean', code: 'ko', flag: 'kr', progress: 0 },
    { name: 'Portuguese', code: 'pt', flag: 'pt', progress: 0 },
    { name: 'Russian', code: 'ru', flag: 'ru', progress: 0 },
    { name: 'Spanish', code: 'es', flag: 'es', progress: 0 },
    { name: 'Swedish', code: 'sv', flag: 'se', progress: 0 },
    { name: 'Turkish', code: 'tr', flag: 'tr', progress: 0 },
    { name: 'Urdu', code: 'ur', flag: 'pk', progress: 0 },
    { name: 'Vietnamese', code: 'vi', flag: 'vn', progress: 0 },
    { name: 'Andorran', code: 'ad', flag: 'ad', progress: 0 },
    { name: 'Argentinian', code: 'ar', flag: 'ar', progress: 0 },
    { name: 'Albanian', code: 'sq', flag: 'al', progress: 0 },
    { name: 'Bosnian', code: 'bs', flag: 'ba', progress: 0 },
    { name: 'Croatian', code: 'hr', flag: 'hr', progress: 0 },
    { name: 'Danish', code: 'da', flag: 'dk', progress: 0 },
    { name: 'Estonian', code: 'et', flag: 'ee', progress: 0 },
    { name: 'Finnish', code: 'fi', flag: 'fi', progress: 0 },
    { name: 'Hungarian', code: 'hu', flag: 'hu', progress: 0 },
    { name: 'Icelandic', code: 'is', flag: 'is', progress: 0 },
    { name: 'Irish', code: 'ga', flag: 'ie', progress: 0 },
    { name: 'Latvian', code: 'lv', flag: 'lv', progress: 0 },
    { name: 'Lithuanian', code: 'lt', flag: 'lt', progress: 0 },
    { name: 'Maltese', code: 'mt', flag: 'mt', progress: 0 },
    { name: 'Norwegian', code: 'no', flag: 'no', progress: 0 },
    { name: 'Polish', code: 'pl', flag: 'pl', progress: 0 },
    { name: 'Romanian', code: 'ro', flag: 'ro', progress: 0 },
    { name: 'Serbian', code: 'sr', flag: 'rs', progress: 0 },
    { name: 'Slovak', code: 'sk', flag: 'sk', progress: 0 },
    { name: 'Slovenian', code: 'sl', flag: 'si', progress: 0 },
    { name: 'Ukrainian', code: 'uk', flag: 'ua', progress: 0 },
    { name: 'Bulgarian', code: 'bg', flag: 'bg', progress: 0 },
    { name: 'Czech', code: 'cs', flag: 'cz', progress: 0 },
    { name: 'Portuguese (Brazil)', code: 'pt-BR', flag: 'br', progress: 0 },
    { name: 'Catalan', code: 'ca', flag: 'es', progress: 0 },
    { name: 'Basque', code: 'eu', flag: 'es', progress: 0 },
    { name: 'Galician', code: 'gl', flag: 'es', progress: 0 },
    { name: 'Luxembourgish', code: 'lb', flag: 'lu', progress: 0 },
    { name: 'Belarusian', code: 'be', flag: 'by', progress: 0 },
    { name: 'Montenegrin', code: 'cnr', flag: 'me', progress: 0 },
];





function AddLanguageModal({ show, onHide, onAddLanguages, onRefresh }) {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [refresh, setRefresh] = useState(0)
    const {
        setValue,
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset
    } = useForm();


    // useEffect(() => {
    //     if(refresh === 0){
    //         setTimeout(()=>{
    //             callFetch("language", "GET", setError).then((res) => {
    //                 setSelectedLanguages(res?.data)
    //                 setRefresh(refresh + 1);
    //             });
    //         },2000)
    //     }
    // }, [onHide,refresh]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageToggle = (language) => {
        setSelectedLanguages(prevSelected =>
            prevSelected.some(lang => lang.code === language.code)
                ? prevSelected.filter(lang => lang.code !== language.code)
                : [...prevSelected, language]
        );
    };

    const handleAddLanguages = () => {
        // Ensure selectedLanguages includes language_code
        const languagesToSubmit = selectedLanguages.map(language => ({
            name: language.name,
            code: language.code,
            language_code: language.code,
            flag: language.flag,
            progress: language.progress,
        }));
        const formData = {};
        formData.language = JSON.stringify(languagesToSubmit);
        callFetch("languages", "POST", formData, setError).then((res) => {
            if (!res.ok) return;
            setSelectedLanguages([]);
            reset();
            onHide();
            setRefresh(0)
            onRefresh();
        });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faLanguage} className="me-2" />
                    Add Languages
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted">Select the languages you want to add to your project.</p>
                <div className="position-relative" ref={dropdownRef}>
                    <div
                        className="form-control d-flex flex-wrap align-items-center"
                        style={{ minHeight: '38px', cursor: 'pointer' }}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        {selectedLanguages.length === 0 && (
                            <span className="text-muted">Select languages</span>
                        )}
                        {selectedLanguages.map((language, index) => (
                            <span
                                key={index}
                                className="badge bg-light text-dark me-1 mb-1"
                                style={{ display: 'flex', alignItems: 'center' }}
                            >
                                <img
                                    src={`https://flagcdn.com/w20/${language.flag}.png`}
                                    alt={language.name}
                                    style={{ width: '16px', marginRight: '4px' }}
                                />
                                {language.name}
                                <FontAwesomeIcon
                                    icon={faTimes}
                                    className="ms-1"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLanguageToggle(language);
                                    }}
                                />
                            </span>
                        ))}
                        <FontAwesomeIcon icon={faChevronDown} className="ms-auto" />
                    </div>
                    {isDropdownOpen && (
                        <div className="position-absolute w-100 mt-1 border rounded bg-white shadow-sm overflow-scroll language-add" style={{ zIndex: 1000, height:"300px" }}>
                            {availableLanguages.map((language, index) => (
                                <div
                                    key={index}
                                    className="p-2 d-flex align-items-center"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleLanguageToggle(language)}
                                >
                                    <img
                                        src={`https://flagcdn.com/w20/${language.flag}.png`}
                                        alt={language.name}
                                        style={{ width: '20px', marginRight: '8px' }}
                                    />
                                    {language.name}
                                    {selectedLanguages.some(lang => lang.code === language.code) && (
                                        <FontAwesomeIcon icon={faTimes} className="ms-auto" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-danger mt-2">{errors.name && errors.name.message}</div>
            </Modal.Body>
            <Modal.Footer>
               <div className=" d-flex w-100 gap-2">
                <Button variant="outline-secondary" className="w-100" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="primary" className="w-100" onClick={handleAddLanguages}>
                        Add Languages
                    </Button>
               </div>
            </Modal.Footer>
        </Modal>
    );
}

export default function Translatioin() {
    const { t } = useTranslation();
    const [refresh, setRefresh] = useState(0)
    const [language, setLanguage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [languages, setLanguages] = useState([]);
    const {
        setValue,
        register,
        handleSubmit,
        setError,
        formState: { errors },
        reset
    } = useForm();

    useEffect(() => {
        if(refresh === 0){
            callFetch("language?page=" + pageNumber, "GET", setError).then((res) => {
                if (!res.ok) return;
                setLanguages(res?.data)
                setRefresh(refresh + 1);
            });
        }
    }, [refresh]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);

    const filteredLanguages = languages.filter(lang =>
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddLanguages = (newLanguages) => {
        setLanguages(prevLanguages => [...prevLanguages, ...newLanguages]);
    };

    return (
        <div className="row mt-4">
            <div className="col-md-12">
                <Card className="">
                    <Card.Body className="pb-0 px-0">
                        <div className="d-flex justify-content-between align-items-center mb-3 mx-3">
                            <h5 className="card-title mb-0">Languages</h5>
                            <div className="input-group" style={{ maxWidth: '300px' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search languages by name or code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <table className="table table-hover table-responsive-sm">
                            <thead>
                                <tr>
                                    <th style={{ width: '30px' }}></th>
                                    <th>Language name</th>
                                    <th>Translation progress</th>
                                    <th style={{ width: '30px' }}></th>
                                    <th style={{ width: '30px' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLanguages.map((lang) => (
                                    <tr key={lang.code}>
                                        <td>{lang.code !== "en" && <input type="checkbox" className="form-check-input bg-light" />}</td>
                                        <td>
                                            <img
                                                src={`https://flagcdn.com/w20/${lang.flag}.png`}
                                                alt={lang.name}
                                                style={{ width: '20px', height: '15px', marginRight: '10px' }}
                                            />
                                            {lang.name} <span className="text-muted">{lang.code}</span>
                                        </td>
                                        <td>
                                            {lang.sourceKeys ? (
                                                `${lang.sourceKeys} source keys`
                                            ) : (
                                                <div className="progress abs" style={{ height: '6px' }}>
                                                    <div
                                                        className={`progress-bar ${lang.progress > 10 ? 'bg-success' : 'bg-secondary'}`}
                                                        role="progressbar"
                                                        style={{ width: `${lang.progress}%`, height: '7px' }}
                                                        aria-valuenow={lang.progress}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    ></div>
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <Link to={"/translations/"+lang?.id}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={23} hanging={23} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                                                </svg>
                                            </Link>
                                        </td>
                                        <td>
                                            {lang.code !== "en" &&<FontAwesomeIcon icon={faTrash} onClick={(e) => deleteAlert(e, 'languages', lang?.id, t).then(res => setRefresh(0))} className="text-muted cursor-pointer" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        
                    </Card.Body>
                    <Card.Footer className="pb-2 pt-2 border-top">
                        <div className="d-flex align-items-center justify-content-between">
                        <h1 onClick={() => setShowAddLanguageModal(true)} className="text-muted font-size-14 fw-bold mt-1 cursor-pointer">ADD NEW LANGUAGE</h1>
                        <FontAwesomeIcon icon={faPlus} className="me-2 cursor-pointer" onClick={() => setShowAddLanguageModal(true)} />
                        
                            {/* <button className="btn btn-outline-secondary border-0" onClick={() => setShowAddLanguageModal(true)}>
                                
                            </button> */}
                        </div>
                    </Card.Footer>
                </Card>
            </div>

            <AddLanguageModal
                show={showAddLanguageModal}
                onHide={() => setShowAddLanguageModal(false)}
                onRefresh={()=>setRefresh(0)}
                onAddLanguages={handleAddLanguages}
            />
        </div>
    );
}