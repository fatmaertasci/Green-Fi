"use client";
import { useState } from "react";

export default function DonationForm({ walletAddress }: { walletAddress: string }) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    const handleDonate = async () => {
        if (!walletAddress) {
            setStatus("ACCESS DENIED: CONNECT WALLET");
            return;
        }
        setLoading(true);
        setStatus("INITIALIZING PROTOCOL...");

        try {
            // Simulate Network Delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            setStatus("EXECUTING CONTRACT...");
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock Success Logic
            const currentTotal = parseInt(localStorage.getItem("greenFi_totalDonation") || "0");
            const donationAmount = parseInt(amount) || 0;
            const newTotal = currentTotal + donationAmount;

            localStorage.setItem("greenFi_totalDonation", newTotal.toString());

            // Dispatch event to update Dashboard immediately
            window.dispatchEvent(new Event("donationUpdated"));

            setStatus("TRANSACTION CONFIRMED");
            setAmount("");

        } catch (e: any) {
            console.error(e);
            setStatus("ERROR: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel p-8 rounded-xl w-full max-w-md mx-auto relative overflow-hidden group">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>

            <h2 className="text-xl font-bold text-white mb-6 font-mono tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                INITIATE TRANSFER
            </h2>

            <div className="mb-8 relative">
                <label className="block text-emerald-500/70 text-xs font-mono mb-2 uppercase tracking-widest">
                    Amount (Stroops)
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Only allow positive numbers
                            if (value === "" || parseFloat(value) >= 0) {
                                setAmount(value);
                            }
                        }}
                        className="w-full bg-[#020617]/50 border border-emerald-900/50 text-emerald-100 px-4 py-4 rounded-lg focus:outline-none input-glow font-mono text-lg transition-all"
                        placeholder="0.00"
                    />
                    <span className="absolute right-4 top-4 text-emerald-600 font-bold font-mono">XLM</span>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-emerald-500/40 font-mono">
                    <span>MIN: 1 XLM</span>
                    <span>RATE: 1:1</span>
                </div>
            </div>

            <button
                onClick={handleDonate}
                disabled={loading}
                className={`w-full py-4 rounded-lg font-bold text-sm tracking-widest uppercase transition-all relative overflow-hidden group/btn ${loading
                    ? "bg-emerald-900/30 text-emerald-500/50 cursor-wait border border-emerald-900/30"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-500"
                    }`}
            >
                {loading ? (
                    <span className="animate-pulse">PROCESSING...</span>
                ) : (
                    <span className="relative z-10">CONFIRM TRANSACTION</span>
                )}
            </button>

            {status && (
                <div className={`mt-6 p-3 rounded text-xs font-mono border-l-2 ${status.includes("CONFIRMED")
                    ? "bg-emerald-900/20 border-emerald-500 text-emerald-400"
                    : "bg-red-900/20 border-red-500 text-red-400"
                    }`}>
                    {">"} {status}
                </div>
            )}
        </div>
    );
}
