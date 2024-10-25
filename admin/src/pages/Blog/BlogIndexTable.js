import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';

function BlogIndexTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [searchKey, setSearchKey] = useState("")

  const tableHeadings = [
    {
      name: t('ID'),
      width: "150px",
      sortable: true,
      reorder: true,
      selector: row => <NavLink to={`/blogs/${row.id}/edit`} >{row.id}</NavLink>
    },
    {
        name: t('User Photo'),
        sortable: true,
        
        reorder: true,
        selector: row => <div className="mt-1 mb-1" >
          <img className="avatar avatar-md me-2" src={row?.user_photo ? process.env.REACT_APP_STORAGE_URL + row?.user_photo : '/assets/img/placeholder.png'} alt={row?.photo} />
          {row?.user_name}
        </div>
      },
    {
      name: t('Blog Photo'),
      sortable: true,
      width: "200px",
      reorder: true,
      selector: row => <div className="mt-1 mb-1" >
        <img className="avatar avatar-md w-100" src={row?.photo ? process.env.REACT_APP_STORAGE_URL + row?.photo : '/assets/img/placeholder.png'} alt={row?.photo} />
      </div>
    },
    {
      name: t('Images'),
      sortable: true,
      reorder: true,
      selector: row => <div className="row mt-1 mb-1 d-flex align-items-center" style={{ width: '500px' }}>
        <div className="col-6 pe-0 mb-1">
            {
                row?.images && JSON.parse(row?.images)?.map((item, index) => (
                    <img key={index} className="avatar avatar-sm me-1" src={item ? process.env.REACT_APP_STORAGE_URL + item : '/assets/img/placeholder.png'} alt={item} />
                ))
            }
        </div>
      </div>
    },

    {
        name: t('Title'),
        sortable: true,
        reorder: true,
        selector: row => row.title
    },
    
    {
      name: t('Status'),
      sortable: true,
      reorder: true,
      selector: row => row.status
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
            <NavLink to={'/blogs/' + row.id + '/edit'} className="dropdown-item">
              {t('Edit')}
            </NavLink>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'blogs', row?.id, t).then(res => setRefresh(0))}>{t('Delete')}</a></li>
        </ul>
      </div>
    }
  ];

  useEffect(() => {
    if(refresh === 0) {
      callFetch("blogs?page=" + pageNumber, "GET", []).then((res) => {
        setData(res.data);
        setRefresh(1)
      });
    }
  }, [pageNumber, refresh]);

  const handlePageChange = page => {
    setPageNumber(page);
    setRefresh(0)
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
        setData(res.data)
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
    data={data?.data}
    noDataComponent={t('There are no records to display')}
    pagination
    highlightOnHover
    paginationComponentOptions={{ noRowsPerPage: true }}
    paginationServer
    paginationTotalRows={data?.total}
    onChangePage={handlePageChange}
    paginationComponent={BootyPagination}
    subHeader
    subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} />}
  />;
}

export default BlogIndexTable