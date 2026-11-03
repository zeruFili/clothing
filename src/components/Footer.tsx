import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#123d32] text-white border-t border-emerald-900/60 mt-16 sm:mt-20">
      {/* Main Footer: Brand and Assurance Pillars Side-by-Side in Columns */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-start">
          {/* Column 1: Brand Identity */}
          <div className="space-y-3.5 sm:space-y-4">
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
            <div className="text-xs text-emerald-300/80 font-medium space-y-1.5 pt-1">
              <p>📍 Flagship Salons: Paris (Place Vendôme) • Milan (Montenapoleone)</p>
              <p>📞 Private Client Concierge: +1 (800) 555-DOQA</p>
            </div>
          </div>

          {/* Column 2: Pillar 1 - Express Courier */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="truck" size={22} />
            </div>
            <div>
              <strong className="text-sm font-bold block text-white">
                Complimentary Express Courier
              </strong>
              <span className="text-xs text-emerald-200/70 block mt-1.5 leading-relaxed font-light">
                Dispatched in reinforced luxury gift boxes with velvet hangers on orders over $250
              </span>
            </div>
          </div>

          {/* Column 3: Pillar 2 - Doorstep Returns */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="refresh" size={22} />
            </div>
            <div>
              <strong className="text-sm font-bold block text-white">
                30-Day Doorstep Returns
              </strong>
              <span className="text-xs text-emerald-200/70 block mt-1.5 leading-relaxed font-light">
                Complimentary size exchanges and hassle-free returns with prepaid courier pickup
              </span>
            </div>
          </div>

          {/* Column 4: Pillar 3 - Haute Authenticity */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
              <Icon name="shield" size={22} />
            </div>
            <div>
              <strong className="text-sm font-bold block text-white">
                Guaranteed Haute Authenticity
              </strong>
              <span className="text-xs text-emerald-200/70 block mt-1.5 leading-relaxed font-light">
                Certified Grade 6A Organic Mulberry Silk, pure cashmere, and Italian tailoring
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-5 sm:py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-emerald-200/60 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} DOQA ATELIER — All rights reserved. Luxury Ready-to-Wear & Haute Couture.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[11px]">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Sale</Link>
            <Link to="/" className="hover:text-white transition-colors">Authenticity Guarantee</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
