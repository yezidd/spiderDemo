import React from 'react'
import ReactDOM from 'react-dom'

import App from './App';

global.__DEV__ = true;

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);