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
import CommentList from './components/Comments/Comments';
import { useAppContext } from './AppContext';
import { initialiazeConfig } from './config/ConfigStore';
import IConfigModel from './config/IConfigModel';



const App = () => {
  const { setConfig } = useAppContext();
  const [intializing, setInitializing] = useState(true);


  //TODO: Need to check why it is firing twice;
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      initialiazeConfig().then((res) => {
        setConfig(res as IConfigModel);
        configureAxios(LabServicesApi, res.backendUrl);
        setInitializing(false);
      });
    }
    return () => { ignore = true }
  }, []);

  return (
    <div>
      <Loader isLoading={intializing}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/comments' element={<CommentList />} />
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
