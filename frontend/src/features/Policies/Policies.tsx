import { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import {
  PageInfo,
  PoliciesResponse,
  Policy,
  QueryParams,
} from './Policies.model';

import { Header } from 'components/Header';
import { Table } from 'components/Table';
import { TablePagination } from '../../components/TablePagination';
import { API_URL } from '../../constants';

export const Policies = () => {
  const location = useLocation();
  const history = useHistory();

  const [error, setError] = useState<string | undefined>();
  const [policies, setPolicies] = useState<Policy[] | undefined>();
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>();

  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') || 1;
  const limit = queryParams.get('limit') || 10;

  const fetchPolicies = useCallback(async () => {
    const response = await fetch(
      `${API_URL}/policies?page=${page}&limit=${limit}`
    );
    const { pageInfo, items }: PoliciesResponse = await response.json();
    setPolicies(items);
    setPageInfo(pageInfo);
    updateQueryParams({ page: pageInfo.page, limit: pageInfo.limit });
  }, [page, limit]);

  useEffect(() => {
    fetchPolicies().catch((e) => setError(e.message));

    // Component clean-up
    return () => {
      setPolicies([]);
      setError('');
    };
  }, [fetchPolicies]);

  const updateQueryParams = (newParams: QueryParams) => {
    const params = new URLSearchParams(location.search);
    Object.entries(newParams).forEach(([key, value]) => {
      params.set(key, String(value));
    });
    history.push(`${location.pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage, limit: pageInfo?.limit });
  };

  const handleLimitChange = (newLimit: number) => {
    updateQueryParams({ page: 1, limit: newLimit });
  };

  if (!error && !policies) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policies: {error}</p>;

  return (
    <div>
      <Header>Policies</Header>
      <Table policies={policies} />
      <TablePagination
        handlePageChange={handlePageChange}
        handleLimitChange={handleLimitChange}
        pageInfo={pageInfo}
      />
    </div>
  );
};
