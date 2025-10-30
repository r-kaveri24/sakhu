import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Donation from './pages/Donation.jsx'
import Contact from './pages/Contact.jsx'
import Volunteer from './pages/Volunteer.jsx'
import Resources from './pages/Resources.jsx'
import Gallery from './pages/Gallery.jsx'
import News from './pages/News.jsx'
import NewsDetail from './pages/NewsDetail.jsx'

export default function App() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        "--font-sans": '"Lato", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
      <Footer />
    </div>
  )
}
