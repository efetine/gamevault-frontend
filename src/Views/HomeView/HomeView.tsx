import React from 'react'
import { SteamClone } from '~/components/steam-clone'

const HomeView = () => {
  return (
    <div className="w-full justify-center items-center content-center">
        <h1 className='font-semibold text-3xl'>
            Welcome to the home page
        </h1>
        <SteamClone/>
    </div>
  )
}

export default HomeView