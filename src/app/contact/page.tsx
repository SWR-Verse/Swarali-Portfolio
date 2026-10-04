import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import HeroGrid from "@/components/HeroGrid";
import CopyEmail from "@/components/CopyEmail";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="page" data-page="contact">
      {/* HERO */}
      <section className="hero-contact">
        <HeroGrid align="left" />
        <div className="hero-top rv">
          <span>Portfolio © 2026</span>
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
        <div className="hero-row rv">
          <div className="hero-role clip">
            <span>Product Designer</span>
          </div>
          <p className="hero-blurb">
            Some experiences are held. Others are felt.
            <br />
            I design both. <b className="star">✦</b>
          </p>
        </div>
      </section>

      {/* FORM — on the page's own dark ground, in the site's language: the
          about-story heading, a toolkit-style card for the form, amber accents. */}
      <section id="form" className="contact-form">
        <div className="form-wrap">
          <div className="form-aside rv">
            <h2 className="story-h story-h-plain">
              <span className="clip">
                <span>Let&apos;s make</span>
              </span>
              <span className="clip">
                <span>something</span>
              </span>
              <span className="clip">
                <span>
                  <b>good</b>
                </span>
              </span>
            </h2>
            <p>
              Got a problem worth solving, an idea worth exploring, or simply want to say hi? I&rsquo;m all ears.
            </p>
            <CopyEmail />
          </div>

          <div className="form-card rv">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer
        links={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
          { href: "/work", label: "Work" },
        ]}
      />
    </div>
  );
}
