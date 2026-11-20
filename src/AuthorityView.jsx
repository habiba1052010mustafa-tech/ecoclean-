import React, { useState } from 'react';
import { 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  Camera, 
  Upload, 
  ShieldCheck, 
  Building2,
  Filter,
  Check,
  PhoneCall
} from 'lucide-react';
import { EGYPT_AUTHORITIES, SEVERITY_LEVELS } from '../data/mockData';

export default function AuthorityView({ 
  reports = [], 
  onUpdateReportStatus 
}) {
  const [selectedAuthority, setSelectedAuthority] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [inspectingReport, setInspectingReport] = useState(null);
  const [afterPhotoUrl, setAfterPhotoUrl] = useState('https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80');
  const [cleanupNotes, setCleanupNotes] = useState('Area fully cleared by CCBA compaction truck #18. Disinfected with chlorine solution.');

  const filteredReports = reports.filter(r => {
    if (selectedAuthority !== 'ALL' && !r.authority?.toLowerCase().includes(selectedAuthority.toLowerCase())) return false;
    if (severityFilter !== 'ALL' && r.severity !== severityFilter) return false;
    return true;
  });

  const handleStartCleaning = (report) => {
    if (onUpdateReportStatus) {
      onUpdateReportStatus(report.id, 'In Progress', null, 'Cleaning crew dispatched to location with compactor truck.');
    }
  };

  const handleCompleteCleaning = (report) => {
    if (onUpdateReportStatus) {
      onUpdateReportStatus(
        report.id, 
        'Cleaned', 
        afterPhotoUrl, 
        cleanupNotes
      );
    }
    setInspectingReport(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Municipal Dispatch & Contractor Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Cleaning Authority & Dispatch Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Simulate Cairo Cleaning Authority (CCBA) & Nahdet Misr field operations: dispatch compaction trucks, resolve hazardous tickets, and upload verified "After" photos to reward citizens.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center shrink-0">
          <span className="text-[10px] text-slate-300 uppercase block font-mono">Active Queue Tickets</span>
          <span className="text-3xl font-black text-amber-400 font-mono">
            {reports.filter(r => r.status !== 'Cleaned').length}
          </span>
          <span className="text-[11px] text-slate-300 block">Pending Cleanup</span>
        </div>
      </div>

      {/* Authority & Severity Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Filter By Authority:</span>
          <select
            value={selectedAuthority}
            onChange={(e) => setSelectedAuthority(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-medium"
          >
            <option value="ALL">All Egyptian Authorities</option>
            <option value="cairo">Cairo Cleaning Authority (CCBA)</option>
            <option value="giza">Giza Hygiene Agency</option>
            <option value="nahdet">Nahdet Misr (Alexandria)</option>
            <option value="waste">Ministry of Environment (WMRA)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700">Filter Severity:</span>
          <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
            {['ALL', 'High', 'Medium', 'Low'].map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  severityFilter === sev
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DISPATCH TICKETS QUEUE */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Incoming Street Waste Dispatch Queue ({filteredReports.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between space-y-4 transition-all ${
                report.severity === 'High' && report.status !== 'Cleaned'
                  ? 'border-2 border-red-400 bg-red-50/20 shadow-red-100'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    report.status === 'Cleaned'
                      ? 'bg-emerald-100 text-emerald-800'
                      : report.status === 'In Progress'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {report.status}
                  </span>

                  <span className={`text-xs font-bold font-mono ${
                    report.severity === 'High' ? 'text-red-600' : 'text-amber-600'
                  }`}>
                    {report.severity} Priority
                  </span>
                </div>

                {/* Photo & title */}
                <div className="flex gap-3">
                  <img
                    src={report.photoBefore}
                    alt={report.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div>
                    <span className="font-mono text-[10px] text-slate-400 block">{report.id}</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{report.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{report.locationName}</p>
                  </div>
                </div>

                <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Material:</span>
                    <span className="font-bold text-slate-800 capitalize">{report.wasteType} (~{report.estimatedKg}kg)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned:</span>
                    <span className="font-semibold text-slate-700 truncate max-w-[150px]">{report.authority}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                {report.status === 'Pending' && (
                  <button
                    type="button"
                    onClick={() => handleStartCleaning(report)}
                    className="w-full py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>Dispatch Cleaning Crew (In Progress)</span>
                  </button>
                )}

                {report.status === 'In Progress' && (
                  <button
                    type="button"
                    onClick={() => setInspectingReport(report)}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload "After" Photo & Complete</span>
                  </button>
                )}

                {report.status === 'Cleaned' && (
                  <div className="py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Cleaned & Points Awarded</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD AFTER PHOTO MODAL */}
      {inspectingReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden space-y-5 p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Complete Cleanup & Upload "After" Photo
              </h3>
              <button
                onClick={() => setInspectingReport(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-600 block mb-1">Target Ticket:</span>
                <span className="font-bold text-slate-900">{inspectingReport.title}</span>
                <span className="block text-slate-500">{inspectingReport.locationName}</span>
              </div>

              {/* After Photo Preview */}
              <div>
                <span className="font-bold text-slate-700 block mb-1">
                  Cleaned Site Photo ("After" Evidence):
                </span>
                <div className="relative h-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img
                    src={afterPhotoUrl}
                    alt="After cleanup"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    Verified Clean
                  </div>
                </div>
              </div>

              {/* Sample After Photo Presets */}
              <div className="flex gap-2">
                {[
                  { label: 'Clean Sidewalk', url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80' },
                  { label: 'Paved Road', url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80' },
                  { label: 'Green Lawn', url: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80' }
                ].map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAfterPhotoUrl(sample.url)}
                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition-all ${
                      afterPhotoUrl === sample.url
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Cleaning Authority Field Report Notes:
                </label>
                <textarea
                  rows={2}
                  value={cleanupNotes}
                  onChange={(e) => setCleanupNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center justify-between">
                <span>Citizen Reward To Issue:</span>
                <strong className="font-mono text-emerald-700">+{inspectingReport.pointsAwarded} Green Points</strong>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setInspectingReport(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleCompleteCleaning(inspectingReport)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Verify & Award Citizen Points</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
