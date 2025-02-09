interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogsPagination({currentPage, totalPages, onPageChange}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <ul className="pagination">
      <li
        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={handlePrev}
      >
        <a className="page-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </a>
      </li>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${
              currentPage === pageNumber ? "active" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            <a className="page-link">{pageNumber}</a>
          </li>
        )
      )}

      <li
        className={`page-item ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={handleNext}
      >
        <a className="page-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" stroke-linecap="round" stroke-linejoin="round"> </path></svg>
        </a>
      </li>
    </ul>
  );
}