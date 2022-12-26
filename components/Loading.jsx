import Image from 'next/image'
import React from 'react';
import Logo from '../assets/logo.png'
// import { Circle } from 'better-react-spinkit';
import { Circles } from  'react-loader-spinner'

const Loading = () => {
  return (
    <center style={{display: 'grid', placeItems:'center', height:"100vh"}}>
        <div>
        <Image
        src={Logo}
        height={200}
        style={{marginBottom: '10px'}}
        />
        <div style={{marginLeft: '50%'}}>

        <Circles
         height="60"
         width="60"
         color="#3cbc28"
         ariaLabel="circles-loading"
         wrapperStyle={{}}
         wrapperClass=""
         visible={true}
         
            />
        </div>
    </div>
    </center>
  )
}

export default Loading