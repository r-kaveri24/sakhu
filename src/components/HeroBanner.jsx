import heroImg from '../assets/about/hero.png'

export default function HeroBanner({ title = 'Welcome' , image = heroImg }) {
  return (
    <section className="relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-xl md:text-3xl font-semibold">{title}</h1>
      </div>
    </section>
  )
}