import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import SoftBadgeDot from 'components/SoftBadgeDot';
import Cookies from 'js-cookie';

function BookingIndexTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [searchKey, setSearchKey] = useState("")

  const tableHeadings = [
    {
      name: t('Order ID'),
      width: "150px",
      sortable: true,
      reorder: true,
      selector: row => <NavLink to={`/booking-management/bookings/${row.id}/view`} >{row.order_id}</NavLink>
    },
    {
      name: t('Client'),
      sortable: true,
      reorder: true,
      selector: row => (row?.customer?.name + " " + row.customer?.last_name)
    },
    {
      name: t('More Photos'),
      sortable: true,
      reorder: true,
      selector: row => row?.customer?.email
    },

    {
      name: t('Country'),
      sortable: true,
      reorder: true,
      selector: row => row?.customer?.country
    },
    {
      name: t('Address'),
      sortable: true,
      reorder: true,
      selector: row => row?.customer?.address
    },

    {
      name: t('Price'),
      sortable: true,
      reorder: true,
      selector: row => row?.categorie?.title
    },

    {
      name: t('Status'),
      sortable: true,
      reorder: true,
      selector: row => <>
        <SoftBadgeDot
          color={
            row?.status === "Processing" ? "info"
              :
              row?.status === "Awaiting" ? "secondary"
                : row?.status === "Paid" ? "success"
                  : row?.status === "Cancelled" && "error"
          }
          badgeContent={row?.status}
        />
      </>
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
            <NavLink to={'/booking-management/bookings/' + row.id + '/view'} className="dropdown-item">
              {t('View')}
            </NavLink>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'bookings', row?.id, t).then(res => setRefresh(0))}>{t('Delete')}</a></li>
        </ul>
      </div>
    }
  ];

  useEffect(() => {
    if (refresh === 0) {
      callFetch("bookings?page=" + pageNumber, "GET", []).then((res) => {
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

  const handleExport = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}bookings/export`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel MIME type
          "Authorization": `Bearer ${Cookies.get("token")}`, // Add the Bearer token to the header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a downloadable link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "bookings_export.xlsx"; // Set file name
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };



  return (<div><button onClick={handleExport} className="btn btn-primary mb-3 mx-4">
    Export All Bookings
  </button>
    <DataTable
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
    />
  </div>);
}

export default BookingIndexTable