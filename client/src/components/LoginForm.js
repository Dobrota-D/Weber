import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import Warning from '../assets/svg/Warning'
import EyeClose from '../assets/svg/EyeClose'
import EyeOpen from '../assets/svg/EyeOpen'

export default function LoginForm(props) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  
  const onSubmit = data => {
    const adminUsername = process.env.REACT_APP_USERNAME
    const adminPassword = process.env.REACT_APP_PASSWORD
    
    if (data.username !== adminUsername) setError('username', { type: "manual", message: 'Username incorrect' })
    else if (data.password !== adminPassword) setError('password', { type: "manual", message: 'Mot de passe incorrect' })
    else props.setAuth()
  }
  
  return <div>
    <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
      <p className='title'>Espace administrateur</p>
      
      <div className='input-group'>
        <label>Username</label>
        <input {...register(
          "username",
          { required: 'Username obligatoire' }
        )}
        autoFocus
        />
        { errors.username &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.username.message }</p>
          </div>
        }
      </div>
      
      <div className='input-group'>
        <label>Mot de passe</label>
        <input
          {...register(
            "password",
            { required: 'Mot de passe obligatoire' }
          )}
          type={showPassword ? 'text' : 'password'}
        />
        <div className='password-eye' onClick={() => setShowPassword(!showPassword)}>
          { showPassword ? <EyeOpen /> : <EyeClose /> }
        </div>
        { errors.password &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.password.message }</p>
          </div>
        }  
      </div>
      
      <input type='submit' value='Connexion' className='submit' />
    </form>
  </div>;
}
