import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../../helpers/deleteAlert";
import Cookies from 'js-cookie';
import dateFormat from "dateformat";
import ImportModal from './ImportModal';

function SupplierIndexTable() {
    const { t } = useTranslation();
    const [suppliers, setSuppliers] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    const tableHeadings = [
        {
            name: t('Supplier Number'),
            width: '140px',
            sortable:true,
            selector: row => <NavLink to={'/product-management/suppliers/' + row.id + '/edit'} className="">{row.identity_number}</NavLink>,
        },
        {
            name: t('Name'),
            width: '300px',
            sortable:true,
            selector: row => <div className="row mt-1" style={{ width: '300px' }}>
                <div className="col-2 pe-0">
                    <img className="avatar avatar-sm" src={row.logo ? process.env.REACT_APP_STORAGE_URL + row.logo : '/assets/img/placeholder.png'} alt="" />
                </div>
                <div className="col-10 ps-0">
                    <p className="mb-0 text-xxs text-wrap">{row.name}</p>
                </div>
            </div>
        },
        {
            name: t('Category'),
            sortable:true,
            selector: row => row.customer_category.name
        },
        {
            name: t('Supplier Since'),
            sortable:true,
            selector: row => dateFormat(row.created_at, "dd.mm.yyyy"),
        },
        {
            name: t('Status'),
            sortable:true,
            selector: row => <span className="badge badge-dot me-4">
                {row.status === 'Active' ? <i className="bg-success"></i> : <i className="bg-danger"></i>}
                <span className="text-dark text-xs">{t(row.status)}</span>
            </span>
        },
        {
            name: t('Actions'),
            sortable:true,
            cell: row => <div className="text-center dropstart">
                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-xs"></i>
                </a>
                <ul className="dropdown-menu">
                    {Cookies.get('permissions').indexOf("supplier-update") !== -1 ? (
                        <li>
                            <NavLink to={'/product-management/suppliers/' + row.id + '/edit'} className="dropdown-item">
                                {t('Edit')}
                            </NavLink>
                        </li>
                    ) : <></>}
                    <li><hr className="dropdown-divider" /></li>
                    {Cookies.get('permissions').indexOf("supplier-delete") !== -1 ? (
                        <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'suppliers', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                    ) : <></>}
                </ul>
            </div>
        }
    ];

    useEffect(() => {
        callFetch("suppliers?page=" + pageNumber, "GET", []).then((res) => {
            setSuppliers(res.data);
        });
    }, [pageNumber, refresh]);

    const handlePageChange = page => {
        setPageNumber(page);
    }

    useEffect(()=>{
        if(searchKey.length > 0){
            callFetch('suplier/serach/'+searchKey, "GET", []).then((res)=>{
                setSuppliers(res.data)
            })
            
        }else{
            setRefresh(refresh + 1)
        }
    },[searchKey])

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

        const pages = suppliers.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === suppliers.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {suppliers.from} {t('to')} {suppliers.to} {t('of')} {suppliers.total} {t('entries')}</p>
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

    return <>
        <DataTable
            columns={tableHeadings}
            data={suppliers?.data}
            noDataComponent={t('There are no records to display')}
            pagination
            highlightOnHover
            paginationComponentOptions={{ noRowsPerPage: true }}
            paginationServer
            paginationTotalRows={suppliers?.total}
            onChangePage={handlePageChange}
            paginationComponent={BootyPagination}
            subHeader
            subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
        />
        <ImportModal refreshParent={() => setRefresh(refresh + 1)} />
    </>
}

export default SupplierIndexTable;
