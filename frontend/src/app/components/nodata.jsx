import React from 'react'
import { cry } from '../../../public/images'
import Image from 'next/image'
import { useLoggedUser } from '../contexts/loginContext'

export default function Nodata({ data, message, utilityFunction, showButton }) {
    const {userInfo} = useLoggedUser();
    return (
        <div className='collection-div'>
            <div className='dsp-f ai-c justify-center'><Image src={cry} width={125} height={125} alt='cry-emoji' />
            </div>
            <p>{data}</p>
            {
                showButton && userInfo.userid && (
                    <div className='button-div'>
                        <div className='button' onClick={() => utilityFunction()}><p>{message}</p></div>
                    </div>
                )
            }
        </div>
    )
}
