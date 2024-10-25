export default function BlogsPagination({
    prev,
    currentPage,
    getPaginationGroup,
    next,
    pages,
    handleActive,
}: any) {
    return (
        <>
            <ul className="pagination ">
                {getPaginationGroup <= 0 ? null : (
                    <li onClick={prev} className="next_link page-item">
                        {currentPage === 1 ? null : (
                            <a>
                                <i className="fa fa-arrow-left" />
                            </a>
                        )}
                    </li>
                )}

                {/* Generate pagination buttons based on the total pages */}
                {Array.from({ length: pages }, (_, index) => index + 1).map((pageNumber) => (
                    <li
                        onClick={() => handleActive(pageNumber)}
                        key={pageNumber}
                        className={currentPage === pageNumber ? "page-item active" : "page-item"}
                    >
                        <a className="page-link">{pageNumber}</a>
                    </li>
                ))}

                {getPaginationGroup <= 0 ? null : (
                    <li onClick={next} className="next_link page-item">
                        {currentPage >= pages ? null : (
                            <a>
                                <i className="fa fa-arrow-right" />
                            </a>
                        )}
                    </li>
                )}
            </ul>
        </>
    );
}
