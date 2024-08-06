import React,{ useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import dateFormat from "dateformat";
import callFetch from 'helpers/callFetch';
import deleteAlert from 'helpers/deleteAlert';
import { NumericFormat } from 'react-number-format';
import { ArrowDropDown } from '@mui/icons-material';
const InvoiceIndexTable = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [invoices,setInvoices] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [refresh, setRefresh] = useState(0);
  
  const [filterOrders,setFilterOrders] = useState([])
  const [search,setSearch] = useState("")

  const tableHeadings = [
      {
          name: t('Invoice Nr.'),
          width: '160px',
          sortable: true,
          reorder: true,
          selector: row =><NavLink to={'/finance/invoice/' + row.id + '/edit'} className="">{row.invoice_nr}</NavLink>,
          
      },
      
      {
          name: t('Creator'),
          sortable: true,
          reorder: true,
          selector: row => row.user.name,
      },
      {
          name: t('Date'),
          sortable: true,
          reorder: true,
          selector: row => dateFormat(row.date, "dd.mm.yyyy"),
      },

      {
        name: t('Amount'),
        sortable: true,
        reorder: true,
        selector: row => <NumericFormat
                            value={row.total}
                            displayType="text"
                            thousandSeparator={"."}
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            suffix=' €'
                        />,
        sortable: true
      },
      
      {
          name: t('Actions'),
          reorder: true,
          cell: row => <div className="text-center dropstart">
              <a href="/" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa fa-ellipsis-v text-xs"></i>
              </a>
              <ul className="dropdown-menu">
                  {Cookies.get('permissions').indexOf("customer-update") !== -1 ? (
                      <li>
                          <NavLink to={'/finance/invoice/' + row.id + '/edit'} className="dropdown-item">
                              {t('Edit')}
                          </NavLink>
                      </li>
                  ) : <></>}
                  <li><hr className="dropdown-divider" /></li>
                  {Cookies.get('permissions').indexOf("customer-delete") !== -1 ? (
                      <li><a className="dropdown-item text-danger" href="#0" onClick={(e) => deleteAlert(e, 'invoice', row.id, t).then(res => setRefresh(refresh + 1))}>{t('Delete')}</a></li>
                  ) : <></>}
              </ul>
          </div>,
          sortable: true
      }
  ];


  useEffect(() => {
      callFetch("invoice?page=" + pageNumber, "GET", []).then((res) => {
          setInvoices(res.data)
      });
  
  }, [pageNumber, refresh]);


  useEffect(()=>{
    if(search.length > 0){
        callFetch('invoice/serach/'+search, "GET", []).then((res)=>{
            setInvoices(res.data)
        })
    }else{
        setRefresh(refresh + 1)
    }
},[search])

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

      const pages = invoices?.last_page;
      const pageItems = toPages(pages);
      const nextDisabled = currentPage === invoices?.last_page;
      const previosDisabled = currentPage === 1;

      return (
          <>
              <br />
              <p className="float-md-start pt-2 text-secondary text-xs font-weight-bolder ms-3">{t('Showing')} {invoices.from} {t('to')} {invoices.to} {t('of')} {invoices.total} {t('entries')}</p>
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
  data={invoices?.data}
  noDataComponent={t('There are no records to display')}
  pagination
  highlightOnHover
  paginationComponentOptions={{ noRowsPerPage: true }}
  paginationServer
  paginationTotalRows={invoices?.total}
  onChangePage={handlePageChange}
  paginationComponent={BootyPagination}
  subHeader
  subHeaderComponent={
    <input type="text" className='form-control w-15' 
    placeholder={t('Search...')} value={search} onChange={(e)=>setSearch(e.target.value)} />
}

/>;
}

export default InvoiceIndexTable