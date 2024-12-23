import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Policies } from './Policies';
import { server } from 'mocks/server';
import { rest } from 'msw';
import {
  pageInfoMockResponse,
  policyMockResponse,
  validCustomer,
} from './Policies.mocks';
import { BrowserRouter } from 'react-router-dom';

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

describe('Features/Policies', () => {
  test('shows a loading state', () => {
    render(<Policies />);
    screen.getByText(/loading/i);
  });

  test('should correctly display a list of policies', async () => {
    renderWithRouter(<Policies />);

    await waitFor(() =>
      screen.getByText(`${validCustomer.firstName}`, { exact: false })
    );
  });

  test('should correctly display number of pages select', async () => {
    renderWithRouter(<Policies />);

    await waitFor(() => {
      return screen.getByText(`${pageInfoMockResponse.limit} / page`, {
        exact: false,
      });
    });
  });

  test('should disable prev button if it is in the first page', async () => {
    renderWithRouter(<Policies />);

    await waitFor(() => {
      const prevButton = screen.getByTestId('prev-page-pagination-button');
      expect(prevButton).toBeDisabled();
    });
  });

  test('should enabled prev button if it is not the first page', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            items: policyMockResponse,
            pageInfo: {
              ...pageInfoMockResponse,
              hasNextPage: true,
              hasPrevPage: true,
            },
          })
        );
      })
    );

    renderWithRouter(<Policies />);

    await waitFor(() => {
      const prevButton = screen.getByTestId('prev-page-pagination-button');
      expect(prevButton).toBeEnabled();
    });
  });

  test('should correctly handle errors', async () => {
    server.use(
      rest.get('http://localhost:4000/policies', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Policies />);
    await waitFor(() => screen.getByText(/error/i));
  });
});
