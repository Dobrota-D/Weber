import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";

import '../../styles/admin.css'

import AdminPanel from '../admin/AdminPanel';

export default function Admin(props) {
  
  return <div className='main-component admin'>
    { props.isAdmin ? <AdminPanel /> : <Navigate to='/' /> }
  </div>
}