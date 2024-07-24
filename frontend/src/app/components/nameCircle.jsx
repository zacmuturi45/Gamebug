import React from 'react'

export default function NameCircle({ name, gradient }) {
  return (
    <div className='name-circle' style={{background: gradient}}>
        {name}
    </div>
  )
}
