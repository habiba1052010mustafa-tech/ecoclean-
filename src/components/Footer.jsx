import React from 'react';
import { Leaf, PhoneCall, ShieldCheck, Heart, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5 -rotate-12" />
              </div>
              <div>
                <span className="text-xl font-black text-white">Eco<span className="text-emerald-400">Clean</span></span>
                <span className="block text-[10px] text-emerald-400 uppercase tracking-widest font-mono">Egypt Platform</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Egypt's premier citizen-powered environmental protection & smart waste management network. Empowering neighborhoods from Alexandria to Aswan.
            </p>
            <div className="text-xs text-slate-400">
              <span className="inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400">
                Aligned with Egyptian Waste Law No. 202 / 2020
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Platform Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-emerald-400 transition-colors">
                  Project Mission & Impact Stats
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('report')} className="hover:text-emerald-400 transition-colors">
                  Report Street Waste (AI Verified)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-emerald-400 transition-colors">
                  Egypt Live Interactive Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Citizen Dashboard & Impact
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rewards')} className="hover:text-emerald-400 transition-colors">
                  Leaderboard & Voucher Store
                </button>
              </li>
            </ul>
          </div>

          {/* Municipal Partners */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Responsible Authorities</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cairo Cleaning & Beautification Authority</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ministry of Environment (WMRA Egypt)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Nahdet Misr Environmental (Alexandria)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Giza Hygiene & Cleanliness Agency</span>
              </li>
            </ul>
          </div>

          {/* Emergency & Hotlines */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Official Hotlines</h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Cairo Municipality Cleaning</span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">Dial 152</span>
                </div>
                <PhoneCall className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Ministry of Environment WMRA</span>
                  <span className="font-mono font-bold text-teal-400 text-sm">Dial 19808</span>
                </div>
                <PhoneCall className="w-4 h-4 text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} EcoClean Egypt Platform. Open-source civic environmental initiative.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with care for a cleaner, greener Egypt</span>
            <span className="text-red-500">🇪🇬</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
