import Image from 'next/image'
import React from 'react'
import { cry } from '../../../public/images'
import Nodata from './nodata'

export default function Collections() {
  const collection=false
  return (
    <div className='collection'>
      {
        !collection && (
          <Nodata data={"No collections yet"} message={"Start a collection"} showButton={true} />
        )
      }
    </div>
  )
}
