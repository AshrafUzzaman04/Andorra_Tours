
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import Cookies from 'js-cookie';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import dateFormat from "dateformat";

const StudentListTable = () => {
  const { t } = useTranslation();
  const [student, setStudent] = useState([]);
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
          name: t('Student NR'),
          width: '110px',
          sortable:true,
          selector: row => <NavLink to={'/course-management/students/' + row.id + '/edit'} className="">{row.student_nr}</NavLink>,
      },
      {
          name: t('Name'),
          width: '300px',
          sortable:true,
          selector: row => <div className="row mt-1" style={{ width: '300px' }}>
              <div className="col-2 pe-0">
                  <img className="avatar avatar-sm" src={row.photo ? process.env.REACT_APP_STORAGE_URL + row.photo : '/assets/img/placeholder.png'} alt="" />
              </div>
              <div className="col-10 ps-0">
                  <p className="mb-0 text-xxs text-wrap mt-2 m-lg-2">{row.student_name}</p>
              </div>
          </div>
      },
      {
          name: t('Email'),
          sortable:true,
          selector: row => row.student_email
      },
      {
          name: t('Create Date'),
          sortable:true,
          selector:row => moment(row.created_at).format('DD.MM.YYYY')
      },
      {
          name: t('Actions'),
          sortable:true,
          cell: row => <div className="text-center dropstart">
              <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-ellipsis-v text-xs"></i>
              </a>
              <ul className="dropdown-menu">
                  {Cookies.get('permissions').indexOf("employee-update") !== -1 ? (
                      <li>
                          <NavLink to={'/course-management/students/' + row.id + '/edit'} className="dropdown-item">
                              {t('Edit')}
                          </NavLink>
                      </li>
                  ) : <></>}
                  <li><hr className="dropdown-divider" /></li>
                  {Cookies.get('permissions').indexOf("employee-delete") !== -1 ? (
                      <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'student', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                  ) : <></>}
              </ul>
          </div>
      }
  ];

  useEffect(() => {
      callFetch("student?page=" + pageNumber, "GET", []).then((res) => {
          setRoles(res.roles);
          setStudent(res.data);
      });
  }, [pageNumber, refresh]);

  const handlePageChange = page => {
      setPageNumber(page);
  }

  useEffect(()=>{
    if(searchKey.length > 0){
        callFetch('student/serach/'+searchKey, "GET", []).then((res)=>{
            setStudent(res.data)
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

      const pages = student.last_page;
      const pageItems = toPages(pages);
      const nextDisabled = currentPage === student.last_page;
      const previosDisabled = currentPage === 1;

      return (
          <>
              <br />
              <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {student.from} {t('to')} {student.to} {t('of')} {student.total} {t('entries')}</p>
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
      data={student?.data}
      noDataComponent={t('There are no records to display')}
      pagination
      highlightOnHover
      paginationComponentOptions={{ noRowsPerPage: true }}
      paginationServer
      paginationTotalRows={student?.total}
      onChangePage={handlePageChange}
      paginationComponent={BootyPagination}
      subHeader
    subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
  />;

}

export default StudentListTable
