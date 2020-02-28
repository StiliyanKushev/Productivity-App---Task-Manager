import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { Fragment } from 'react';
import './App.scss';

import AppHeader from './components/Header/Header.jsx';
import AppContent from './components/Content/Content.jsx';
import { withCookies } from 'react-cookie';

const App = props => {
    return (
      <Fragment>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <AppHeader />
        <AppContent cookies={props.cookies} />
      </Fragment>
    );
}

export default withCookies(App);
