import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../helpers/deleteAlert";
import dateFormat from "dateformat";
import Cookies from 'js-cookie';

function FormIndexTable() {
    const { t } = useTranslation();
    const [data, setData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    const [searchCategory,setSearchCategory] = useState("")

    useEffect(() => {
        callFetch("forms?page=" + pageNumber+"&search="+searchKey+"&category="+searchCategory, "GET", []).then((res) => {
            setData(res.data);
        });
    }, [pageNumber, refresh, searchKey, searchCategory]);

    const duplicate = (id) => {
        callFetch("forms/duplicate/"+id, "GET", []).then((res) => {
            window.location.href = process.env.REACT_APP_FRONTEND_URL + 'form-builder.php?id='+res.data;
        });
    }

    const tableHeadings = [
        {
            name: t('ID'),
            selector: row => row.id
        },
        {
            name: t('Name'),
            selector: row => <a href={'/form-builder.php?id=' + row.id}><u>{row.name}</u></a>
        },
        {
            name: t('Category'),
            selector: row => row.category
        },
        {
            name: t('Status'),
            selector: row => <span className="badge badge-dot me-4">
                {row.status === 'Active' ? <i className="bg-success"></i> : <i className="bg-danger"></i>}
                <span className="text-dark text-xs">{t(row.status)}</span>
            </span>
        },
        {
            name: t('Creator Name'),
            selector: row => row.user.name
        },
        {
            name: t('Created At'),
            selector: row => dateFormat(row.created_at, "dd.mm.yyyy")
        },
        {
            name: t('Actions'),
            cell: row => <div className="text-center dropstart">
                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-xs"></i>
                </a>
                <ul className="dropdown-menu">
                    {Cookies.get('permissions').indexOf("form-read") !== -1 ? (
                        <li>
                            <NavLink to={'/forms/' + row.id} className="dropdown-item">
                                {t('View')}
                            </NavLink>
                        </li>
                    ) : <></>}
                    {Cookies.get('permissions').indexOf("form-update") !== -1 && row.id == JSON.parse(Cookies.get('user')).id ? (
                        <li>
                            <NavLink to={'/forms/' + row.id + '/edit'} className="dropdown-item">
                                {t('Edit')}
                            </NavLink>
                        </li>
                    ) : <></>}
                    <li>
                        <a href='#' onClick={() =>{ duplicate(row.id) }} className="dropdown-item">
                            {t('Copy')}
                        </a>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    {Cookies.get('permissions').indexOf("form-delete") !== -1 ? (
                        <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'forms', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                    ) : <></>}
                </ul>
            </div>
        }
    ];

    const handlePageChange = page => {
        setPageNumber(page);
    }

    function toPages(pages) {
        const results = [];

        for (let i = 1; i <= pages; i++) {
            results.push(i);
        }

        return results;
    }

    // RDT exposes the following internal pagination properties
    const BootyPagination = ({
        onChangePage,
        currentPage
    }) => {
        const handleBackButtonClick = () => {
            onChangePage(currentPage - 1);
        };

        const handleNextButtonClick = () => {
            onChangePage(currentPage + 1);
        };

        const handlePageNumber = (e) => {
            onChangePage(Number(e.target.value));
        };

        const pages = data.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === data.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {data.from} {t('to')} {data.to} {t('of')} {data.total} {t('entries')}</p>
                <nav className="float-md-end me-2">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleBackButtonClick}
                                disabled={previosDisabled}
                                aria-disabled={previosDisabled}
                                aria-label="previous page"
                            >
                                &#60;
                            </button>
                        </li>
                        {pageItems.map((page) => {
                            const className =
                                page === currentPage ? "page-item active" : "page-item";

                            return (
                                <li key={page} className={className}>
                                    <button
                                        className="page-link"
                                        onClick={handlePageNumber}
                                        value={page}
                                    >
                                        {page}
                                    </button>
                                </li>
                            );
                        })}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={handleNextButtonClick}
                                disabled={nextDisabled}
                                aria-disabled={nextDisabled}
                                aria-label="next page"
                            >
                                &#62;
                            </button>
                        </li>
                    </ul>
                </nav>
                <div className="clearfix"></div>
            </>
        );
    };

    return <DataTable
        columns={tableHeadings}
        data={data.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={data.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={
            <>
                <select className="f form-control w-15 mx-2" onChange={(e)=>setSearchCategory(e.target.value)} >
                    <option value="">--</option>
                    <option value="Maschinenbauwesen">{t('Maschinenbauwesen')}</option>
                    <option value="Brandschutzwesen">{t('Brandschutzwesen')}</option>
                    <option value="Eisenbahnwesen">{t('Eisenbahnwesen')}</option>
                    <option value="Seilbahnwesen">{t('Seilbahnwesen')}</option>
                </select>
                <input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />
            </>
        }
    />;
}

export default FormIndexTable;
