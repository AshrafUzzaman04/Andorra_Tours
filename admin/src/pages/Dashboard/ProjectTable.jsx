import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../helpers/deleteAlert";
import Cookies from 'js-cookie';
import dateFormat from "dateformat";

function ProjectTable() {
    const { t } = useTranslation();
    const [tabledata, setTableData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [refresh, setRefresh] = useState(0);

    const tableHeadings = [
        {
            name: t('Project'),
            selector: row => <NavLink to={'/project-management/projects/' + row.id}><u>{row.identity_number}</u></NavLink>,
            sortable: true,
        },
        {
            name: t('Employee'),
            selector: row => row.creator.name,
        },
        {
            name: t('Start'),
            selector: row => dateFormat(row.start_date, "dd.mm.yyyy"),
        },
        {
            name: t('End'),
            selector: row => dateFormat(row.end_date, "dd.mm.yyyy"),
        }
    ];

    useEffect(() => {
        callFetch("dashboard-projects?page=" + pageNumber, "GET", []).then((res) => {
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
    />;
}

export default ProjectTable;
