import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import ImportModal from './ImportModal';

function ProductIndexTable() {
    const { t } = useTranslation();
    const [tabledata, setTableData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")

    var formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

    const tableHeadings = [
        {
            name: t('Label Stock Number'),
            selector: row => <NavLink to={'/product-management/products/' + row.id + '/edit'} className="">{row.identity_number}</NavLink>,
            sortable: true,
        },
        {
            name: t('Label Stock'),
            selector: row => row.label_stock,
            sortable: true,
            width:"20%"
        },
        {
            name: t('P/N'),
            selector: row => row.p_n,
            sortable: true,
            width:"120px",
        },
        {
            name: t('Description'),
            selector: row => row.description,
            sortable: true,
        },
        {
            name: t('MSI'),
            selector: row => row.msi,
            sortable: true,
            width:"120px",
        },
        {
            name: t('Width'),
            selector: row => row.width,
            sortable: true,
            width:"100px",
        },
        {
            name: t('Cost Per Leniea Inch'),
            selector: row => row.cost_per_leniea_inch,
        },
        {
            name: t('Aztec Label Webpage'),
            selector: row => row.aztec_label_webpage,
        },
        {
            name: t('Actions'),
            cell: row => (
                <>
                    {Cookies.get('permissions').indexOf("product-update") !== -1 ||
                        Cookies.get('permissions').indexOf("product-delete") !== -1 ? (
                        <div className="text-center dropstart">
                            <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa fa-ellipsis-v text-xs"></i>
                            </a>
                            <ul className="dropdown-menu">
                                {Cookies.get('permissions').indexOf("product-update") !== -1 ? (
                                    <>
                                        <li>
                                            <NavLink to={'/product-management/products/' + row.id + '/edit'} className="dropdown-item">
                                                {t('Edit')}
                                            </NavLink>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </>
                                ) : <></>}
                                {Cookies.get('permissions').indexOf("product-delete") !== -1 ? (
                                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'products', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                                ) : <></>}
                            </ul>
                        </div>
                    ) : <></>}
                </>
            )
        }
    ];

    useEffect(() => {
        callFetch("products?page=" + pageNumber, "GET", []).then((res) => {
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
            callFetch('product/serach/'+searchKey, "GET", []).then((res)=>{
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

    return <>
        <DataTable
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
        />
        <ImportModal refreshParent={() => setRefresh(refresh + 1)} />
    </>
}

export default ProductIndexTable;
