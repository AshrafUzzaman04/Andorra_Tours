import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faChevronLeft, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import callFetch from 'helpers/callFetch';





export default function TranslationTable() {
    const params = useParams();
    const [refresh, setRefresh] = useState(0);
    const [entries, setEntries] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = pagination?.last_page;
    useEffect(() => {
        if(refresh === 0){
            callFetch("LanguageFile/" + params?.id + "?page=" + currentPage, "GET", []).then((res) => {
                if (!res.ok) return;
                setRefresh(refresh + 1)
                setEntries(res?.data)
                setPagination(res?.pagination)
                //setCurrentPage(res?.data)
            });
        }
    }, [currentPage]);
    return (
        <div className="container-fluid mt-4">

            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by key or value"
                            />
                        </div>
                        <div className="col-md-6 text-end">
                            <div className="d-inline-block position-relative">
                                <select className="form-select pe-5" style={{ width: 'auto', appearance: 'none' }}>
                                    <option>Filter by status</option>
                                </select>
                                <FontAwesomeIcon icon={faChevronDown} className="position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>State</th>
                                <th style={{ width: '25%' }}>Key</th>
                                <th style={{ width: '35%' }}>Source</th>
                                <th style={{ width: '30%' }}>Translation</th>
                                <th style={{ width: '5%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entries.map((entry, index) => (
                                <tr key={index} className={entry.state ? 'bg-light-green' : ''}>
                                    <td className="text-center" style={{ width: '50px' }}>
                                        {entry.state && <FontAwesomeIcon icon={faCheck} className="text-success" />}
                                    </td>
                                    <td style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {entry.key}
                                    </td>
                                    <td className="text-muted-custom" style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {entry.source}
                                    </td>
                                    <td style={{ wordWrap: 'break-word', whiteSpace: 'normal', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {entry.translation}
                                    </td>
                                    <td className="text-center" style={{ width: '50px' }}>
                                        <Link to={"/translations/translate/"+entry?.code+"/"+entry?.key}>
                                            <FontAwesomeIcon icon={faPencilAlt} className="text-muted-custom" style={{ cursor: 'pointer' }} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-white">
                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            disabled={currentPage === 1} // Disable if on the first page
                            onClick={() => {
                                if (currentPage > 1) {
                                    setCurrentPage(currentPage - 1); // Decrease the page number
                                    setRefresh(0);
                                }
                            }}
                            className="btn btn-outline-secondary me-2"
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span className="text-muted-custom">
                            {pagination?.current_page} of {pagination?.last_page}
                        </span>
                        <button
                            disabled={currentPage === pagination?.last_page} // Disable if on the last page
                            onClick={() => {
                                if (currentPage < pagination?.last_page) {
                                    setCurrentPage(currentPage + 1); // Increase the page number
                                    setRefresh(0);
                                }
                            }}
                            className="btn btn-outline-secondary ms-2"
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}