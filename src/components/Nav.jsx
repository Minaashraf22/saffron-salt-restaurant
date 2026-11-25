import React from 'react'
export default function Nav() {
  return (
    <header className="nav"><a href="#top" className="brand"><img src="logo.svg" alt="" /><span>Saffron & Salt</span></a>
      <nav><a href="#menu">Menu</a><a href="#hours">Hours</a><a href="#book" className="cta">Reserve</a></nav></header>
  )
}
