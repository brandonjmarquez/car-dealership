import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './pages/Inventory/Inventory';

test('renders learn react link', () => {
  const { getByText } = render(
    <App />
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
