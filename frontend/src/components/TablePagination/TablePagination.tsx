import React from 'react';
import ArrowLeft from '../Icon/ArrowLeft';
import ArrowRight from '../Icon/ArrowRight';
import { PageInfo } from '../../features/Policies/Policies.model';

interface TablePaginationProps {
  pageInfo?: PageInfo;
  handlePageChange: (newPage: number) => void;
  handleLimitChange: (newLimit: number) => void;
}

export const TablePagination = ({
  pageInfo,
  handlePageChange,
  handleLimitChange,
}: TablePaginationProps) => {
  if (!pageInfo) return null;

  const { page, hasNextPage, hasPrevPage, totalPages } = pageInfo;

  return (
    <div className="flex justify-end items-center mt-2">
      <select
        onChange={({ target }) => handleLimitChange(Number(target.value))}
        className="border border-gray-200 mx-1 my-1 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
        value={pageInfo.limit}
      >
        <option value={5}>5 / page</option>
        <option value={10}>10 / page</option>
        <option value={15}>15 / page</option>
      </select>
      <button
        data-testid="prev-page-pagination-button"
        disabled={!hasPrevPage}
        onClick={() => handlePageChange(page - 1)}
        className="border border-gray-200 hover:border-b hover:bg-gray-100 mx-1 my-1 px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
      >
        <ArrowLeft />
      </button>
      <p className="mx-2">
        {page} / {totalPages}
      </p>
      <button
        disabled={!hasNextPage}
        onClick={() => handlePageChange(page + 1)}
        className="border border-gray-200 hover:border-b hover:bg-gray-100 mx-1 my-1 px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:bg-gray-300"
      >
        <ArrowRight />
      </button>
    </div>
  );
};
