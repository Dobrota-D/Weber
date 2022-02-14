import React, { useState } from 'react'

import LoginForm from '../login/LoginForm'
import RegisterForm from '../login/RegisterForm'

export default function Login() {
  const [showForm, setShowForm] = useState('login')
  
  return (
      <div className='main-component fullscreen-component'>
        { showForm === 'login' ?
          <LoginForm setShowForm={form => setShowForm(form)} /> :
          <RegisterForm setShowForm={form => setShowForm(form)} />
        }
      </div>
  )
}