import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Recycle,
  TreePine,
  Layers,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { INITIAL_USER, SEVERITY_LEVELS } from '../data/mockData';
import BeforeAfterModal from '../components/BeforeAfterModal';

export default function DashboardPage({ 
  user = INITIAL_USER, 
  reports = [], 
  redeemedVouchers = [],
  setActiveTab 
}) {
  const [reportFilter, setReportFilter] = useState('ALL');
  const [selectedReportForModal, setSelectedReportForModal] = useState(null);

  // User's own reports (matching current-user)
  const myReports = reports.filter(r => r.userId === 'current-user');
  
  const displayedReports = myReports.filter(r => {
    if (reportFilter === 'ALL') return true;
    return r.status === reportFilter;
  });

  const cleanedCount = myReports.filter(r => r.status === 'Cleaned').length;
  const inProgressCount = myReports.filter(r => r.status === 'In Progress').length;
  const pendingCount = myReports.filter(r => r.status === 'Pending').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-10">
      {/* USER PROFILE HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-xs">
                ⭐
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-black text-white">{user.name}</h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Citizen Guardian • Cairo & Giza Municipal Sector
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400 justify-center sm:justify-start">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Cairo, Egypt</span>
                <span>•</span>
                <span>Member since Oct 2026</span>
              </div>
            </div>
          </div>

          {/* Points & Rewards Fast Action */}
          <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center sm:text-right w-full sm:w-auto">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider block font-medium">
                Current Balance
              </span>
              <div className="flex items-center gap-2 justify-center sm:justify-end">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {user.points.toLocaleString()}
                </span>
                <span className="text-xs text-slate-300 font-bold">pts</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                550 pts until Platinum Guardian Tier
              </span>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('rewards')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>Spend Points</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center justify-center gap-1.5"
              >
                <span>Report New Site</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <div className="flex justify-between text-xs text-slate-300 mb-1.5">
            <span className="font-semibold text-emerald-300">Level: Gold Guardian</span>
            <span className="font-mono">{user.points} / {user.nextTierPoints} pts (72%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" style={{ width: '72%' }} />
          </div>
        </div>
      </div>

      {/* METRICS & IMPACT COUNTERS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Reports Submitted
          </span>
          <span className="text-2xl font-black text-slate-900 font-mono">{myReports.length}</span>
          <span className="text-xs text-slate-500 block">Across Cairo & Giza</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Cleanups Completed
          </span>
          <span className="text-2xl font-black text-emerald-600 font-mono">{cleanedCount}</span>
          <span className="text-xs text-emerald-700 block">100% verified with photos</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Waste Diverted
          </span>
          <span className="text-2xl font-black text-teal-600 font-mono">~{user.totalWasteCleanedKg} kg</span>
          <span className="text-xs text-slate-500 block">Prevented from street piles</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            CO2 / Methane Avoided
          </span>
          <span className="text-2xl font-black text-blue-600 font-mono">{user.co2OffsetKg} kg</span>
          <span className="text-xs text-slate-500 block">Equivalent to 24 planted trees</span>
        </div>
      </div>

      {/* BADGES EARNED */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-bold text-slate-900">
              Community Guardian Badges ({user.badges.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">Unlocked 4 of 10 achievements</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3.5"
            >
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold shrink-0 shadow-sm"
                style={{ backgroundColor: badge.color }}
              >
                🏅
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-slate-900 block truncate">{badge.name}</span>
                <span className="text-[11px] text-slate-500 block leading-tight">{badge.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMITTED REPORTS & LIFECYCLE TIMELINE TRACKER */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              My Submitted Waste Reports ({myReports.length})
            </h3>
            <p className="text-xs text-slate-500">
              Live progression from citizen upload, AI verification, municipal crew dispatch, to verified cleanups
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {['ALL', 'Cleaned', 'In Progress', 'Pending'].map((st) => (
              <button
                key={st}
                onClick={() => setReportFilter(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  reportFilter === st
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {displayedReports.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <Recycle className="w-10 h-10 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">No reports found in this filter.</p>
            <button
              onClick={() => setActiveTab('report')}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md"
            >
              Submit Your First Report
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-white shadow-sm space-y-4"
              >
                {/* Top Row: Meta info & Status Pill */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {report.id}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{report.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      report.status === 'Cleaned'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : report.status === 'In Progress'
                        ? 'bg-sky-100 text-sky-800 border border-sky-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {report.status}
                    </span>
                    <span className="text-xs text-slate-400">{report.timestamp}</span>
                  </div>
                </div>

                {/* Middle details: thumbnail + info + action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={report.photoBefore}
                      alt={report.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{report.locationName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <span className="capitalize font-semibold text-slate-700">{report.wasteType}</span>
                        <span>•</span>
                        <span>{report.severity} Severity</span>
                        <span>•</span>
                        <span>~{report.estimatedKg} kg</span>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Assigned to: <strong className="text-slate-700">{report.authority}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Cleaned Before/After CTA */}
                  {report.status === 'Cleaned' && (
                    <div className="flex flex-col sm:items-end gap-1.5 w-full sm:w-auto">
                      <span className="text-xs font-bold text-emerald-600">
                        +{report.pointsAwarded} Green Points Awarded
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedReportForModal(report)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View Before / After Photo</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* VISUAL 4-STAGE LIFECYCLE TIMELINE */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-2">
                    <span className="text-emerald-700">1. Citizen Reported</span>
                    <span className="text-emerald-700">2. AI Verified</span>
                    <span className={report.status !== 'Pending' ? 'text-emerald-700' : 'text-slate-400'}>
                      3. Dispatched to Cleaning Authority
                    </span>
                    <span className={report.status === 'Cleaned' ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                      4. Cleaned & Rewarded
                    </span>
                  </div>

                  {/* Step Progress Line */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-emerald-500 w-1/4" />
                    <div className="h-full bg-emerald-500 w-1/4" />
                    <div className={`h-full ${report.status !== 'Pending' ? 'bg-emerald-500' : 'bg-slate-200'} w-1/4`} />
                    <div className={`h-full ${report.status === 'Cleaned' ? 'bg-emerald-500' : 'bg-slate-200'} w-1/4`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ACTIVE REDEEMED VOUCHERS BOX */}
      {redeemedVouchers.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              My Active Vouchers & Rewards ({redeemedVouchers.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redeemedVouchers.map((v, i) => (
              <div key={i} className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{v.reward.title}</h5>
                  <p className="text-[11px] font-mono text-emerald-800 font-bold mt-1">
                    Code: {v.code}
                  </p>
                  <span className="text-[10px] text-slate-500">Valid for 60 days</span>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                  Ready to Use
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Before/After Lightbox Modal */}
      {selectedReportForModal && (
        <BeforeAfterModal
          isOpen={Boolean(selectedReportForModal)}
          onClose={() => setSelectedReportForModal(null)}
          report={selectedReportForModal}
        />
      )}
    </div>
  );
}
