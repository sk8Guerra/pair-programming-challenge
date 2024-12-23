import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { PoliciesDetail } from './PoliciesDetail';
import { rest } from 'msw';
import { server } from '../../mocks/server';
import { policyDetailResponse } from '../Policies/Policies.mocks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
  useLocation: () => ({
    search: '',
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Features/PoliciesDetail', () => {
  test('Should render a message when price does not exist', async () => {
    renderWithRouter(<PoliciesDetail />);
    await waitFor(() =>
      screen.getByText(/It's not possible to see this policy/i)
    );
  });

  test('should render a full detail when price exists', async () => {
    server.use(
      rest.get('http://localhost:4000/policies/:id', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({ ...policyDetailResponse, price: 100 })
        );
      })
    );

    renderWithRouter(<PoliciesDetail />);
    await waitFor(() => screen.getByText(/Policy Detail/i));
  });
});
