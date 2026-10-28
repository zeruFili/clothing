import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123d32] text-white border-t border-emerald-900/60 mt-20">
      {/* Upper Assurance Banner (Adapted directly from Doqa Rental's 3-pillar banner) */}
      <div className="border-b border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="truck" size={24} />
            </div>
            <div>
              <strong className="text-sm font-bold block">Complimentary Express Courier</strong>
              <span className="text-xs text-emerald-200/70">
                Dispatched in reinforced luxury gift boxes with velvet hangers on orders over $250
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="refresh" size={24} />
            </div>
            <div>
              <strong className="text-sm font-bold block">30-Day Doorstep Returns</strong>
              <span className="text-xs text-emerald-200/70">
                Complimentary size exchanges and hassle-free returns with prepaid courier pickup
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="shield" size={24} />
            </div>
            <div>
              <strong className="text-sm font-bold block">Guaranteed Haute Authenticity</strong>
              <span className="text-xs text-emerald-200/70">
                Certified Grade 6A Organic Mulberry Silk, pure cashmere, and Italian tailoring
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-display font-black flex items-center justify-center text-base shadow-md">
              DA
            </div>
            <strong className="text-lg font-black font-display tracking-tight text-white">
              DOQA ATELIER
            </strong>
          </div>
          <p className="text-xs text-emerald-200/70 leading-relaxed font-light">
            The premier European fashion house curating sovereign haute couture, gala gowns, bespoke tuxedos, and silk tailoring for diplomatic functions, film premieres, and high-society galas.
          </p>
          <div className="text-xs text-emerald-300/80 font-medium space-y-1">
            <p>📍 Flagship Salons: Paris (Place Vendôme) • Milan (Montenapoleone)</p>
            <p>📞 Private Client Concierge: +1 (800) 555-DOQA</p>
          </div>
        </div>

        {/* Haute Collections */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Couture Collections
          </h4>
          <ul className="space-y-2 text-xs text-emerald-100/70">
            <li>
              <Link to="/?cat=Evening+Gowns+%26+Gala+Dresses" className="hover:text-white transition-colors">
                Gala Gowns & Red Carpet Silk
              </Link>
            </li>
            <li>
              <Link to="/?cat=Tailored+Suits+%26+Tuxedos" className="hover:text-white transition-colors">
                Bespoke Black-Tie Tuxedos
              </Link>
            </li>
            <li>
              <Link to="/?cat=Cashmere+Coats+%26+Capes" className="hover:text-white transition-colors">
                Double-Faced Cashmere Outerwear
              </Link>
            </li>
            <li>
              <Link to="/?cat=Silk+Blouses+%26+Shirts" className="hover:text-white transition-colors">
                Mulberry Silk Charmeuse Blouses
              </Link>
            </li>
            <li>
              <Link to="/?cat=Leather+Accessories+%26+Bags" className="hover:text-white transition-colors">
                Gilded Minaudières & Clutches
              </Link>
            </li>
          </ul>
        </div>

        {/* Client Privilege & Services */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Client Services
          </h4>
          <ul className="space-y-2 text-xs text-emerald-100/70">
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Complimentary Bespoke Tailoring
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                30-Day Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Track Your Luxury Delivery
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Private In-Boutique Styling Appointments
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Corporate & VIP Gifting Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Boutiques & Newsletter */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
            Flagship Boutiques
          </h4>
          <div className="text-xs text-emerald-200/70 space-y-1.5 font-light">
            <p className="flex justify-between">
              <span>Paris (Place Vendôme):</span> <strong className="text-white">10:00 – 19:30 CET</strong>
            </p>
            <p className="flex justify-between">
              <span>Milan (Montenapoleone):</span> <strong className="text-white">10:00 – 19:30 CET</strong>
            </p>
            <p className="flex justify-between">
              <span>London Mayfair:</span> <strong className="text-white">09:30 – 18:30 GMT</strong>
            </p>
            <p className="flex justify-between">
              <span>New York Madison:</span> <strong className="text-white">10:00 – 20:00 EST</strong>
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[10px] text-emerald-300 uppercase font-bold tracking-wider block mb-1">
              Join the Private Gazette
            </span>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter client email..."
                className="w-full px-3 py-2 text-xs bg-white/10 rounded-xl border border-white/20 text-white placeholder-emerald-300/50 outline-none focus:border-amber-400"
              />
              <button className="px-4 py-2 bg-amber-400 text-emerald-950 rounded-xl text-xs font-bold hover:bg-amber-300 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div>
            © {new Date().getFullYear()} DOQA ATELIER — All rights reserved. Luxury Ready-to-Wear & Haute Couture.
          </div>
          <div className="flex gap-6 text-[11px]">
            <Link to="/" className="hover:text-white">Privacy Policy</Link>
            <Link to="/" className="hover:text-white">Terms of Sale</Link>
            <Link to="/" className="hover:text-white">Authenticity Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
