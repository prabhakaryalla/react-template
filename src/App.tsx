import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Dashboard from './components/Dashboard';
import Orders from './components/Orders';
import Home from './components/Home';
import { ConfigContext, ConfigProvider } from './config/ConfigContext';
import Users from './components/Users/Users';
import Loader from './core/Loader';
import { configureAxios } from './auth/AxiosBuilder';
import { LabServicesApi } from './core/LabApi';
import Notifications from './layout/Notification';
import UserForm from './components/Users/UserForm';
import { UserContextProvider } from './components/Users/UserContext';
import EditUser from './components/Users/EditUser';


export function App() {

  const { isLoading, config } = useContext(ConfigContext);
  const [ isAppInitializing, setIsAppInitiazing ] = useState(true);

  useEffect(() =>  {
    
    setIsAppInitiazing(true);
    if(!isLoading)
    {
      configureAxios(LabServicesApi, config.backendUrl);
      setIsAppInitiazing(false);
    } 
  }, [isLoading])
  
  return (
    <div>
      <Loader isLoading={isLoading || isAppInitializing}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/users' element={<UserContextProvider><Users /></UserContextProvider>} />
              <Route path='/users/edit/:id' element={<UserContextProvider><EditUser /></UserContextProvider>} />
              <Route path='/users/create' element={<UserForm />} />
            </Routes>
            <Notifications />
          </Layout>
          
        </BrowserRouter>
      </Loader>


   </div>
  );
}

export default App;
