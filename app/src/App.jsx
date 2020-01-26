import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { Fragment } from 'react';
import './App.scss';

import AppHeader from './components/Header/Header.jsx';
import AppContent from './components/Content/Content.jsx';


function App() {
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
      <AppContent />
    </Fragment>
  );
}

export default App;
