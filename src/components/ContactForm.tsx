"use client";

import { useRef, useState, type FormEvent } from "react";

/** No backend in this project yet: validate, show the success state, then
 * hand the composed message to the visitor's mail client. To wire a real
 * endpoint, give the <form> an action + method and drop the preventDefault. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.namedItem("name") as HTMLInputElement;
    const email = form.elements.namedItem("email") as HTMLInputElement;
    const message = form.elements.namedItem("message") as HTMLTextAreaElement;

    const nameBad = !name.value.trim();
    const emailBad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    const messageBad = !message.value.trim();
    setErrors({ name: nameBad, email: emailBad, message: messageBad });
    if (nameBad || emailBad || messageBad) {
      (nameBad ? name : emailBad ? email : message).focus();
      return;
    }

    const intentValue =
      (form.querySelector("input[name=intent]:checked") as HTMLInputElement | null)?.value ?? "Hire";
    const subject = encodeURIComponent(`${intentValue} — ${name.value.trim()}`);
    const body = encodeURIComponent(`${message.value.trim()}\n\n—\n${name.value.trim()}\n${email.value.trim()}`);
    setSent(true);
    setTimeout(() => {
      window.location.href = `mailto:swarali.designworks@gmail.com?subject=${subject}&body=${body}`;
    }, 450);
  }

  function sendAnother() {
    formRef.current?.reset();
    setErrors({});
    setSent(false);
  }

  return (
    <>
      <form id="cform" ref={formRef} noValidate onSubmit={handleSubmit} className={sent ? "gone" : undefined}>
        <div className="fgrid">
          <div className={`field${errors.name ? " err" : ""}`}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Who's writing?"
              autoComplete="name"
              onChange={() => setErrors((s) => ({ ...s, name: false }))}
            />
            <div className="msg">A name would be nice.</div>
          </div>
          <div className={`field${errors.email ? " err" : ""}`}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="where.i.reply@to.you"
              autoComplete="email"
              onChange={() => setErrors((s) => ({ ...s, email: false }))}
            />
            <div className="msg">That email looks a little off.</div>
          </div>

          <div className="field full">
            <label>What&apos;s this about?</label>
            <div className="chips">
              <input type="radio" id="r1" name="intent" value="Hire" defaultChecked />
              <label htmlFor="r1">Hire me</label>
              <input type="radio" id="r2" name="intent" value="Collaborate" />
              <label htmlFor="r2">Collaborate</label>
              <input type="radio" id="r3" name="intent" value="Saying hi" />
              <label htmlFor="r3">Just saying hi</label>
            </div>
          </div>

          <div className={`field full${errors.message ? " err" : ""}`}>
            <label htmlFor="message">The message</label>
            <textarea
              id="message"
              name="message"
              placeholder="What's on your mind?"
              onChange={() => setErrors((s) => ({ ...s, message: false }))}
            />
            <div className="msg">Even one line is fine — but there should be one.</div>
          </div>
        </div>

        <button className="submit" type="submit">
          Send it <span>↗</span>
        </button>
        <p className="tinynote">I&rsquo;ll get back to you soon. Pinky promise.</p>
      </form>

      <div className={`sent${sent ? " on" : ""}`} id="sent">
        <h3>Sent. Now the waiting.</h3>
        <p>
          I read everything and I reply to everything — usually within a day, occasionally two if I&apos;ve fallen
          into a Figma file and started arguing with myself about 2&nbsp;pixels. <b>It happens. I always come back
          out. Don&apos;t worry.</b>
        </p>
        <button className="again" type="button" onClick={sendAnother}>
          Send another ↗
        </button>
      </div>
    </>
  );
}
