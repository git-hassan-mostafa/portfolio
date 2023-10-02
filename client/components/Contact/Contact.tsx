'use client'
import Link from 'next/link'
import React from 'react'
import s from './Contact.module.css'
import { useRouter } from 'next/navigation'
export default function Contact() {

  const nameRef = React.useRef<HTMLInputElement | null>(null)
  const messageRef = React.useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = ` Hello my name is ${nameRef.current?.value} , \n ${messageRef.current?.value}`;
    const whatsappUrl = `https://wa.me/${81446801}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }
  return (
      <div className={s["form-container"]}>
        <form onSubmit={handleSubmit} className={s["form"]}>
          <div className={s["form-group"]}>
            <label htmlFor="email">Your Name : </label>
            <input ref={nameRef} type="text" id="email" name="email" required />
          </div>
          <div className={s["form-group"]}>
            <label htmlFor="textarea">Your Message : </label>
            <textarea ref={messageRef} name="textarea" id="textarea" rows={10} cols={50} required></textarea>
          </div>
          <div className={s["form-group"]}>
            <label > Note: By submitting this form you will be redirected to my whatsapp chat with your name and message. </label>
          </div>
          <button className={s["form-submit-btn"]} type="submit">Submit</button>
        </form>
      </div>
  )
}
