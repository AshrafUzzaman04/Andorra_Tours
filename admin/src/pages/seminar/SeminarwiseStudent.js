import callFetch from 'helpers/callFetch';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import SoftTypography from "components/SoftTypography";
import PDF from '../../assets/images/icons/flags/pdf.png'
import dateFormat from "dateformat";

const SeminarwiseStudent = () => {
    const { t } = useTranslation();
    const params = useParams()
    const [student, setStudent] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [roles, setRoles] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [searchKey,setSearchKey] = useState("")
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm();
    const tableHeadings = [
      {
          name: t('Student Nr'),
          width: '110px',
          sortable:true,
          selector: row => row.student_nr
      },
      {
          name: t('Student'),
          width: '300px',
          sortable:true,
          selector: row => row.student_name
      },
      {
          name: t('Workshop Name'),
          sortable:true,
          selector: row => row.course_title
      },
      {
          name: t('Workshop Date'),
          sortable:true,
          selector:row => moment(row.workshop_date).format('DD.MM.Y')
      },
      {
          name: t('Dokumentart'),
          sortable:true,
          cell: row => <>
                        <a target={'_blank'} href={process.env.REACT_APP_STORAGE_URL+'api/v1/seminars/'+params.id+'/'+row.student_id} >
                            <img className='w-6 cursor-pointer' src={PDF} />
                            <SoftTypography className="cursor-pointer" variant="button" fontWeight="bold">&nbsp;{row.dokumentart}</SoftTypography>
                        </a>
                        </>
      }
  ];

  useEffect(() => {
    //   callFetch("student?page=" + pageNumber, "GET", []).then((res) => {
    //       setRoles(res.roles);
    //       setStudent(res.data);
    //       console.log(res.data);
    //   });
    callFetch(`seminar/${params.id}`, "GET",[]).then((res)=>{
        const StudentsData = []
        for(let i=0; i < res.data.length; i++){
            if(res.data[i] !== null){
                StudentsData.push(res.data[i])
            }
        }
        setStudent(res.data);
       
    })
    
  }, [pageNumber, refresh]);

useEffect(()=>{
    if(searchKey.length > 0){
        callFetch('seminarwise/serach/'+searchKey+"/"+params.id, "GET", []).then((res)=>{
            setStudent(res.data)
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
  
  return  <>
                <div className="row">
            <div className="col-12">
                <div className="card mb-4">
                    <div className="card-header pb-0">
                        <h6>{t(`${"Students"}`)}</h6>
                    </div>
                    <div className="card-body px-0 pt-0 pb-2">
                    <DataTable
                        columns={tableHeadings}
                        data={student.data}
                        noDataComponent={t('There are no records to display')}
                        pagination
                        highlightOnHover
                        paginationComponentOptions={{ noRowsPerPage: true }}
                        paginationServer
                        paginationTotalRows={student.total}
                        onChangePage={handlePageChange}
                        paginationComponent={BootyPagination}
                        subHeader
                        subHeaderComponent={<input type="text" placeholder='Search...' className=' form-control w-15' value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} />}
                    />
                    </div>
                </div>
                </div>
            </div>
            </>
  
}

export default SeminarwiseStudent
