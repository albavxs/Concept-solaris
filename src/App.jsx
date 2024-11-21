import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Carousel from './assets/carousel';
import Carousel2 from './assets/carousel2'
import Carousel3 from './assets/carousel3';
import './carousel.css'


function App() {
 

  return (
    <>
        <header className="header">
          <div className='menu'>
      <nav>
        <ul>
          <li><a className='home' href="#home">Home</a></li>
          <li><a className='assist' href="#about">Assistidos</a></li>
          <li><a className='novos' href="#contact">Novidades</a></li>
        </ul>
        
      </nav>
      </div>
    </header>
      <main>
        
      <div className='carousel'>
      <div className='title'> 
          <p>Top rated</p>
        </div>
      <Carousel />
      </div>
      <div className='carousel'>
        <div className='title'>
          <p>New Shows</p>
        
        <Carousel2/>
      </div>
    </div>

     <div className='carousel'>
        <div className='title'>
          <p>New Shows</p>
        
        <Carousel3/>
      </div>
    </div>

      </main>
      <footer></footer>
    </>
  )
}

export default App
