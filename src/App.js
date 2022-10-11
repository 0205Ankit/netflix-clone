import { Route, Routes,Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import Fallback from './pages/fallback';
import useLoggedInUser from './hooks/log-in-user';
import Profile from './pages/profile';
import { AnimatePresence } from 'framer-motion';


const HomePage = lazy(() => import('./pages/homepage'));
const Login = lazy(() => import('./pages/log-in'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Browse = lazy(() => import('./pages/browse'));
const ManageProfilePage = lazy(() => import('./pages/manage-profile'));
const ShowTrailer = lazy(() => import('./pages/showTrailer'));
const NotFound=lazy(()=>import('./pages/notFound'))
//ankit

function App() {

    const user=JSON.parse(localStorage.getItem('authUser'))

  useLoggedInUser();
  return (
    <>
    {<Suspense fallback={<Fallback />}>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={!user?<HomePage />:<Navigate replace to='/profile'/>} /> 
          <Route path="/profile" element={user?<Profile />:<Navigate replace to='/login'/>} />
          <Route path="/login" element={!user?<Login />:<Navigate replace to='/profile'/>} />
          <Route path="/sign-up" element={!user?<SignUp />:<Navigate replace to='/profile'/>} />
          <Route path="/browse/*" element={user?<Browse />:<Navigate replace to='/login'/>} />
     <Route path="/manage-profile" element={user?<ManageProfilePage />:<Navigate replace to='/login'/>} />
          <Route path="/watch" element={user?<ShowTrailer />:<Navigate replace to='/login'/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>}</>
  );
}

export default App;
