"use client";
import { useState, useEffect } from "react";
import { isAllowed, setAllowed, getAddress } from "@stellar/freighter-api";

export default function WalletConnect({ onConnect }: { onConnect: (address: string) => void }) {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function checkConnection() {
      if (await isAllowed()) {
        const { address } = await getAddress();
        if (address) {
          setAddress(address);
          onConnect(address);
        }
      }
    }
    checkConnection();
  }, [onConnect]);

  const handleConnect = async () => {
    try {
      const allowed = await setAllowed();
      if (allowed) {
        const { address } = await getAddress();
        if (address) {
          setAddress(address);
          onConnect(address);
        }
      } else {
        setError("User denied access");
      }
    } catch (e) {
      setError("Freighter not found or error connecting");
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col items-end">
      {address ? (
        <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200">
          Connected: {address.slice(0, 4)}...{address.slice(-4)}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Connect Wallet
        </button>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
