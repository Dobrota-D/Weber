import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import App from './App';

import './styles/forms.css'
import './styles/reset.css'
import './styles/fonts.css'
import './styles/variables.css'
import './styles/index.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);