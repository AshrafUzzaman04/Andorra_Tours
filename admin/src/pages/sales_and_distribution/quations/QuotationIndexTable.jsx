import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../../helpers/deleteAlert";
import Cookies from 'js-cookie';
import dateFormat from "dateformat";

function QuotationIndexTable() {
    const { t } = useTranslation();
    const [tabledata, setTableData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    const tableHeadings = [
        {
            name: t('Quotation Number'),
            sortable: true,
            selector: row => <NavLink to={'/customer-management/quotations/' + row?.id + '/edit'}><u>{row?.identity_number}</u></NavLink>,
        },
        {
            name: t('Customer Name'),
            selector: row => row?.customer?.name,
            sortable: true,
            
        },
        {
            name: t('Creator'),
            selector: row => row?.user?.name,
            sortable: true,
        },
        {
            name: t('Date'),
            selector: row => dateFormat(row?.created_at, "dd.mm.yyyy"),
            sortable: true,
        },
        {
            name: t('Actions'),
            cell: row => (
                <>
                    {Cookies.get('permissions').indexOf("quotation-update") !== -1 ||
                        Cookies.get('permissions').indexOf("quotation-delete") !== -1 ? (
                        <div className="text-center dropstart">
                            <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v text-xs"></i>
                            </a>
                            <ul className="dropdown-menu">
                                {Cookies.get('permissions').indexOf("quotation-update") !== -1 ? (
                                    <>
                                        <li>
                                            <NavLink to={'/customer-management/orders/' + row.identity_number + '/create'} className="dropdown-item">
                                                {t('Create Order')}
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <NavLink to={'/customer-management/quotations/' + row.id + '/edit'} className="dropdown-item">
                                                {t('Edit')}
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </>
                                ) : <></>}
                                {Cookies.get('permissions').indexOf("quotation-delete") !== -1 ? (
                                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'quotations', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                                ) : <></>}
                            </ul>
                        </div>
                    ) : <></>}
                </>
                
            ),
            sortable: true,

        }
    ];

    useEffect(() => {
        callFetch("quotations?page=" + pageNumber, "GET", []).then((res) => {
            setTableData(res.data);
        });
    }, [pageNumber, refresh]);

useEffect(()=>{
    if(searchKey.length > 0){
        callFetch('quotation/serach/'+searchKey, "GET", []).then((res)=>{
            setTableData(res.data)
        })
        
    }else{
        setRefresh(refresh + 1)
    }
},[searchKey])

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

        const pages = tabledata?.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === tabledata?.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {tabledata?.from} {t('to')} {tabledata?.to} {t('of')} {tabledata?.total} {t('entries')}</p>
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
        paginationTotalRows={tabledata?.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
    />;
}

export default QuotationIndexTable;
