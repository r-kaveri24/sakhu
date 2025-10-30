import volunteerBg from "../assets/footer-volunteer.png";
import logoNaav from "../assets/logoNaav.png";
import youtubeIcon from "../assets/scoial-youtube.png";  
import instagramIcon from "../assets/social-instagram.png";
import twitterIcon from "../assets/social-twitter.png";
import facebookIcon from "../assets/social-facebook.png";
import whatsapp from "../assets/social-whatsapp.png";
import { Link } from 'react-router-dom';




export default function Footer() {
  return (
    <footer id="contact" className="text-white">
      {/* Section 1: Volunteer Background with CTA */}
      <section className="relative">
        <img
          src={volunteerBg}
          alt="Volunteer background"
          className="w-full h-[280px] md:h-[340px] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-7xl px-4">
            <h2 className="text-xl md:text-3xl font-bold tracking-wide">ARE YOU READY TO VOLUNTEER?</h2>
            <p className="mt-3 text-xs md:text-sm opacity-70">
              United community contribution is what makes Sakhu Foundation what it is today! At Sakhu Foundation, we combine hard work and fun to achieve our goals by affiliating 
              with individual members of society, fellow organizations/NGOs, community social workers, students, activists, and corporate officials to achieve our goals and work in
              unity towards our cause. Let us know how you would like to get involved. Review our website and contact any of our offices if you are interested. To investigate other 
              opportunities in Sakhu Foundation, please click below, complete the form, and submit it. We’ll be in touch shortly.
            </p>
            <div className="mt-5 flex justify-center gap-4">
              <a
                href="#volunteer"
                className="px-5 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base"
              >
                Become Volunteer
              </a>
              <a
                href="#donate"
                className="px-5 py-2 rounded-md border border-white/80 text-white hover:bg-white/10 text-sm md:text-base"
              >
                Make Donation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Black footer with links and social */}
      <section className="bg-black">
        <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
          {/* Left: Logo + description + social icons */}
          <div>
            <div className="flex flex-col items-start gap-3">
              <img src={logoNaav} alt="Sakhu Foundation" className="w-12 h-12 rounded-full bg-white" /> 
                <p className="text-xs text-gray-400">
                  We support socio-economically underprivileged cancer patients with poor access to the treatment
                  prescribed to them.
                </p>
             
            </div>
            <div className="mt-4 flex items-center gap-3 text-white">
              {/* Social icons */}
              <a aria-label="whatsapp" href="#" className="w-7 h-7 inline-flex items-center justify-center ">
                <img src={whatsapp} alt="" />
              </a>
              <a aria-label="Instagram" href="#" className="w-7 h-7 inline-flex items-center justify-center ">
                <img src={instagramIcon} alt="" />
              </a>
              <a aria-label="Twitter" href="#" className="w-7 h-7 inline-flex items-center justify-center ">
                <img src={twitterIcon} alt="" />
              </a>
              <a aria-label="Facebook" href="#" className="w-7 h-7 inline-flex items-center justify-center ">
                <img src={facebookIcon} alt="" />
              </a>
              <a aria-label="YouTube" href="https://youtube.com/@sakhucancerfoundation?si=GQeFbtJT8aS8-0Gw" className="w-7 h-7 inline-flex items-center justify-center ">
                <img src={youtubeIcon} alt="" />
              </a>
              
            </div>
          </div>

          {/* Middle: Links */}
          <div>
            <ul className="mt-3 space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><a href="/news" className="hover:text-white">News & Events</a></li>
              <li><a href="/volunteer" className="hover:text-white">Volunteer</a></li>
              <li><a href="/resources" className="hover:text-white">Resources</a></li>
              <li><span aria-disabled="true" title="Coming Soon" className="text-gray-500 cursor-not-allowed">Blog</span></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Right: Address / Contact */}
          <div>
            <h4 className="font-semibold text-white">Address</h4>
            <p className="mt-1 text-sm text-gray-300">Karmafal, Plot No 72, Shakti Nagar, Waluj, Chh. Sambhajinagar</p>
            <div className="mt-3">
              <p className="text-sm text-gray-300"><span className="font-semibold">Mobile No</span> <br/> 9307674533</p>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-300"><span className="font-semibold">Link</span></p>
              <a href="https://www.sakhucancerfoundation.org" target="_blank" rel="noopener noreferrer" className="text-sm text-white underline">www.sakhucancerfoundation.org</a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Gradient strip with company name */}
      <section className="bg-linear-to-r from-purple-700 via-fuchsia-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center text-sm">
          Powered by – Inphynous Technology Solution
          {" "}
          <a href="https://www.inphynous.com" target="_blank" rel="noopener noreferrer" className="underline">www.inphynous.com</a>
        </div>
      </section>
    </footer>
  );
}