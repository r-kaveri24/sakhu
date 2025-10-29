import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        "--font-sans": '"Lato", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      }}
    >
      <Header />
      <Home />
      <Footer />
    </div>
  )
}
