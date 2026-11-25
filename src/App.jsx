import React, { useState } from 'react'
import { menu, slots, CLOSED_DAY, MAX_PARTY } from './data.js'

const today = () => new Date().toISOString().slice(0, 10)
export function validate(f, now = today()) {
  const e = {}
  if (!f.name.trim()) e.name = 'Please enter your name'
  if (!/^\+?[0-9 ]{8,15}$/.test(f.phone.trim())) e.phone = 'Enter a phone number (8-15 digits)'
  if (!f.date) e.date = 'Choose a date'
  else if (f.date < now) e.date = 'Date is in the past'
  else if (new Date(f.date + 'T12:00:00').getDay() === CLOSED_DAY) e.date = 'We are closed on Tuesdays'
  if (!slots.includes(f.time)) e.time = 'Choose a time'
  const n = Number(f.party)
  if (!Number.isInteger(n) || n < 1 || n > MAX_PARTY) e.party = `Party size must be 1 to ${MAX_PARTY}`
  return e
}

export default function App() {
  const [cat, setCat] = useState('All')
  const [veg, setVeg] = useState(false)
  const [f, setF] = useState({ name: '', phone: '', date: '', time: '', party: 2, note: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(null)
  const cats = ['All', ...new Set(menu.map(m => m.cat))]
  const items = menu.filter(m => (cat === 'All' || m.cat === cat) && (!veg || m.veg))
  const set = k => e => setF({ ...f, [k]: e.target.value })
  function submit(e) {
    e.preventDefault()
    const er = validate(f); setErr(er)
    if (!Object.keys(er).length) setDone(f)
  }
  return (
    <>
      <header className="nav"><a href="#top" className="brand"><img src="logo.svg" alt="" /><span>Saffron & Salt</span></a>
        <nav><a href="#menu">Menu</a><a href="#hours">Hours</a><a href="#book" className="cta">Reserve</a></nav></header>
      <section id="top" className="hero" style={{ backgroundImage: 'linear-gradient(90deg,rgba(40,10,10,.85),rgba(40,10,10,.25)),url(img/hero.jpg)' }}>
        <p>Mediterranean kitchen · demo</p><h1>Slow fire, bright herbs, long tables.</h1>
        <a className="btn" href="#book">Reserve a table</a></section>
      <section id="menu" className="wrap"><h2>Menu</h2>
        <div className="bar"><div className="chips">{cats.map(c => <button key={c} className={c === cat ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{c}</button>)}</div>
          <label className="vegl"><input type="checkbox" checked={veg} onChange={e => setVeg(e.target.checked)} /> Vegetarian only</label></div>
        <div className="menu">{items.map(m => (
          <article key={m.id}><img src={m.img} alt={m.name} /><div><h3>{m.name}{m.veg && <span className="veg">V</span>}</h3><p>{m.desc}</p><b>{m.price} EGP</b></div></article>))}
          {!items.length && <p>No dishes match.</p>}</div></section>
      <section id="hours" className="wrap alt"><h2>Hours</h2>
        <ul className="hours"><li><span>Mon, Wed to Sun</span><b>13:00 to 23:00</b></li><li><span>Tuesday</span><b>Closed</b></li></ul>
        <p className="muted">Fictional restaurant. Prices and hours are demo data.</p></section>
      <section id="book" className="wrap"><h2>Reserve a table</h2>
        {done ? <div className="ok" role="status"><h3>Request received (demo)</h3>
          <p>{done.name}, table for {done.party} on {done.date} at {done.time}. Nothing was sent.</p>
          <button className="btn" onClick={() => { setDone(null); setF({ ...f, date: '', time: '' }) }}>New request</button></div> : (
          <form onSubmit={submit} noValidate>
            <label>Name<input name="name" value={f.name} onChange={set('name')} />{err.name && <em>{err.name}</em>}</label>
            <label>Phone<input name="phone" value={f.phone} onChange={set('phone')} />{err.phone && <em>{err.phone}</em>}</label>
            <label>Date<input name="date" type="date" min={today()} value={f.date} onChange={set('date')} />{err.date && <em>{err.date}</em>}</label>
            <label>Time<select name="time" value={f.time} onChange={set('time')}><option value="">Select</option>{slots.map(s => <option key={s}>{s}</option>)}</select>{err.time && <em>{err.time}</em>}</label>
            <label>Guests<input name="party" type="number" value={f.party} onChange={set('party')} />{err.party && <em>{err.party}</em>}</label>
            <label className="full">Note (optional)<textarea name="note" rows="3" value={f.note} onChange={set('note')} /></label>
            <button className="btn" type="submit">Request reservation</button>
          </form>)}</section>
      <footer>Saffron & Salt is a fictional restaurant for a portfolio demo. Photos are AI-generated.</footer>
    </>
  )
}
