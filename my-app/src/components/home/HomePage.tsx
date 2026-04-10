import React from "react";
import Hero from "../hero/Hero";
import Projects from "../Projects";
import Skills from "../Skills";
import Service from "../Service";
import About from "../About";
import Contact from "../Contact";
import CTA from "../CTA";

const HomePage: React.FC = () => (
  <>
    <section id="home">
      <Hero />
    </section>
    <section id="projects" className="section">
      <Projects />
    </section>
    <section id="skills" className="section section-alt">
      <Skills />
    </section>
    <section id="services">
      <Service />
    </section>
    <CTA />
    <section id="about" className="section">
      <About />
    </section>
    <section id="contact" className="section section-alt">
      <Contact />
    </section>
  </>
);

export default HomePage;
