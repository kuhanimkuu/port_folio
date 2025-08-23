import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

export default function App() {
  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Modal />
      </main>
      <Footer />
    </div>
  );
}
