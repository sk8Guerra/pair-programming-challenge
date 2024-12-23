import React, { ReactElement, ReactPortal } from 'react';

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

interface ReactNodeArray extends Array<ReactNode> {}
type ReactFragment = {} | ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

type DrawerProps = {
  children: ReactNode;
};

export const Drawer = ({ children }: DrawerProps) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-50 h-full">
      <div
        className={`fixed bottom-0 left-0 w-full h-4/6 bg-white shadow-lg animate-fade-up animate-duration-700 animate-ease-in-out animate-alternate animate-fill-forwards`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Detail</h2>
          <button onClick={() => {}}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
