import React from 'react'

export default function UtilityButton({ text, scale, color, utilityFunction }) {
  return (
    <div className='utility-button' style={{color: `${color}`, transform: `scale(${scale})`}} onClick={utilityFunction}>
        {text}
    </div>
  )
}
