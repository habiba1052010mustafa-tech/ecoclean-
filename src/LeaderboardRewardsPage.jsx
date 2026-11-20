import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  ShoppingBag, 
  Train, 
  Zap, 
  TreePine, 
  Store, 
  Coffee, 
  CheckCircle2, 
  MapPin, 
  ArrowRight,
  Filter,
  Flame,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { 
  REWARDS_CATALOG, 
  LEADERBOARD_USERS, 
  GOVERNORATE_CLEAN_RANKINGS 
} from '../data/mockData';
import RewardModal from '../components/RewardModal';

export default function LeaderboardRewardsPage({ 
  userPoints, 
  onRedeemReward 
}) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedReward, setSelectedReward] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter rewards by category
  const filteredRewards = REWARDS_CATALOG.filter(r => {
    if (selectedCategory === 'ALL') return true;
    return r.category === selectedCategory;
  });

  const handleOpenRedeem = (reward) => {
    setSelectedReward(reward);
    setIsModalOpen(true);
  };

  const handleConfirmRedeem = (reward, code) => {
    if (onRedeemReward) {
      onRedeemReward(reward, code);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-12">
      {/* Top Header & Points Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community Civic Gamification & Rewards</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Leaderboard & Green Rewards Shop
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Compete with fellow citizens to keep Egypt clean and exchange your points for metro passes, groceries, and tree planting.
          </p>
        </div>

        {/* User Balance Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white border border-slate-800 shadow-md flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-mono">
              Your Available Balance
            </span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {userPoints.toLocaleString()} <span className="text-xs text-white">pts</span>
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: CITIZEN LEADERBOARD & GOVERNORATE RANKINGS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* TOP CITIZEN GUARDIANS (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                Egypt National Eco-Guardian Leaderboard
              </h2>
              <p className="text-xs text-slate-500">
                Top citizens ranked by verified cleanups and environmental impact
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              November 2026 Cycle
            </span>
          </div>

          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {/* Rank 2 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-2 order-1">
              <span className="text-xl">🥈</span>
              <img
                src={LEADERBOARD_USERS[1].avatar}
                alt={LEADERBOARD_USERS[1].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block truncate max-w-[90px]">
                  {LEADERBOARD_USERS[1].name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 block">Cairo</span>
              </div>
              <span className="text-xs font-black text-slate-800 font-mono">
                {LEADERBOARD_USERS[1].points} pts
              </span>
            </div>

            {/* Rank 1 (Gold Winner) */}
            <div className="p-4 rounded-xl bg-amber-50/80 border-2 border-amber-300 flex flex-col items-center text-center space-y-2 order-2 -mt-2 shadow-sm">
              <span className="text-2xl">👑 🥇</span>
              <img
                src={LEADERBOARD_USERS[0].avatar}
                alt={LEADERBOARD_USERS[0].name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow"
              />
              <div>
                <span className="text-xs font-bold text-amber-950 block truncate max-w-[100px]">
                  {LEADERBOARD_USERS[0].name}
                </span>
                <span className="text-[10px] text-amber-700 block">Alexandria</span>
              </div>
              <span className="text-xs font-black text-amber-900 font-mono bg-white px-2 py-0.5 rounded-full border border-amber-200">
                {LEADERBOARD_USERS[0].points} pts
              </span>
            </div>

            {/* Rank 3 */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center space-y-2 order-3">
              <span className="text-xl">🥉</span>
              <img
                src={LEADERBOARD_USERS[2].avatar}
                alt={LEADERBOARD_USERS[2].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-600/40"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block truncate max-w-[90px]">
                  {LEADERBOARD_USERS[2].name.split(' ')[0]}
                </span>
                <span className="text-[10px] text-slate-500 block">Giza</span>
              </div>
              <span className="text-xs font-black text-slate-800 font-mono">
                {LEADERBOARD_USERS[2].points} pts
              </span>
            </div>
          </div>

          {/* Table of Ranks 4 to 7 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {LEADERBOARD_USERS.slice(3).map((u) => (
              <div
                key={u.rank}
                className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  u.isUser
                    ? 'border-emerald-500 bg-emerald-50/80 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                    u.isUser ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {u.rank}
                  </span>
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block">{u.name}</span>
                    <span className="text-[11px] text-slate-500">{u.city} • {u.cleanedReports} cleanups</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-500 hidden sm:inline">{u.badge}</span>
                  <span className="font-mono font-black text-emerald-700 text-sm">{u.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GOVERNORATE CLEANLINESS INDEX (1 Col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Governorate Cleanliness Index
              </h3>
              <p className="text-xs text-slate-500">
                Resolution rate & community performance
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {GOVERNORATE_CLEAN_RANKINGS.map((gov, idx) => (
              <div key={gov.governorate} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    {idx + 1}. {gov.governorate}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-semibold">{gov.trend}</span>
                    <span className="font-mono font-bold text-slate-900">{gov.score}%</span>
                  </div>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
                    style={{ width: `${gov.score}%` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{gov.reportsTotal.toLocaleString()} total tickets</span>
                  <span>{gov.resolutionRate} cleaned</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
            <strong className="text-slate-800">City Challenge: </strong>
            Alexandria currently leads Egypt in fast municipal dispatch under 20 hours! Cairo is rising with +14% cleanup resolution.
          </div>
        </div>
      </div>

      {/* SECTION 2: GREEN REWARDS EXCHANGE SHOP */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              Eco-Points Rewards Catalog
            </h2>
            <p className="text-xs text-slate-500">
              Redeem your hard-earned Green Points for transit, groceries, utility deductions, and trees
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
              { id: 'ALL', label: 'All Rewards' },
              { id: 'transit', label: 'Metro & Transit' },
              { id: 'groceries', label: 'Food & Fawry' },
              { id: 'bills', label: 'Utility Bills' },
              { id: 'eco', label: 'Tree Planting & Eco' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* REWARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward) => {
            const canAfford = userPoints >= reward.points;
            return (
              <div
                key={reward.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg">
                      {reward.categoryName}
                    </div>
                    <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-black font-mono px-2.5 py-1 rounded-lg shadow">
                      {reward.points} pts
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-semibold text-slate-400 block">
                      {reward.partner}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {reward.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {reward.originalValue}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenRedeem(reward)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                        canAfford
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105'
                          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      <span>{canAfford ? 'Redeem Voucher' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reward Redemption Modal */}
      <RewardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reward={selectedReward}
        userPoints={userPoints}
        onConfirmRedeem={handleConfirmRedeem}
      />
    </div>
  );
}
