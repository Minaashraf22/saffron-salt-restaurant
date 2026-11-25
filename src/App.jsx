import React from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import MenuSection from './components/MenuSection.jsx'
import HoursSection from './components/HoursSection.jsx'
import ReservationForm from './components/ReservationForm.jsx'

export { validate } from './validation.js'

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <MenuSection />
      <HoursSection />
      <ReservationForm />
      <footer>Saffron & Salt is a fictional restaurant for a portfolio demo. Photos are AI-generated.</footer>
    </>
  )
}
