mport React, { 
import { useState } from 'react';
  Leaf, 
  MapPin, 
  PlusCircle, 
  LayoutDashboard, 
  Trophy, 
  Truck, 
  Sparkles, 
  Menu, 
  X,
  Compass,
  Award
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, userPoints, reportsCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', labelAr: 'الرئيسية', icon: Compass },
    { id: 'report', label: 'Report Waste', labelAr: 'إبلاغ عن قمامة', icon: PlusCircle, badge: 'New AI' },
    { id: 'map', label: 'Interactive Map', labelAr: 'الخريطة المباشرة', icon: MapPin },
    { id: 'dashboard', label: 'My Dashboard', labelAr: 'لوحتي', icon: LayoutDashboard },
    { id: 'rewards', label: 'Leaderboard & Rewards', labelAr: 'الجوائز والمتصدرون', icon: Trophy },
    { id: 'authority', label: 'Authority Dispatcher', labelAr: 'فريق النظافة', icon: Truck, isDispatcher: true }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 text-white transform -rotate-12" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-slate-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  Eco<span className="text-emerald-400">Clean</span>
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80">
                  EGYPT
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                مجتمع مصر لحماية البيئة ونظافة الشوارع
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? item.isDispatcher 
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                        : 'bg-emerald-600 text-white shadow-md shadow-emerald-900/50'
                      : item.isDispatcher
                        ? 'text-amber-400/90 hover:bg-amber-500/10 hover:text-amber-300'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.isDispatcher ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-900 font-mono">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* User Points Pill & Action */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('rewards')}
              className="group flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-all hover:bg-slate-800"
              title="View Rewards & Leaderboard"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  Green Points
                </span>
                <span className="text-xs font-black text-emerald-400 font-mono group-hover:text-emerald-300">
                  {userPoints.toLocaleString()} pts
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('report')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>Report Waste</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('rewards')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{userPoints}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-left text-sm font-semibold flex items-center justify-between ${
                  isActive
                    ? item.isDispatcher ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-slate-400 font-arabic">{item.labelAr}</span>
              </button>
            );
          })}
          
          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">Citizen: Kareem Taha (Cairo)</span>
            <span className="text-xs font-bold text-emerald-400 font-mono">{userPoints} pts</span>
          </div>
        </div>
      )}
    </nav>
  );
}
