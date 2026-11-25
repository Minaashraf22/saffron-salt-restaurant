import React from 'react'
export default function DishCard({ m }) {
  return <article><img src={m.img} alt={m.name} /><div><h3>{m.name}{m.veg && <span className="veg">V</span>}</h3><p>{m.desc}</p><b>{m.price} EGP</b></div></article>
}
