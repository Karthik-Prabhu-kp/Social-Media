import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useData } from '../../context/DataContext';

function PrivateRoute({children}) {
  let location = useLocation();
  const {dataDispatch,token} = useData();
  return token ? (children) : (<Navigate to="/login" state={{ from: location}}/>)
}

export default PrivateRoute