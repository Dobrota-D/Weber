import React, { useState } from 'react';

import '../../styles/admin.css'

import LoginForm from '../LoginForm';
import AdminPanel from '../AdminPanel';

export default function Admin() {
  const [isAuth, setIsAuth] = useState(false);
  
  return <div className='main-component admin'>
    { isAuth ? 
      <AdminPanel />
      :
      <LoginForm setAuth={() => setIsAuth(true)} />
    }
  </div>;
}
