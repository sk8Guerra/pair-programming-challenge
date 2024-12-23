import React, { useCallback, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { useParams } from 'react-router-dom';
import { Policy } from '../Policies';
import { Badge } from '../../components/Badge';
import { Edit, Save } from 'lucide-react';
import Button from '../../components/Button/Button';
import { API_URL } from '../../constants';
import { PolicyResponse } from '../Policies/Policies.model';

export const PoliciesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [policy, setPolicy] = useState<Policy | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const fetchPolicy = useCallback(async () => {
    const response = await fetch(`${API_URL}/policies/${id}`);
    const data: PolicyResponse = await response.json();
    setPolicy(data);
  }, [id]);

  useEffect(() => {
    fetchPolicy().catch((e) => setError(e.message));

    return () => {
      setPolicy(undefined);
      setError('');
    };
  }, [fetchPolicy]);

  if (!error && !policy) return <p>Loading...</p>;

  if (error)
    return <p className="text-red-500">Error loading policy: {error}</p>;

  if (!policy?.price) return <p>It's not possible to see this policy</p>;

  const onUpdatePrice = (newPrice: number) => {
    setPolicy((prevState) => {
      if (!prevState) return prevState;
      return { ...prevState, price: newPrice };
    });
  };

  const onUpdatePolicyPrice = () => {
    fetch(`${API_URL}/policies/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ price: policy?.price }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => setIsUpdateMode(false));
  };

  const onCancelUpdatePolicyPrice = () => {
    setIsUpdateMode(false);
  };

  return (
    <div>
      <Header>Policy Detail</Header>
      <div className="border border-gray-200 rounded-lg mb-2">
        <div className="p-8">
          <div className="flex justify-between items-center border-b pb-1">
            <h2 className="text-lg font-semibold text-gray-900">
              <div className="flex gap-1">
                Policy
                <span>{policy && <Badge status={policy.status} />}</span>
              </div>
            </h2>
            {isUpdateMode ? (
              <Button
                onClick={onUpdatePolicyPrice}
                icon={Save}
                variant={'secondary'}
                size={'sm'}
                iconPosition={'right'}
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setIsUpdateMode(true)}
                icon={Edit}
                variant={'secondary'}
                size={'sm'}
                iconPosition={'right'}
              >
                Edit
              </Button>
            )}
            {isUpdateMode && (
              <Button
                onClick={onCancelUpdatePolicyPrice}
                icon={Edit}
                variant={'secondary'}
                size={'sm'}
                iconPosition={'right'}
              >
                Cancel
              </Button>
            )}
          </div>

          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-900">
              <b>Provider: </b> {policy?.provider}
            </p>
            <p className="text-sm text-gray-900">
              <b>Price: </b>{' '}
              {isUpdateMode ? (
                <input
                  className="border border-gray-300 rounded-md p-1"
                  type="number"
                  value={policy?.price}
                  onChange={({ target }) => onUpdatePrice(Number(target.value))}
                ></input>
              ) : (
                policy?.price
              )}
            </p>
            <p className="text-sm text-gray-900">
              <b>Type: </b> {policy?.insuranceType}
            </p>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-900">
              <b>Start Date: </b>{' '}
              {policy ? new Date(policy?.startDate).toLocaleDateString() : '--'}
            </p>
            <p className="text-sm text-gray-900">
              <b>End Date: </b>{' '}
              {policy && policy.endDate
                ? new Date(policy?.endDate).toLocaleDateString()
                : '--'}
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg">
        <div className="p-8">
          <div className="flex justify-between items-center border-b pb-1">
            <h2 className="text-lg font-semibold text-gray-900">Customer</h2>
            <Button
              icon={Edit}
              variant={'secondary'}
              size={'sm'}
              iconPosition={'right'}
            >
              Edit
            </Button>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-900">
              {policy?.customer.firstName} {policy?.customer.lastName}
            </p>
            <p className="flex items-center text-sm text-gray-900">
              <b>Email: </b>{' '}
              {policy && policy.customer.email ? policy.customer.email : '--'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
