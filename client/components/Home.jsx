import React from 'react'
import {Route} from 'react-router-dom'

import About from './About'
import Homebuttons from './Homebuttons'

const Home = () => {
  return (

    <div className='columns'>

      <div className='about column'>
        <Route path='/' component={About} />
        <Route path='/' component={Homebuttons} />
      </div>

    </div>
  )
}

export default Home
