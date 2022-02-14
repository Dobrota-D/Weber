import React from 'react'

import Warning from '../../assets/svg/Warning'

export default function ErrorMsg(props) {
  return (
    <div className='error-msg'>
      <Warning />
      <p>{ props.msg }</p>
    </div>
  )
}