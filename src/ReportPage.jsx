import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Flame, 
  Bug, 
  Wind, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck,
  Building,
  Image as ImageIcon,
  Check,
  RefreshCw
} from 'lucide-react';
import { 
  WASTE_TYPES, 
  SEVERITY_LEVELS, 
  EGYPT_GOVERNORATES, 
  EGYPT_AUTHORITIES, 
  SAMPLE_PRESET_IMAGES 
} from '../data/mockData';
import AIVerificationModal from '../components/AIVerificationModal';

export default function ReportPage({ onSubmitReport, setActiveTab }) {
  // Form State
  const [photoPreview, setPhotoPreview] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wasteType, setWasteType] = useState('plastic');
  const [severityLevel, setSeverityLevel] = useState('Medium'); // 'Low', 'Medium', 'High'
  const [governorate, setGovernorate] = useState('cairo');
  const [locationName, setLocationName] = useState('Nasr City, Makram Ebeid St., Cairo');
  const [lat, setLat] = useState(30.0626);
  const [lng, setLng] = useState(31.3415);
  const [hasOdor, setHasOdor] = useState(true);
  const [hasInsects, setHasInsects] = useState(true);
  const [blocksTraffic, setBlocksTraffic] = useState(false);
  const [nearSensitiveZone, setNearSensitiveZone] = useState(false);
  const [reporterName, setReporterName] = useState('Kareem Taha');
  const [reporterPhone, setReporterPhone] = useState('+20 100 234 5678');

  // AI Verification State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiVerified, setAiVerified] = useState(false);
  const [aiConfidence, setAiConfidence] = useState(null);
  const [aiTags, setAiTags] = useState([]);
  const [estimatedKg, setEstimatedKg] = useState(45);

  // Success Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdReport, setCreatedReport] = useState(null);

  // Handle Preset Image Selection
  const handleSelectPreset = (preset) => {
    setPhotoPreview(preset.url);
    setWasteType(preset.type);
    setSeverityLevel(preset.severity);
    setGovernorate(preset.governorate);
    setLocationName(preset.locationName);
    setLat(preset.lat);
    setLng(preset.lng);
    setHasOdor(preset.odor);
    setHasInsects(preset.insects);
    setEstimatedKg(preset.estimatedWeightKg);
    setTitle(`${preset.title}`);
    setDescription(`Excessive garbage accumulation observed at ${preset.locationName}. Requires prompt municipal collection and sanitization.`);
    setAiVerified(false);
  };

  // Handle File Upload from device
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setAiVerified(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle AI Verification Results
  const handleApplyAiRecommendations = (aiResult) => {
    setWasteType(aiResult.primaryType);
    setSeverityLevel(aiResult.recommendedSeverity);
    setHasOdor(aiResult.odorRisk);
    setHasInsects(aiResult.insectRisk);
    setEstimatedKg(aiResult.estimatedWeightKg);
    setAiTags(aiResult.tags);
    setAiConfidence(95);
    setAiVerified(true);
  };

  // Calculate Points
  const selectedSeverity = SEVERITY_LEVELS.find(s => s.level === severityLevel) || SEVERITY_LEVELS[1];
  const totalPotentialPoints = selectedSeverity.points + (aiVerified ? 25 : 0);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedGov = EGYPT_GOVERNORATES.find(g => g.id === governorate);
    let assignedAuthority = 'Cairo Cleaning & Beautification Authority (CCBA)';
    if (governorate === 'alexandria') assignedAuthority = 'Nahdet Misr Environmental Services (Alexandria)';
    else if (governorate === 'giza') assignedAuthority = 'Giza Hygiene & Cleanliness Agency';
    else if (severityLevel === 'High' && wasteType === 'hazardous') assignedAuthority = 'Waste Management Regulatory Authority (WMRA)';

    const newReport = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: title || `${wasteType.toUpperCase()} Waste Pile at ${locationName.split(',')[0]}`,
      description: description || `Reported ${wasteType} accumulation with ${severityLevel.toLowerCase()} severity level.`,
      wasteType,
      severity: severityLevel,
      status: 'Pending',
      locationName,
      governorate,
      lat: Number(lat),
      lng: Number(lng),
      photoBefore: photoPreview,
      photoAfter: null,
      reportedBy: reporterName,
      userId: 'current-user',
      timestamp: 'Just now',
      date: new Date().toISOString().split('T')[0],
      authority: assignedAuthority,
      authorityNotes: 'Ticket queued for priority team dispatch.',
      pointsAwarded: totalPotentialPoints,
      badOdor: hasOdor,
      insectInfestation: hasInsects,
      aiConfidence: aiVerified ? aiConfidence || 94 : null,
      aiTags: aiTags.length ? aiTags : [`Visual match: ${wasteType}`],
      estimatedKg: Number(estimatedKg) || 50
    };

    setCreatedReport(newReport);
    setIsSubmitted(true);
    if (onSubmitReport) {
      onSubmitReport(newReport);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Interactive Waste Reporting & AI Classification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Report Street Garbage & Hazardous Waste
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Upload photo, classify waste type & severity, run automated duplicate verification, and help Egyptian cleaning authorities prioritize rapid response.
        </p>
      </div>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1: PHOTO UPLOAD & PRESET SAMPLES */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Garbage Site Photo
                  </h3>
                  <p className="text-xs text-slate-500">
                    Take a clear photo showing the pile and surrounding street context
                  </p>
                </div>
              </div>

              {/* AI Verification Scan Trigger */}
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-md hover:shadow-emerald-600/25 transition-all"
              >
                <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
                <span>Run AI Verification Scan</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">+25 pts</span>
              </button>
            </div>

            {/* Photo preview + Upload Dropzone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Main Photo Box */}
              <div className="md:col-span-2 relative h-64 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center group hover:border-emerald-500 transition-colors">
                {photoPreview ? (
                  <>
                    <img
                      src={photoPreview}
                      alt="Garbage preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <label className="cursor-pointer px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg hover:bg-slate-100 flex items-center gap-1.5">
                        <Camera className="w-4 h-4" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>

                    {aiVerified && (
                      <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-semibold px-3 py-1 rounded-lg border border-emerald-400 flex items-center gap-1.5 backdrop-blur-md">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>AI Verified ({aiConfidence}%) • No Duplicates Found</span>
                      </div>
                    )}
                  </>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center justify-center p-6 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Upload className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-slate-700">Click to upload or drag image here</span>
                    <span className="text-xs text-slate-400">Supports JPG, PNG, WEBP (Max 10MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                )}
              </div>

              {/* Sample Preset Selector */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Or Test With Egyptian Presets:
                </span>
                <div className="space-y-2">
                  {SAMPLE_PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-center gap-2.5 ${
                        photoPreview === preset.url
                          ? 'border-emerald-500 bg-emerald-50/70 text-slate-900 font-bold'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <div className="truncate font-semibold">{preset.title}</div>
                        <div className="text-[10px] text-slate-400 capitalize">
                          {preset.type} • {preset.severity} Severity
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: NEW FEATURE - WASTE CLASSIFICATION & SEVERITY LEVEL */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Waste Classification & Severity Level
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Core New Feature
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Categorize the primary material and define urgency so cleaning authorities dispatch appropriate trucks
                </p>
              </div>
            </div>

            {/* Waste Type Cards */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Primary Waste Material Category:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {WASTE_TYPES.map((type) => {
                  const isSelected = wasteType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setWasteType(type.id)}
                      className={`relative p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                        isSelected
                          ? 'border-2 border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: type.color }}
                        >
                          {type.name.charAt(0)}
                        </span>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          {type.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {type.nameAr}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 line-clamp-2">
                        {type.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Severity Level Interactive Selector */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Severity Level (Urgency of Cleanup):
                </label>
                <span className="text-xs text-slate-500">
                  Higher severity prioritizes dispatch and awards more Green Points
                </span>
              </div>

              {/* 3 Interactive Cards / Radio options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SEVERITY_LEVELS.map((sev) => {
                  const isSelected = severityLevel === sev.level;
                  return (
                    <div
                      key={sev.level}
                      onClick={() => setSeverityLevel(sev.level)}
                      className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'shadow-md scale-[1.01]'
                          : 'border-slate-200 bg-white hover:border-slate-300 opacity-80'
                      }`}
                      style={{
                        borderColor: isSelected ? sev.color : undefined,
                        backgroundColor: isSelected ? sev.bgColor : undefined
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: sev.color }}
                          />
                          <span className="text-sm font-extrabold text-slate-900">
                            {sev.level} Urgency ({sev.levelAr})
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-white/90 shadow-sm border border-slate-200 text-slate-800">
                          +{sev.points} pts
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed">
                        {sev.description}
                      </p>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-slate-600">{sev.timeframe}</span>
                        <span className="text-xs" style={{ color: sev.color }}>
                          {sev.badge}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Environmental Hazard Factors Checkboxes */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Environmental & Health Factors (Select all that apply):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={hasOdor}
                      onChange={(e) => setHasOdor(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-slate-800 font-medium">
                      <Wind className="w-3.5 h-3.5 text-amber-600" />
                      Foul / Bad Odor
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={hasInsects}
                      onChange={(e) => setHasInsects(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-slate-800 font-medium">
                      <Bug className="w-3.5 h-3.5 text-red-600" />
                      Flies / Insect Swarm
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={blocksTraffic}
                      onChange={(e) => setBlocksTraffic(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-slate-800 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5 text-orange-600" />
                      Blocks Sidewalk / Road
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={nearSensitiveZone}
                      onChange={(e) => setNearSensitiveZone(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span className="flex items-center gap-1 text-slate-800 font-medium">
                      <Building className="w-3.5 h-3.5 text-blue-600" />
                      Near School / Hospital / Canal
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: EXACT LOCATION & EGYPT GOVERNORATE */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <span className="w-7 h-7 rounded-full bg-slate-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Location & Municipal Routing
                </h3>
                <p className="text-xs text-slate-500">
                  Pinpoint the street location in Egypt to route tickets to the correct local authority
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Governorate (المحافظة):
                </label>
                <select
                  value={governorate}
                  onChange={(e) => {
                    const val = e.target.value;
                    setGovernorate(val);
                    const gov = EGYPT_GOVERNORATES.find(g => g.id === val);
                    if (gov) {
                      setLat(gov.center[0]);
                      setLng(gov.center[1]);
                      setLocationName(`${gov.name.split(' ')[0]} City Center`);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {EGYPT_GOVERNORATES.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Street Address & Landmark:
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    required
                    placeholder="e.g. Makram Ebeid St., Near Citystars Mall"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* GPS Coordinates & Map Pin Indicator */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  📍
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block">GPS Coordinates:</span>
                  <span className="font-mono text-slate-500">
                    Latitude: {lat.toFixed(4)} • Longitude: {lng.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          setLat(pos.coords.latitude);
                          setLng(pos.coords.longitude);
                          setLocationName(`Current GPS Pin (${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)})`);
                        },
                        () => alert('Could not access device GPS. Defaulting to Cairo center.')
                      );
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
                >
                  Detect My Location
                </button>
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Brief Summary / Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Waste pile blocking Nasr City sidewalk"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Detailed Notes for Cleanup Crew:
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention if sharp debris is present, or if special equipment like loaders or disinfectant trucks are needed."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>
          </div>

          {/* SUBMISSION BAR */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-slate-300 uppercase font-mono tracking-wider block">
                  Reward You Will Earn Upon Cleanup:
                </span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  +{totalPotentialPoints} Green Points
                </span>
                <span className="text-xs text-slate-400 block">
                  ({selectedSeverity.points} pts for {severityLevel} severity {aiVerified ? '+ 25 AI bonus' : ''})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>Submit Waste Report</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* SUCCESS CONFIRMATION SCREEN */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Report Successfully Dispatched
            </span>
            <h2 className="text-2xl font-black text-slate-900">
              Thank You, Citizen Guardian!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your report ticket <strong className="font-mono text-slate-900">{createdReport?.id}</strong> has been logged in the national database and transmitted to <strong>{createdReport?.authority}</strong>.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Location:</span>
              <span className="font-bold text-slate-800">{createdReport?.locationName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Waste Classification:</span>
              <span className="font-bold text-slate-800 capitalize">{createdReport?.wasteType}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Severity Level:</span>
              <span className="font-bold text-emerald-700">{createdReport?.severity} Urgency</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Pending Green Points:</span>
              <span className="font-bold text-emerald-600 font-mono">+{createdReport?.pointsAwarded} pts (Credited upon cleanup)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('map')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Track On Live Map</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>View In My Dashboard</span>
            </button>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setCreatedReport(null);
                setAiVerified(false);
              }}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
            >
              Report Another Location
            </button>
          </div>
        </div>
      )}

      {/* AI Verification Scan Lightbox Modal */}
      <AIVerificationModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        imageSrc={photoPreview}
        onApplyRecommendations={handleApplyAiRecommendations}
      />
    </div>
  );
}
