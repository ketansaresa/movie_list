export const Pagination = ({ moviesPerPage, totalMovies, paginate, currentPage }:any) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="relative z-50">
      <ul className="pagination">
        <li>
          <button
            className="text-sm font-bold"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              className={`bg-[#2BD17E] ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="text-sm font-bold"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
