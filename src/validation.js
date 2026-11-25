import { slots, CLOSED_DAY, MAX_PARTY } from './data.js'
export const today = () => new Date().toISOString().slice(0, 10)
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
