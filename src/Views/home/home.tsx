import React from 'react'
import CardList from '~/components/card-list/card-list'

const HomeView = () => {
  return (
    <div className="w-full justify-center items-center content-center">
        <h1 className='font-semibold text-3xl'>
            Welcome to the home page
        </h1>
        <CardList/>
    </div>
  )
}

export default HomeView