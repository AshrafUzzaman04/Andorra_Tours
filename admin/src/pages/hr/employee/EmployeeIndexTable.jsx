import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import callFetch from "../../../helpers/callFetch";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import deleteAlert from "../../../helpers/deleteAlert";
import Cookies from 'js-cookie';

function EmployeeIndexTable() {
    const { t } = useTranslation();
    const [employees, setEmployees] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    function changeUserRole(e, row) {
        callFetch("employees/change-role/" + row.user.id, "POST", { 'roleId': e.target.value }).then((res) => {
            if (!res.ok) return;
        });
    }

    const tableHeadings = [
        {
            name: t('Employee ID'),
            width: '130px',
            sortable:true,
            reorder: true,
            selector: row => <NavLink to={`/human-resources/employees/${row.id}/profile`} >{row.employee_identity_number}</NavLink>
        },
        {
            name: t('Name'),
            width: '300px',
            sortable:true,
            reorder: true,
            selector: row => <NavLink to={`/human-resources/employees/${row.id}/profile`} ><div className="row mt-1" style={{ width: '300px' }}>
                <div className="col-2 pe-0">
                    <img className="avatar avatar-sm" src={row?.user?.photo ? process.env.REACT_APP_STORAGE_URL + row?.user?.photo : '/assets/img/placeholder.png'} alt="" />
                </div>
                <div className="col-10 ps-0">
                    <p className="mb-0 text-xxs text-wrap">{row?.user?.name}</p>
                    <p className="text-xs text-secondary mb-0">{row?.designation && row?.designation?.name}</p>
                </div>
            </div>
            </NavLink>
        },
        {
            name: t('Email'),
            sortable:true,
            reorder: true,
            selector: row => row?.user?.email
        },
        {
            name: t('User Role'),
            sortable:true,
            reorder: true,
            cell: row => <select className="form-control" defaultValue={row?.user?.roles[0].id} onChange={(e) => changeUserRole(e, row)}>
                {roles && roles.map((role) => (
                    <option key={role?.id} value={role?.id}>{t(role?.name)}</option>
                ))}
            </select>
        },
        {
            name: t('Actions'),
            sortable:true,
            reorder: true,
            cell: row => <div className="text-center dropstart">
                <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-xs"></i>
                </a>
                <ul className="dropdown-menu">
                    {Cookies.get('permissions').indexOf("employee-update") !== -1 ? (
                        <li>
                            <NavLink to={'/human-resources/employees/' + row.id + '/edit'} className="dropdown-item">
                                {t('Edit')}
                            </NavLink>
                        </li>
                    ) : <></>}
                    <li><hr className="dropdown-divider" /></li>
                    {Cookies.get('permissions').indexOf("employee-delete") !== -1 ? (
                        <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'employees', row?.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                    ) : <></>}
                </ul>
            </div>
        }
    ];

    useEffect(() => {
        callFetch("employees?page=" + pageNumber, "GET", []).then((res) => {
            setRoles(res.roles);
            setEmployees(res.data)
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
            callFetch('employee/serach/'+searchKey, "GET", []).then((res)=>{
                setEmployees(res.data)
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

        const pages = employees.last_page;
        const pageItems = toPages(pages);
        const nextDisabled = currentPage === employees.last_page;
        const previosDisabled = currentPage === 1;

        return (
            <>
                <br />
                <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {employees.from} {t('to')} {employees.to} {t('of')} {employees.total} {t('entries')}</p>
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
        data={employees?.data}
        noDataComponent={t('There are no records to display')}
        pagination
        highlightOnHover
        paginationComponentOptions={{ noRowsPerPage: true }}
        paginationServer
        paginationTotalRows={employees?.total}
        onChangePage={handlePageChange}
        paginationComponent={BootyPagination}
        subHeader
        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
    />;
}

export default EmployeeIndexTable;
