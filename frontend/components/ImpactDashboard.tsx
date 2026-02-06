"use client";
import { useEffect, useState } from "react";

export default function ImpactDashboard({ walletAddress }: { walletAddress: string }) {
    const [certificate, setCertificate] = useState("None");
    const [loading, setLoading] = useState(false);
    const [totalDonation, setTotalDonation] = useState(0);

    useEffect(() => {
        const updateFromStorage = () => {
            const total = parseInt(localStorage.getItem("greenFi_totalDonation") || "0");
            setTotalDonation(total);

            if (total >= 100) {
                setCertificate("GOLD");
            } else if (total > 0) {
                setCertificate("STANDARD");
            } else {
                setCertificate("NONE");
            }
        };

        if (walletAddress) {
            setLoading(true);
            setTimeout(() => {
                updateFromStorage();
                setLoading(false);
            }, 800);
        }

        window.addEventListener("donationUpdated", updateFromStorage);
        return () => {
            window.removeEventListener("donationUpdated", updateFromStorage);
        };
    }, [walletAddress]);

    return (
        <div className="grid grid-cols-2 gap-4 w-full">
            {/* Stat Card 1 */}
            <div className="p-4 rounded-xl border border-emerald-900/30 bg-[#020617]/50 hover:bg-[#020617]/80 transition-colors group">
                <h4 className="text-emerald-500/60 text-xs font-mono uppercase mb-2">Total Carbon Offset</h4>
                <div className="text-2xl font-bold text-white font-mono grup-hover:text-emerald-400 transition-colors">
                    0.00 <span className="text-sm text-emerald-600">tCO2e</span>
                </div>
            </div>

            {/* Stat Card 2 - Certificate */}
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-900/10 hover:bg-emerald-900/20 transition-colors relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-20">
                    <svg className="w-8 h-8 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <h4 className="text-emerald-500/60 text-xs font-mono uppercase mb-2">Certificate Tier</h4>
                <div className={`text-xl font-bold font-mono tracking-wider ${certificate === 'GOLD' ? 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]' : 'text-emerald-400'}`}>
                    {certificate}
                </div>
                <div className="w-full bg-emerald-900/30 h-1 mt-3 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 transition-all duration-1000"
                        style={{ width: certificate === 'GOLD' ? '100%' : certificate === 'STANDARD' ? '50%' : '5%' }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
