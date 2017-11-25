import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

xit('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
