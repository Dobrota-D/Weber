import React, { useState } from 'react';

import '../../styles/admin.css'

import LoginForm from '../admin/LoginForm';
import AdminPanel from '../admin/AdminPanel';

export default function Admin() {
  const [isAuth, setIsAuth] = useState(true);
  
  return <div className='main-component admin'>
    { isAuth ? 
      <AdminPanel />
      :
      <LoginForm setAuth={() => setIsAuth(true)} />
    }
  </div>
}