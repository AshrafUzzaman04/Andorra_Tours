import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../../helpers/deleteAlert";
import Cookies from 'js-cookie';
import dateFormat from "dateformat";
import SoftTypography from "components/SoftTypography";

function ProjectIndexTable(props) {
    const { t } = useTranslation();
    const [tabledata, setTableData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    const tableHeadings = [
        {
            name: t('Project Number'),
            selector: row => <NavLink to={'/project-management/projects/' + row.id}><u>{row.identity_number}</u></NavLink>,
            sortable: true,
        },
        {
            name: t('Project Name'),
            selector: row => <NavLink to={'/project-management/projects/' + row.id}><u>{row.name}</u></NavLink>,
        },
        {
            name: t('Creator'),
            selector: row => (row.creator ? row.creator.name : ''),
        },
        {
            name: t('Date'),
            selector: row => dateFormat(row.created_at, "dd.mm.yyyy"),
        },
        {
            name: t('Status'),
            width: '250px',
            cell: row => (
                <>
                    <span style={{height: '0.375rem', width: '0.375rem', backgroundColor: row.status == 'In Progress' ? '#9320bb' : 'green', borderRadius: '50%', display: 'inline-block'}}></span>
                    <SoftTypography style={{position: 'relative', top: '1px', left: '3px', fontSize: '0.75rem', display: 'inline'}}>{t(row.status)}</SoftTypography>
                </>
            ),
        },
        {
            name: t('Actions'),
            cell: row => (
                <>
                    {Cookies.get('permissions').indexOf("project-update") !== -1 ||
                        Cookies.get('permissions').indexOf("project-delete") !== -1 ? (
                        <div className="text-center dropstart">
                            <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v text-xs"></i>
                            </a>
                            <ul className="dropdown-menu">
                                {Cookies.get('permissions').indexOf("project-update") !== -1 ? (
                                    <>
                                        <li>
                                            <NavLink to={'/project-management/projects/' + row.id + '/edit'} className="dropdown-item">
                                                {t('Edit')}
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </>
                                ) : <></>}
                                {Cookies.get('permissions').indexOf("project-delete") !== -1 ? (
                                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'projects', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                                ) : <></>}
                            </ul>
                        </div>
                    ) : <></>}
                </>
            )
        }
    ];

    useEffect(() => {
        callFetch("projects/member/"+props.id+"?page=" + pageNumber, "GET", []).then((res) => {
            setTableData(res.data);
        });
    }, [pageNumber, refresh]);

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

    useEffect(()=>{
        if(searchKey.length > 0){
            callFetch('project/serach/'+searchKey, "GET", []).then((res)=>{
                setTableData(res.data)
            })
            
        }else{
            setRefresh(refresh + 1)
        }
    },[searchKey])

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

        const pages = tabledata.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === tabledata.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {tabledata.from} {t('to')} {tabledata.to} {t('of')} {tabledata.total} {t('entries')}</p>
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
        data={tabledata.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={tabledata.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
    />;
}

export default ProjectIndexTable;
