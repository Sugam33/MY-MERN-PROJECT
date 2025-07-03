import React from 'react'
import Banner from './Banner'
import One from './One'
import Hero from './Hero'
import About from './About'
import Services from './Services'
import Gallery from './Gallery'
import Testimonials from './Testimonials'
import Footer from './Footer'

const Home = ({mode, textColor}) => {
  return (
    <div>
        <Banner />
        {/* <One mode = {mode} textColor = {textColor} /> */}
        <Hero />
        <About mode = {mode} textColor = {textColor} />
        <Services mode={mode} textColor={textColor} />
        <Gallery mode = {mode} textColor = {textColor} />
        <Testimonials mode = {mode} textColor = {textColor}/>
    </div>
  )
}

export default Home
