import React, { useState } from 'react'
import { slots } from '../data.js'
import { validate, today } from '../validation.js'

export default function ReservationForm() {
  const [f, setF] = useState({ name: '', phone: '', date: '', time: '', party: 2, note: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(null)
  const set = k => e => setF({ ...f, [k]: e.target.value })
  function submit(e) {
    e.preventDefault()
    const er = validate(f); setErr(er)
    if (!Object.keys(er).length) setDone(f)
  }
  return (
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
  )
}
