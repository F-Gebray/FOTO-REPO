import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 4) return [1, 2, 3, 4, 5, "...", totalPages];
    if (currentPage >= totalPages - 3)
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pageClass = (page: number | "...") => `
    w-9 h-9 flex items-center justify-center text-[10px] tracking-[1px] cursor-pointer
    border transition-all duration-300
    ${
      page === currentPage
        ? "border-[#c9a96e] text-[#c9a96e]"
        : page === "..."
        ? "border-transparent text-white/30 cursor-default"
        : "border-white/10 text-white/40 hover:border-white/30 hover:text-[#f0ede6]"
    }
  `;

  return (
    <div className="flex items-center justify-center gap-[2px] py-8">
      {/* Prev */}
      <button
        className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-white/30 hover:text-[#f0ede6] transition-all duration-300 cursor-pointer text-sm bg-transparent"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {getPages().map((page, i) => (
        <button
          key={i}
          className={`${pageClass(page)} bg-transparent font-montserrat`}
          onClick={() => typeof page === "number" && onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        className="w-9 h-9 flex items-center justify-center border border-white/10 text-white/40 hover:border-white/30 hover:text-[#f0ede6] transition-all duration-300 cursor-pointer text-sm bg-transparent"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
