import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "../context/AppContext";
import Icon from "./Icons";

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useApp();
  const [activeGender, setActiveGender] = useState<"women" | "men">("women");

  if (!isSizeGuideOpen) return null;

  return typeof document !== "undefined"
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
          role="dialog"
          aria-modal="true"
        >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-scale-up p-5 sm:p-8 space-y-5 sm:space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-gray-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Atelier Fit Architecture
            </span>
            <h3 className="text-lg sm:text-2xl font-black font-display text-gray-950">
              Couture Sizing & Measurements
            </h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1.5 sm:gap-2 p-1 bg-gray-100 rounded-2xl">
          <button
            onClick={() => setActiveGender("women")}
            className={`flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
              activeGender === "women"
                ? "bg-[#123d32] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Women's Haute Couture
          </button>
          <button
            onClick={() => setActiveGender("men")}
            className={`flex-1 py-2 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
              activeGender === "men"
                ? "bg-[#123d32] text-white shadow-xs"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Men's Sartorial Bespoke
          </button>
        </div>

        {/* Scroll hint on mobile */}
        <div className="sm:hidden text-[10px] text-gray-400 flex items-center justify-between px-1">
          <span>← Swipe table horizontally to compare →</span>
          <span>Inches (in)</span>
        </div>

        {/* Tables */}
        {activeGender === "women" ? (
          <div className="space-y-4">
            <div className="overflow-x-auto touch-pan-x pb-2">
              <table className="w-full min-w-[500px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">US</th>
                    <th className="py-2.5">UK</th>
                    <th className="py-2.5">FR/EU</th>
                    <th className="py-2.5">IT</th>
                    <th className="py-2.5">Bust (in)</th>
                    <th className="py-2.5">Waist (in)</th>
                    <th className="py-2.5">Hips (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">XS</td>
                    <td>0-2</td>
                    <td>4-6</td>
                    <td>32-34</td>
                    <td>36-38</td>
                    <td>32 - 33</td>
                    <td>24 - 25</td>
                    <td>34 - 35</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">S</td>
                    <td>4-6</td>
                    <td>8-10</td>
                    <td>36-38</td>
                    <td>40-42</td>
                    <td>34 - 35</td>
                    <td>26 - 27</td>
                    <td>36 - 37</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">M</td>
                    <td>8-10</td>
                    <td>12-14</td>
                    <td>40-42</td>
                    <td>44-46</td>
                    <td>36 - 37</td>
                    <td>28 - 29</td>
                    <td>38 - 39</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">L</td>
                    <td>12-14</td>
                    <td>16-18</td>
                    <td>44-46</td>
                    <td>48-50</td>
                    <td>38 - 40</td>
                    <td>30 - 32</td>
                    <td>40 - 42</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">XL</td>
                    <td>16</td>
                    <td>20</td>
                    <td>48</td>
                    <td>52</td>
                    <td>41 - 43</td>
                    <td>33 - 35</td>
                    <td>43 - 45</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
              <strong className="block font-bold">✨ Complimentary Private Tailoring</strong>
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                All evening gowns and crepe trousers include complimentary hem and waist adjustments in our Paris and London salons or via your local bespoke tailoring allowance.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto touch-pan-x pb-2">
              <table className="w-full min-w-[500px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5">Jacket</th>
                    <th className="py-2.5">Chest (in)</th>
                    <th className="py-2.5">EU Size</th>
                    <th className="py-2.5">Trouser Waist</th>
                    <th className="py-2.5">Inseam (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">36R</td>
                    <td>36 - 37</td>
                    <td>46</td>
                    <td>30</td>
                    <td>32</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">38R</td>
                    <td>38 - 39</td>
                    <td>48</td>
                    <td>32</td>
                    <td>32.5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">40R</td>
                    <td>40 - 41</td>
                    <td>50</td>
                    <td>34</td>
                    <td>33</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">42R</td>
                    <td>42 - 43</td>
                    <td>52</td>
                    <td>36</td>
                    <td>33.5</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-gray-950">44R</td>
                    <td>44 - 45</td>
                    <td>54</td>
                    <td>38</td>
                    <td>34</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-950 space-y-1">
              <strong className="block font-bold">✨ Master Cutter Advice</strong>
              <p className="text-[11px] text-emerald-900/80 leading-relaxed">
                Our Neapolitan and Savile Row tuxedos are crafted with generous inlays, allowing sleeves and trouser lengths to be effortlessly lengthened or tapered by up to 2.5 inches.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 text-center">
          <button
            onClick={closeSizeGuide}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#123d32] text-white rounded-xl text-xs font-bold hover:bg-[#0e2c24] transition-colors"
          >
            Understood & Return to Garment
          </button>
        </div>
        </div>
      </div>,
      document.body
    )
  : null;
};

export default SizeGuideModal;
