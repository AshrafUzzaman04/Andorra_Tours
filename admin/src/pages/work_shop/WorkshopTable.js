
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import Cookies from 'js-cookie';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import dateFormat from "dateformat";

const WorkshopTable = () => {
  const { t } = useTranslation();
  const [couse, setCourse] = useState([]);
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
          name: t('Workshop Nr.'),
          width: '130px',
          sortable: true,
          selector: row => <NavLink to={'/course-management/workshops/' + row.id + '/edit'} className="">{row.course_nr}</NavLink>
      },
      {
          name: t('Course Name'),
          width: '300px',
          sortable: true,
          selector: row => row.course_title
      },
      {
          name: t('Course Creator'),
          sortable: true,
          selector: row => row.course_creator_name
      },
      {
          name: t('Create Date'),
          sortable: true,
          selector:row => moment(row.created_at).format('DD.MM.YYYY')
      },
      {
          name: t('Actions'),
          cell: row => <div className="text-center dropstart">
              <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-ellipsis-v text-xs"></i>
              </a>
              <ul className="dropdown-menu">
                  {Cookies.get('permissions').indexOf("employee-update") !== -1 ? (
                      <li>
                          <NavLink to={'/course-management/workshops/' + row.id + '/edit'} className="dropdown-item">
                              {t('Edit')}
                          </NavLink>
                      </li>
                  ) : <></>}
                  <li><hr className="dropdown-divider" /></li>
                  {Cookies.get('permissions').indexOf("employee-delete") !== -1 ? (
                      <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'course', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                  ) : <></>}
              </ul>
          </div>,
          sortable: true,
      }
  ];

  useEffect(() => {
      callFetch("course?page=" + pageNumber, "GET", []).then((res) => {
        setCourse(res.data);
      });
  }, [pageNumber, refresh]);

  useEffect(()=>{
    if(searchKey.length > 0){
        callFetch('course/serach/'+searchKey, "GET", []).then((res)=>{
            setCourse(res.data)
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

      const pages = couse.last_page;
      const pageItems = toPages(pages);
      const nextDisabled = currentPage === couse.last_page;
      const previosDisabled = currentPage === 1;

return (
          <>
              <br />
              <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {couse.from} {t('to')} {couse.to} {t('of')} {couse.total} {t('entries')}</p>
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
      data={couse?.data}
      noDataComponent={t('There are no records to display')}
      pagination
      highlightOnHover
      paginationComponentOptions={{ noRowsPerPage: true }}
      paginationServer
      paginationTotalRows={couse?.total}
      onChangePage={handlePageChange}
      paginationComponent={BootyPagination}
      subHeader
      subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
  />;

}

export default WorkshopTable
