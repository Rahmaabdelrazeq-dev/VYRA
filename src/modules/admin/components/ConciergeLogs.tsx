import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Filter,
  ShieldCheck,
  User,
  Bot,
  Loader2,
} from "lucide-react";

// Mock data reflecting the bespoke fragrance consultations
const consultationData = [
  {
    id: 1,
    user: "Anonymous",
    query: "I need a scent for a summer wedding in Italy.",
    response:
      "I suggest 'Azure Bloom'. Its citrus top notes and jasmine heart perfectly complement the Mediterranean breeze.",
    time: "2 mins ago",
    status: "Success",
  },
  {
    id: 2,
    user: "Sarah J.",
    query: "Do you have anything that smells like rain?",
    response:
      "Our 'Petrichor Mist' captures that exact earthy, fresh essence using damp earth accords and mineral notes.",
    time: "15 mins ago",
    status: "Success",
  },
  {
    id: 3,
    user: "Mark R.",
    query: "What is the strongest men's perfume?",
    response:
      "For maximum sillage, I recommend 'Oud Maximus' from our Intense line, featuring deep resinous base notes.",
    time: "1 hour ago",
    status: "Flagged",
  },
];

const ConciergeLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isRetrieving, setIsRetrieving] = useState(true);

  useEffect(() => {
    // Elegant entry delay to match luxury branding
    const timer = setTimeout(() => setIsRetrieving(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredLogs = consultationData.filter(
    (log) =>
      log.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.response.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isRetrieving) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-neutral-200" size={32} />
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          Accessing Olfactory Archives...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-2">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-light italic text-black">
            Concierge Intelligence
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">
            Bespoke Dialogue History
          </p>
        </div>

        <div className="flex space-x-3">
          <div className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors"
              size={14}
            />
            <input
              value={searchTerm}
              placeholder="Search consultations..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none focus:border-black transition-all w-64"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-gray-100 rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 border border-neutral-100">
                    <User size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{log.user}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                      {log.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border ${
                    log.status === "Success"
                      ? "border-emerald-100 text-emerald-600 bg-emerald-50/20"
                      : "border-rose-100 text-rose-500 bg-rose-50/20"
                  }`}
                >
                  {log.status}
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex space-x-5 pl-2">
                  <div className="mt-1 text-neutral-300">
                    <MessageSquare size={16} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm text-neutral-500 italic font-light leading-relaxed">
                    "{log.query}"
                  </p>
                </div>

                <div className="flex space-x-5 bg-neutral-50 p-8 rounded-[2rem] border border-neutral-100/50 relative overflow-hidden">
                  <div className="mt-1 text-black z-10">
                    <Bot size={16} strokeWidth={1.5} />
                  </div>
                  <div className="text-sm text-black leading-relaxed z-10">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block mb-3 font-medium">
                      VYRA System Response
                    </span>
                    {log.response}
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Bot size={80} />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-50 flex justify-end">
                <button className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-all flex items-center space-x-2 group/btn">
                  <ShieldCheck
                    size={14}
                    className="group-hover/btn:text-emerald-500 transition-colors"
                  />
                  <span>Verified by Curator</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-24 text-center bg-white border border-dashed border-gray-100 rounded-[3rem]">
            <p className="text-[11px] text-gray-300 uppercase tracking-widest italic">
              No matching intelligence records found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConciergeLogs;
