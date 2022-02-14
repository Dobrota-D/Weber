import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import ErrorMsg from './ErrorMsg'
import EyeClose from '../../assets/svg/EyeClose'
import EyeOpen from '../../assets/svg/EyeOpen'

export default function RegisterForm(props) {
  const URL = process.env.REACT_APP_BACKEND_URL
  const navigate = useNavigate()
  
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
    
  const onSubmit = data => {
    fetch(`${URL}/auth/register`, { method: 'POST', body: JSON.stringify(data) })
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        // Store token in localstorage
        localStorage.setItem('token', res.token)
        // Redirect user to homepage and refresh to apply localstorage
        navigate('/')
        window.location.reload(false);
      } else {
        // Handle error
        setError(res.error.input, { type: 'manual', message: res.error.msg })
      }
    })
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <h3 className='form-title'>Inscription</h3>
        
        <div className={`${errors.username && 'input-group-error'} input-group`}>
          <input
            {...register(
              'username',
              {
                required: 'Nom d\'utilisateur obligatoire',
              }
            )}
            type='text'
            autoFocus
          />
          <label>Nom d'utilisateur</label>
          { errors.username && <ErrorMsg msg={errors.username.message} /> }          
        </div>
        
        <div className={`${errors.password && 'input-group-error'} input-group`}>
          <input 
            {...register(
              'password',
              { required: 'Mot de passe obligatoire' }
            )}
            type={showPassword ? 'text' : 'password'}
          />
          <label>Mot de passe</label>
          
          <div className='password-eye' onClick={() => setShowPassword(!showPassword)}>
            { showPassword ? <EyeOpen /> : <EyeClose /> }
          </div>
          
          { errors.password && <ErrorMsg msg={errors.password.message} /> }          
        </div>
        
        <button type='submit' className='submit'>Inscription</button>
        
        <p className='redirect'>Vous avez déjà un compte ? <span onClick={() => props.setShowForm('login')}>Connexion</span></p>
      </form>
    </div>
  )
}