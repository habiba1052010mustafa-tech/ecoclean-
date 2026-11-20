import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  TrendingUp, 
  ShieldAlert, 
  Bug, 
  Wind, 
  Clock, 
  Award, 
  Recycle, 
  Zap, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  Users
} from 'lucide-react';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { INITIAL_REPORTS } from '../data/mockData';

export default function HomePage({ setActiveTab, onSelectReport }) {
  const cleanedReports = INITIAL_REPORTS.filter(r => r.status === 'Cleaned');
  const [activeSliderIdx, setActiveSliderIdx] = useState(0);

  const currentShowcase = cleanedReports[activeSliderIdx] || cleanedReports[0];

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-12 pb-24 border-b border-slate-800">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Pill tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>National Community Initiative • جمهورية مصر العربية</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Transforming Egypt’s Streets Into <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">Cleaner, Greener</span> Communities
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Report street waste, let <strong>Vision AI</strong> classify urgency & prevent duplicate reports, dispatch direct cleanup to Egyptian municipal authorities, and earn valuable rewards for every verified cleanup.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
              <button
                onClick={() => setActiveTab('report')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Report Waste With AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Explore Live Egypt Map</span>
              </button>
            </div>

            {/* Quick stats mini ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-10 text-left border-t border-slate-800/80">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-400">18,450+</span>
                <span className="block text-[11px] text-slate-400">Cleanups Verified</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black font-mono text-teal-400">28 Hours</span>
                <span className="block text-[11px] text-slate-400">Avg. Response Time</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black font-mono text-amber-400">1,420 Tons</span>
                <span className="block text-[11px] text-slate-400">Diverted Waste</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-xl sm:text-2xl font-black font-mono text-blue-400">48,200+</span>
                <span className="block text-[11px] text-slate-400">Active Citizens</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Egypt Waste Context & Core Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            The Environmental Reality in Egypt
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Street Waste Demands Rapid Community Action
          </h2>
          <p className="text-sm text-slate-600">
            Egypt generates over <strong>26.5 million tons</strong> of solid municipal waste each year (~55,000+ tons every day). Uncollected piles pose acute public health and environmental threats.
          </p>
        </div>

        {/* 4 Problem Threat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Foul Odors & Methane</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Decomposing organic food scraps produce intense foul smells and release toxic methane gas, degrading neighborhood quality of life under Egypt’s sunny climate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
              <Bug className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Insects & Disease Vectors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open garbage piles become immediate breeding sites for flies, mosquitoes, stray animals, and rodents, transmitting harmful pathogens near homes and schools.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Hazardous & Medical Waste</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Broken glass, clinical waste, batteries, and chemical containers mixed with public trash threaten sanitation workers, playing children, and groundwater.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Slow Municipal Routing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Without precise GPS pins and verified severity levels, cleanup teams struggle to prioritize urgent hazardous hotspots over minor leaves. EcoClean bridges this gap.
            </p>
          </div>
        </div>
      </section>

      {/* 5-Step Proposed Workflow */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
              The End-To-End System
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              How EcoClean Turns Citizen Photos Into Rapid Cleanups
            </h2>
            <p className="text-sm text-slate-400">
              A frictionless civic feedback loop with automated AI verification and measurable citizen rewards.
            </p>
          </div>

          {/* Workflow step cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-400/30">
                    01
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">User Action</span>
                </div>
                <h4 className="text-sm font-bold text-white">Snap & Upload</h4>
                <p className="text-xs text-slate-300">
                  Citizen spots waste in street, snaps a photo, and the platform auto-captures exact GPS location.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-emerald-500/40 shadow-lg shadow-emerald-500/10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-mono font-black flex items-center justify-center text-sm">
                    02
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase font-mono">New Feature</span>
                </div>
                <h4 className="text-sm font-bold text-white">Classify & Severity</h4>
                <p className="text-xs text-slate-300">
                  Select waste type (Plastic, Organic, E-Waste, Debsh, Medical) & severity level (Low, Med, High) to prioritize urgent response.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-400/30">
                    03
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Vision AI</span>
                </div>
                <h4 className="text-sm font-bold text-white">AI Verification</h4>
                <p className="text-xs text-slate-300">
                  AI scans image, cross-checks geo-radius to prevent duplicate tickets, and verifies composition and urgency confidence.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-400/30">
                    04
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Dispatch</span>
                </div>
                <h4 className="text-sm font-bold text-white">Municipal Cleaning</h4>
                <p className="text-xs text-slate-300">
                  Ticket dispatched to CCBA or private contractors with truck navigation coordinates. High severity handled in &lt;12h.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-sm border border-emerald-400/30">
                    05
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Reward</span>
                </div>
                <h4 className="text-sm font-bold text-white">Before/After & Points</h4>
                <p className="text-xs text-slate-300">
                  Cleaned photo uploaded, before/after slider generated, and citizen is rewarded Green Points for transit, groceries & bills.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Transformation Showcase (Before / After Slider) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Verified Transformation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Before & After Community Cleanups
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Drag the interactive slider below to inspect actual street transformations across Egypt.
            </p>
          </div>

          {/* Quick tab switcher for cleanups */}
          <div className="flex flex-wrap gap-2">
            {cleanedReports.map((report, idx) => (
              <button
                key={report.id}
                onClick={() => setActiveSliderIdx(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeSliderIdx === idx
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {report.locationName.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-lg">
          <BeforeAfterSlider
            beforeImage={currentShowcase.photoBefore}
            afterImage={currentShowcase.photoAfter}
            title={currentShowcase.title}
            location={currentShowcase.locationName}
            cleanedDate={currentShowcase.cleanedAt || 'Completed'}
          />

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs text-slate-400 block">Cleaning Contractor</span>
                <span className="text-xs font-bold text-slate-800">{currentShowcase.authority}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Citizen Reward</span>
                <span className="text-xs font-bold text-emerald-600">+{currentShowcase.pointsAwarded} Points Granted</span>
              </div>
              <button
                onClick={() => setActiveTab('report')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <span>Report A Site Near You</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Callout & Egypt 2030 Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full text-emerald-300 border border-white/20">
              Egypt Vision 2030 Sustainability Goal
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Target: Reach 60% Formal Recycling & Zero Open Street Dumps
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Every photo you submit feeds real-time data to municipal operators, helping modernize Egypt’s waste infrastructure and keeping noxious odors, flies, and plastic pollution out of our historic streets and waterways.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActiveTab('report')}
                className="px-6 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 transition-colors"
              >
                Submit A Report Today
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
              >
                View Available Rewards
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
