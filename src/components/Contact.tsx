import { useState } from 'react'

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name: form.name, email: form.email, message: form.message })
  }

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [field]: e.target.value })

  return (
    <section className="page">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Message
          <textarea
            value={form.message}
            onChange={update('message')}
            placeholder="Your message"
            rows={4}
            required
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </section>
  )
}

export default ContactPage