import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';

function SeoSettingsIndexTable() {
    const { t } = useTranslation();
    const [coupons, setSeoSettings] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [searchKey, setSearchKey] = useState("")

    const tableHeadings = [
        {
            name: t('ID'),
            sortable: true,
            reorder: true,
            selector: row => <NavLink to={`/seo-settings/${row.id}/edit`} >{row.id}</NavLink>
        },
        {
            name: t('Page Name'),
            sortable: true,
            reorder: true,
            selector: row => row.page_name
        },
        {
            name: t('Seo title'),
            sortable: true,
            reorder: true,
            selector: row => row.seo_title
        },
        {
            name: t('Meta Description'),
            sortable: true,
            reorder: true,
            selector: row => row.meta_description
        },
        {
            name: t('Meta Tags'),
            sortable: true,
            reorder: true,
            selector: row => row.meta_tags
        },
        {
            name: t('Actions'),
            sortable: true,
            reorder: true,
            cell: row => <div className="text-center dropstart">
                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-xs"></i>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <NavLink to={'/seo-settings/' + row.id + '/edit'} className="dropdown-item">
                            {t('Edit')}
                        </NavLink>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'seo-settings', row?.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                </ul>
            </div>
        }
    ];

    useEffect(() => {
        callFetch("seo-settings?page=" + pageNumber, "GET", []).then((res) => {
            setSeoSettings(res.data)
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


    useEffect(() => {
        if (searchKey.length > 0) {
            callFetch('employee/serach/' + searchKey, "GET", []).then((res) => {
                setSeoSettings(res.data)
            })

        } else {
            setRefresh(refresh + 1)
        }
    }, [searchKey])

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

        const pages = coupons.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === coupons.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {coupons.from} {t('to')} {coupons.to} {t('of')} {coupons.total} {t('entries')}</p>
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
        data={coupons?.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={coupons?.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />}
    />;
}

export default SeoSettingsIndexTable