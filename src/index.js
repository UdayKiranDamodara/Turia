import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import PositionContextProvider from './contexts/Position'

ReactDOM.render(
    <PositionContextProvider>
      <App />
    </PositionContextProvider>,
  document.getElementById('root')
);

