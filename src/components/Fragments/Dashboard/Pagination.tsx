interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="py-[4px] px-2 bg-blue-400 rounded"
      >
        Prev
      </button>

      <div className="flex gap-2">
        {[...Array(totalPages)].map((_, index) => {
          let startPage = Math.max(1, currentPage - Math.floor(3 / 2));
          let endPage = Math.min(totalPages, startPage + 3 - 1);

          if (endPage - startPage + 1 < 3) {
            startPage = Math.max(1, endPage - 3 + 1);
          }
          if (index + 1 >= startPage && index + 1 <= endPage) {
            return (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`py-[4px] px-2 w-7 bg-blue-400 rounded ${
                  currentPage === index + 1 ? "bg-blue-600" : ""
                }`}
              >
                {index + 1}
              </button>
            );
          }
        })}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-[4px] px-2 bg-blue-400 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
