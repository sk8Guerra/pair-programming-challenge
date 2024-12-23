type InsuranceType = 'HEALTH' | 'LIABILITY' | 'HOUSEHOLD';

export type PolicyStatus = 'ACTIVE' | 'PENDING' | 'CANCELLED' | 'DROPPED_OUT';

export type Provider = 'BARMER' | 'AOK' | 'DAK' | 'TK';

interface Customer {
  dateOfBirth: Date;
  firstName: string;
  id: string;
  lastName: string;
  email: string;
}

export interface Policy {
  customer: Customer;
  endDate: Date | null;
  id: string;
  insuranceType: InsuranceType;
  provider: Provider;
  startDate: Date;
  status: PolicyStatus;
  price: number | null;
}

export interface PageInfo {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export type QueryParams = Partial<Pick<PageInfo, 'page' | 'limit'>>;

export type PoliciesResponse = {
  items: Policy[];
  pageInfo: PageInfo;
};

export interface PolicyResponse extends Policy {}
