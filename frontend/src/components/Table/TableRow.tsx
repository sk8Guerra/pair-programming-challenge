import { Policy } from 'features/Policies';

import { Badge } from '../Badge';
import { useHistory } from 'react-router-dom';

interface TableRowProps {
  row: Policy;
}

export const TableRow = ({ row }: TableRowProps) => {
  const { push } = useHistory();

  const priceExist = row.price !== null;

  return (
    <tr
      className={`border-b ${
        priceExist ? ' hover:bg-gray-50 cursor-pointer' : ''
      }`}
      onClick={priceExist ? () => push(`/detail/${row.id}`) : undefined}
    >
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {row.customer.firstName} {row.customer.lastName}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {row.provider}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {row.insuranceType}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <Badge status={row.status} />
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {row.price ? `${row.price} €` : '-'}
      </td>
    </tr>
  );
};
