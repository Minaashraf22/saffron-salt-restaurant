import React, { useState } from 'react'
import { menu } from '../data.js'
import DishCard from './DishCard.jsx'
export default function MenuSection() {
  const [cat, setCat] = useState('All')
  const [veg, setVeg] = useState(false)
  const cats = ['All', ...new Set(menu.map(m => m.cat))]
  const items = menu.filter(m => (cat === 'All' || m.cat === cat) && (!veg || m.veg))
  return (
    <section id="menu" className="wrap"><h2>Menu</h2>
      <div className="bar"><div className="chips">{cats.map(c => <button key={c} className={c === cat ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{c}</button>)}</div>
        <label className="vegl"><input type="checkbox" checked={veg} onChange={e => setVeg(e.target.checked)} /> Vegetarian only</label></div>
      <div className="menu">{items.map(m => <DishCard key={m.id} m={m} />)}
        {!items.length && <p>No dishes match.</p>}</div></section>
  )
}
