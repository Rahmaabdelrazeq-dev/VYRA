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

const mockLogs = [
  {
    id: 1,
    user: "Anonymous",
    query: "I need a scent for a summer wedding in Italy.",
    response:
      "I suggest 'Azure Bloom'. Its citrus top notes and jasmine heart...",
    time: "2 mins ago",
    status: "Success",
  },
  {
    id: 2,
    user: "Sarah J.",
    query: "Do you have anything that smells like rain?",
    response:
      "Our 'Petrichor Mist' captures that exact earthy, fresh essence...",
    time: "15 mins ago",
    status: "Success",
  },
  {
    id: 3,
    user: "Mark R.",
    query: "What is the strongest men's perfume?",
    response:
      "For maximum sillage, I recommend 'Oud Maximus' from our Intense line...",
    time: "1 hour ago",
    status: "Flagged",
  },
];

const ConciergeLogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a quick fetch to use the Loader2 component
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredLogs = mockLogs.filter(
    (log) =>
      log.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.response.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="animate-spin text-neutral-200" size={32} />
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          Retrieving Archives...
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
            Bespoke Consultation Archives
          </p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              value={searchTerm}
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-xs outline-none focus:border-black transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-black transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="space-y-4">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-xl hover:shadow-black/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center text-gray-400">
                    <User size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-black">{log.user}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest">
                      {log.time}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                    log.status === "Success"
                      ? "border-emerald-100 text-emerald-500 bg-emerald-50/30"
                      : "border-rose-100 text-rose-500 bg-rose-50/30"
                  }`}
                >
                  {log.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 mt-1 text-gray-300">
                    <MessageSquare size={14} />
                  </div>
                  <p className="text-sm text-gray-600 italic font-light">
                    "{log.query}"
                  </p>
                </div>

                <div className="flex space-x-4 bg-neutral-50 p-6 rounded-2xl border border-neutral-100/50">
                  <div className="flex-shrink-0 mt-1 text-black">
                    <Bot size={14} />
                  </div>
                  <div className="text-sm text-black leading-relaxed">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">
                      VYRA Concierge Response
                    </span>
                    {log.response}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end">
                <button className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-black transition-colors flex items-center space-x-2 group/btn">
                  <ShieldCheck
                    size={12}
                    className="group-hover/btn:text-emerald-500 transition-colors"
                  />
                  <span>Validate Response</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white border border-dashed border-gray-100 rounded-[2rem]">
            <p className="text-xs text-gray-400 italic font-light">
              No olfactory records match your query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConciergeLogs;
