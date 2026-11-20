import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import MapPage from './pages/MapPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardRewardsPage from './pages/LeaderboardRewardsPage';
import AuthorityView from './pages/AuthorityView';

import { INITIAL_REPORTS, INITIAL_USER } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  // Persistent Reports State
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoclean_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  // Persistent User Profile State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoclean_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  // Persistent Redeemed Vouchers State
  const [redeemedVouchers, setRedeemedVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('ecoclean_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ecoclean_reports', JSON.stringify(reports));
    } catch (e) {
      console.warn('Failed to save reports to localStorage', e);
    }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('ecoclean_user', JSON.stringify(user));
    } catch (e) {
      console.warn('Failed to save user to localStorage', e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('ecoclean_vouchers', JSON.stringify(redeemedVouchers));
    } catch (e) {
      console.warn('Failed to save vouchers to localStorage', e);
    }
  }, [redeemedVouchers]);

  // Handler: New Report Submitted by Citizen
  const handleReportSubmit = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
    // increment submitted reports counter
    setUser((prev) => ({
      ...prev,
      reportsSubmitted: prev.reportsSubmitted + 1
    }));
  };

  // Handler: Authority updates report status (e.g. In Progress, or Cleaned with After Photo)
  const handleUpdateReportStatus = (reportId, newStatus, afterPhoto = null, authorityNotes = null) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          const updated = {
            ...r,
            status: newStatus,
            photoAfter: afterPhoto || r.photoAfter,
            authorityNotes: authorityNotes || r.authorityNotes,
            cleanedAt: newStatus === 'Cleaned' ? 'Just now by cleaning crew' : r.cleanedAt
          };

          // If transitioning to Cleaned, award points to user
          if (newStatus === 'Cleaned' && r.status !== 'Cleaned') {
            const pointsToAward = r.pointsAwarded || 150;
            const massKg = r.estimatedKg || 40;
            setUser((curr) => ({
              ...curr,
              points: curr.points + pointsToAward,
              reportsCleaned: curr.reportsCleaned + 1,
              totalWasteCleanedKg: curr.totalWasteCleanedKg + massKg,
              co2OffsetKg: curr.co2OffsetKg + Math.round(massKg * 1.5)
            }));
          }

          return updated;
        }
        return r;
      })
    );
  };

  // Handler: User Redeems a Reward Voucher
  const handleRedeemReward = (reward, voucherCode) => {
    setUser((prev) => ({
      ...prev,
      points: Math.max(0, prev.points - reward.points)
    }));

    setRedeemedVouchers((prev) => [
      {
        reward,
        code: voucherCode,
        redeemedAt: new Date().toLocaleDateString()
      },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userPoints={user.points}
        reportsCount={reports.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            reports={reports}
          />
        )}

        {activeTab === 'report' && (
          <ReportPage
            onSubmitReport={handleReportSubmit}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'map' && (
          <MapPage
            reports={reports}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardPage
            user={user}
            reports={reports}
            redeemedVouchers={redeemedVouchers}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'rewards' && (
          <LeaderboardRewardsPage
            userPoints={user.points}
            onRedeemReward={handleRedeemReward}
          />
        )}

        {activeTab === 'authority' && (
          <AuthorityView
            reports={reports}
            onUpdateReportStatus={handleUpdateReportStatus}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
