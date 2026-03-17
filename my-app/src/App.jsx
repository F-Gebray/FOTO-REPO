import Navbar from "./components/Navbar";
import Hero from "./components/hero/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="projects" className="section">
          <Projects />
        </section>
        <section id="skills" className="section section-alt">
          <Skills />
        </section>
        <section id="about" className="section">
          <About />
        </section>
        <section id="contact" className="section section-alt">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
