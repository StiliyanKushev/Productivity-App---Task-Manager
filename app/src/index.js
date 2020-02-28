import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from './App.jsx';
import './scss/styles.scss';

import store from './store.js';

ReactDOM.render(
<CookiesProvider>
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
</CookiesProvider>, document.getElementById('root'));