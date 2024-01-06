// components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';


const Layout = ({ children }) => (
  <>

    <main>{children}</main>

  </>
);

export default Layout;
