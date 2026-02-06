"use client";
import { useState } from "react";
import DonationForm from "../components/DonationForm";
import ImpactDashboard from "../components/ImpactDashboard";
import WalletConnect from "../components/WalletConnect";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500 selection:text-white overflow-x-hidden">

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 border-b border-emerald-900/30 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 relative">
              <img src="/logo.png" alt="logo" className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all group-hover:scale-110" />
            </div>
            <span className="text-2xl font-bold tracking-tighter neon-text">Green-Fi</span>
          </div>
          <WalletConnect onConnect={setWalletAddress} />
        </div>
      </nav>

      {/* Main Split Layout */}
      <div className="pt-20 min-h-screen grid lg:grid-cols-2">

        {/* Left: Hero & Marketing */}
        <div className="relative flex flex-col justify-center px-8 lg:px-20 py-20 border-r border-emerald-900/30 animate-scanline">
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,59,0.2),transparent_70%)] -z-10"></div>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-900/20 text-emerald-400 text-xs font-mono tracking-widest uppercase">
              System Online /// V2.0
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            CARBON <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">OFFSET</span> <br />
            PROTOCOL
          </h1>

          <p className="text-slate-400 text-lg max-w-lg mb-12 border-l-2 border-emerald-500/50 pl-6 leading-relaxed">
            De-centralized sustainability infrastructure. Execute secure XLM transactions to capture carbon credits on the Stellar Futurenet.
            <br /><span className="text-emerald-500 animate-pulse">Waiting for input...</span>
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-sm">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-colors">
              <div className="text-3xl font-bold text-white mb-1">1.2K+</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Nodes Active</div>
            </div>
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-emerald-500/50 transition-colors">
              <div className="text-3xl font-bold text-emerald-400 mb-1">$45K</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Vol. Traded</div>
            </div>
          </div>
        </div>

        {/* Right: Application Interface */}
        <div className="relative flex flex-col items-center justify-center p-6 lg:p-20 bg-gradient-to-b from-[#020617] to-[#041a13]">
          <div className="w-full max-w-xl space-y-12">

            {/* Form Section */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <DonationForm walletAddress={walletAddress} />
            </div>

            {/* Dashboard Section */}
            <div className="border-t border-slate-800 pt-12">
              <h3 className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-6 text-center">Live Impact Data</h3>
              <ImpactDashboard walletAddress={walletAddress} />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
