import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Filter, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Layers, 
  Eye, 
  ChevronRight,
  Wind,
  Bug,
  Building
} from 'lucide-react';
import { 
  WASTE_TYPES, 
  SEVERITY_LEVELS, 
  EGYPT_GOVERNORATES 
} from '../data/mockData';
import BeforeAfterModal from '../components/BeforeAfterModal';

export default function MapPage({ reports = [], onSelectReport }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Filter States
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL', 'Pending', 'In Progress', 'Cleaned'
  const [severityFilter, setSeverityFilter] = useState('ALL'); // 'ALL', 'High', 'Medium', 'Low'
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedGov, setSelectedGov] = useState('ALL');
  const [activeReport, setActiveReport] = useState(null);
  const [isBeforeAfterOpen, setIsBeforeAfterOpen] = useState(false);

  // Filtered reports
  const filteredReports = reports.filter(r => {
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (severityFilter !== 'ALL' && r.severity !== severityFilter) return false;
    if (typeFilter !== 'ALL' && r.wasteType !== typeFilter) return false;
    if (selectedGov !== 'ALL' && r.governorate !== selectedGov) return false;
    return true;
  });

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Cairo default center [30.0444, 31.2357]
      const map = L.map(mapContainerRef.current, {
        center: [30.0444, 31.2357],
        zoom: 12,
        zoomControl: true,
        scrollWheelZoom: true
      });

      // CartoDB Positron clean map tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>, OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      markersGroupRef.current = markersGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup if component completely unmounts
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers whenever filteredReports change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();

    filteredReports.forEach((report) => {
      // Status Color: Cleaned (Emerald #059669), In Progress (Sky Blue #0284c7), Pending (Amber #f59e0b)
      let markerColor = '#f59e0b'; // Pending
      if (report.status === 'Cleaned') markerColor = '#059669';
      else if (report.status === 'In Progress') markerColor = '#0284c7';

      const isHighSeverity = report.severity === 'High';

      // Custom Leaflet DivIcon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="position: relative; width: 36px; height: 36px; display: flex; items-center: center; justify-content: center;">
            ${isHighSeverity && report.status !== 'Cleaned' ? `
              <div style="
                position: absolute; 
                width: 44px; 
                height: 44px; 
                top: -4px; 
                left: -4px; 
                border-radius: 9999px; 
                background-color: rgba(239, 68, 68, 0.4); 
                animation: urgent-pulse 1.8s infinite;
              "></div>
            ` : ''}
            <div style="
              width: 34px; 
              height: 34px; 
              background-color: ${markerColor}; 
              border: 3px solid white; 
              border-radius: 9999px; 
              box-shadow: 0 4px 10px rgba(0,0,0,0.3); 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              color: white; 
              font-size: 14px; 
              font-weight: bold;
              cursor: pointer;
            ">
              ${report.status === 'Cleaned' ? '✓' : isHighSeverity ? '!' : '●'}
            </div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
      });

      const marker = L.marker([report.lat, report.lng], { icon: customIcon });

      // Rich popup content
      const popupHtml = `
        <div style="font-family: system-ui, sans-serif; min-width: 230px; max-width: 270px; padding: 2px;">
          <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: ${markerColor}; margin-bottom: 2px;">
            ${report.status} • ${report.severity} Priority
          </div>
          <div style="font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1.25; margin-bottom: 4px;">
            ${report.title}
          </div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">
            📍 ${report.locationName}
          </div>
          <div style="font-size: 11px; background: #f8fafc; padding: 6px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #e2e8f0;">
            <div style="font-weight: 600; color: #334155;">Waste: <span style="text-transform: capitalize;">${report.wasteType}</span> (~${report.estimatedKg || 40}kg)</div>
            <div style="color: #64748b; font-size: 10px;">Assigned: ${report.authority || 'Cairo CCBA'}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; font-weight: 700; color: #059669;">
            <span>+${report.pointsAwarded || 100} Points</span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setActiveReport(report);
      });

      markersGroupRef.current.addLayer(marker);
    });

    // Fit bounds if reports exist and we filter
    if (filteredReports.length > 0 && mapInstanceRef.current) {
      const group = new L.featureGroup(markersGroupRef.current.getLayers());
      if (group.getBounds().isValid()) {
        mapInstanceRef.current.fitBounds(group.getBounds(), { padding: [40, 40], maxZoom: 14 });
      }
    }
  }, [filteredReports]);

  // Jump to specific governorate
  const handleGovernorateChange = (govId) => {
    setSelectedGov(govId);
    if (!mapInstanceRef.current) return;

    if (govId === 'ALL') {
      mapInstanceRef.current.setView([30.0444, 31.2357], 11);
    } else {
      const gov = EGYPT_GOVERNORATES.find(g => g.id === govId);
      if (gov) {
        mapInstanceRef.current.setView(gov.center, gov.zoom);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Egypt Live Municipal Dispatch Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Interactive Waste & Cleanup Map
          </h1>
          <p className="text-xs text-slate-500">
            Live geospatial tracking across Cairo, Giza, Alexandria, and Delta governorates
          </p>
        </div>

        {/* Status Count Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pending: <strong>{reports.filter(r => r.status === 'Pending').length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>In Progress: <strong>{reports.filter(r => r.status === 'In Progress').length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Cleaned: <strong>{reports.filter(r => r.status === 'Cleaned').length}</strong></span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-slate-400" /> Status:
            </span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              {['ALL', 'Pending', 'In Progress', 'Cleaned'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-md font-semibold transition-all ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Severity:</span>
            <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
              {['ALL', 'High', 'Medium', 'Low'].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
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

          {/* Waste Type Dropdown */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Waste Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 font-medium"
            >
              <option value="ALL">All Materials</option>
              {WASTE_TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          {/* Governorate Quick Jump */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Governorate:</span>
            <select
              value={selectedGov}
              onChange={(e) => handleGovernorateChange(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 text-xs bg-white text-slate-800 font-medium"
            >
              <option value="ALL">All Egypt Governorates</option>
              {EGYPT_GOVERNORATES.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MAP & SIDEBAR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEAFLET MAP CONTAINER (2 Columns) */}
        <div className="lg:col-span-2 relative h-[560px] rounded-2xl overflow-hidden border border-slate-200 shadow-md">
          <div ref={mapContainerRef} className="w-full h-full" />

          {/* Map Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-lg text-[11px] space-y-1.5">
            <span className="font-bold text-slate-800 block">Map Legend:</span>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white" />
              <span>Cleaned (Before/After Available)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-sky-600 border border-white" />
              <span>In Progress (Truck Dispatched)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-3 h-3 rounded-full bg-amber-500 border border-white" />
              <span>Pending AI / Municipality Review</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600 pt-0.5 border-t border-slate-100">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping inline-block" />
              <span className="font-semibold text-red-700">Urgent / High Hazard Pulse</span>
            </div>
          </div>
        </div>

        {/* SIDEBAR: REPORT INSPECTOR & ACTIVE LIST */}
        <div className="space-y-4 flex flex-col h-[560px]">
          {/* Active / Clicked Report Detail Card */}
          {activeReport ? (
            <div className="bg-white p-5 rounded-2xl border-2 border-emerald-500 shadow-md space-y-3 shrink-0">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  activeReport.status === 'Cleaned'
                    ? 'bg-emerald-100 text-emerald-800'
                    : activeReport.status === 'In Progress'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {activeReport.status}
                </span>

                <span className={`text-xs font-bold ${
                  activeReport.severity === 'High' ? 'text-red-600' : 'text-amber-600'
                }`}>
                  {activeReport.severity} Urgency
                </span>
              </div>

              <div className="flex gap-3">
                <img
                  src={activeReport.photoBefore}
                  alt={activeReport.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    {activeReport.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{activeReport.locationName}</span>
                  </p>
                </div>
              </div>

              {/* Hazard markers */}
              <div className="flex gap-2 text-[11px]">
                {activeReport.badOdor && (
                  <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                    <Wind className="w-3 h-3" /> Foul Odor
                  </span>
                )}
                {activeReport.insectInfestation && (
                  <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 border border-red-200 flex items-center gap-1">
                    <Bug className="w-3 h-3" /> Flies / Pests
                  </span>
                )}
              </div>

              {/* Authority */}
              <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block">Assigned Contractor</span>
                <span className="font-semibold text-slate-800">{activeReport.authority}</span>
              </div>

              {/* Action Button */}
              {activeReport.status === 'Cleaned' ? (
                <button
                  type="button"
                  onClick={() => setIsBeforeAfterOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Inspect Before / After Slider</span>
                </button>
              ) : (
                <div className="text-center py-2 text-xs font-semibold text-slate-500 bg-slate-100 rounded-xl">
                  {activeReport.status === 'In Progress' ? 'Truck en route to location' : 'Queued for municipal cleaning'}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 shrink-0">
              Click on any map pin or select from the list below to inspect report details and Before/After transformation photos.
            </div>
          )}

          {/* Scrollable list of matching reports */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Locations in Filter ({filteredReports.length}):
            </span>

            {filteredReports.map((report) => (
              <div
                key={report.id}
                onClick={() => {
                  setActiveReport(report);
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setView([report.lat, report.lng], 14, { animate: true });
                  }
                }}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-xs ${
                  activeReport?.id === report.id
                    ? 'border-emerald-500 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                    report.status === 'Cleaned' 
                      ? 'bg-emerald-500' 
                      : report.status === 'In Progress' 
                      ? 'bg-sky-500' 
                      : 'bg-amber-500'
                  }`} />
                  <div className="truncate">
                    <div className="font-bold text-slate-800 truncate">{report.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{report.locationName}</div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Before/After Lightbox Modal */}
      {activeReport && (
        <BeforeAfterModal
          isOpen={isBeforeAfterOpen}
          onClose={() => setIsBeforeAfterOpen(false)}
          report={activeReport}
        />
      )}
    </div>
  );
}
