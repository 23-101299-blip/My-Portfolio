import { useState } from 'react';
import Page from '../components/Page';
import Window from '../components/Window';
import Reveal from '../components/Reveal';
import { profile } from '../data/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Please enter your name.';
    if (!EMAIL_RE.test(form.email.trim())) er.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) er.message = 'Please write at least 10 characters.';
    setErrors(er);
    if (Object.keys(er).length) {
      const first = Object.keys(er)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    // No server: open the visitor's email app with the message filled in.
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Page title="Contact">
      <section className="band band--split" style={{ '--split': '32%' }}>
        <div className="container">
          <h1 className="section-title">▶ LET’S BUILD SOMETHING</h1>
          <div className="contact-grid">
            <Reveal>
              <Window bar="green" title="Contact info.txt" dots={['red', 'sky', 'yellow']} className="fill" bodyClassName="cinfo">
                <img src="/assets/pixel/envelope.svg" alt="" width="64" height="48" />
                <h2 className="pixel cinfo__h">SAY HELLO, PLAYER TWO.</h2>
                <p>Have a design challenge or an idea to explore? Let’s start a conversation.</p>
                <dl className="cinfo__list">
                  <div><dt className="retro muted">EMAIL</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
                  <div>
                    <dt className="retro muted">PHONE</dt>
                    <dd className="cinfo__phones">{profile.phones.map((ph) => <a key={ph} href={`tel:+2${ph}`}>{ph}</a>)}</dd>
                  </div>
                  <div><dt className="retro muted">BASED IN</dt><dd>{profile.location}</dd></div>
                </dl>
                <hr />
                <p className="pixel cinfo__sub">CONNECT ELSEWHERE</p>
                <ul className="socials">
                  {profile.social.map((s) => (
                    <li key={s.label}>
                      {s.url ? (
                        <a className="retro" href={s.url} target="_blank" rel="noreferrer">{s.label} →</a>
                      ) : (
                        <>
                          <span className="retro">{s.label} →</span>
                          <span className="muted small">[Add confirmed URL]</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </Window>
            </Reveal>

            <Reveal delay={0.1}>
              <Window bar="red" title="My Computer / Portfolio / Contact" className="fill">
                <h2 className="pixel form-h">NEW MESSAGE</h2>
                <p>Tell me a little about you and what you have in mind.</p>
                <form className="form" onSubmit={submit} noValidate>
                  <label htmlFor="f-name" className="retro">Your name</label>
                  <input id="f-name" name="name" autoComplete="name" placeholder="Enter your name" value={form.name} onChange={update}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined} />
                  {errors.name && <p id="e-name" className="form__err">{errors.name}</p>}

                  <label htmlFor="f-email" className="retro">Email address</label>
                  <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={update}
                    aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined} />
                  {errors.email && <p id="e-email" className="form__err">{errors.email}</p>}

                  <label htmlFor="f-message" className="retro">Your message</label>
                  <textarea id="f-message" name="message" rows="6" placeholder="What would you like to create?" value={form.message} onChange={update}
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-message' : undefined} />
                  {errors.message && <p id="e-message" className="form__err">{errors.message}</p>}

                  <div className="form__row">
                    <button type="submit" className="btn btn--yellow btn--retro">Send Message →</button>
                    <span className="retro muted" aria-live="polite">{sent ? 'Message ready in your email app!' : 'Ready when you are.'}</span>
                  </div>
                  <p className="small muted">Pressing Send opens your email app with the message filled in.</p>
                </form>
              </Window>
            </Reveal>
          </div>
        </div>
      </section>
    </Page>
  );
}
