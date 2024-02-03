import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Home from './components/Home';
import { ConfigContext, ConfigProvider } from './config/ConfigContext';
import Users from './components/Users';
import Loader from './core/Loader';


export function App() {

  const { isLoading } = useContext(ConfigContext);

  
  return (
    <div>
      <Loader isLoading={isLoading}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/users' element={<Users />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Loader>


   </div>
  );
}

export default App;
