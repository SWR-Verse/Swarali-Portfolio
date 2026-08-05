import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page" data-page="contact">
      {/* HERO */}
      <section className="hero-contact">
        <div className="hero-top rv">
          <span>Contact — 2026</span>
          <span>Design with intent</span>
          <span>Based in India</span>
        </div>
        <div className="rv">
          <h1 className="page-name clip">
            <span>
              Say hi<b className="dot">.</b>
            </span>
          </h1>
        </div>
        <div className="intro-row rv">
          <div className="big">
            <span className="clip">
              <span>Let&apos;s build</span>
            </span>
            <span className="clip">
              <span>something</span>
            </span>
          </div>
          <p>
            Whether you&apos;re shaping a new product, refining an existing one, or simply exploring an idea,
            I&apos;d love to hear where you&apos;re headed. Great products begin with great conversations.
          </p>
        </div>
      </section>

      {/* FORM — paper band */}
      <section id="form" className="paperband">
        <div className="eyebrow rv">(01) The form</div>
        <div className="form-wrap">
          <div className="form-aside rv">
            <h2>
              <span className="clip">
                <span>Tell me</span>
              </span>
              <span className="clip">
                <span>everything.</span>
              </span>
            </h2>
            <p>
              Or the short version. Either works — I&apos;d rather hear a rough idea early than a polished brief
              late.
            </p>
            <a className="direct" href="mailto:swarali.designworks@gmail.com">
              swarali.designworks@gmail.com
            </a>
          </div>

          <div className="rv">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer
        eyebrowNo="02"
        eyebrowLabel="Elsewhere"
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/work", label: "Work" },
        ]}
      />
    </div>
  );
}
