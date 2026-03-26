export default function Dashboard() {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-black uppercase tracking-tighter">
        Your Bookings<span className="text-slate-500">.</span>
      </h1>
      <div className="mt-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl border-dashed text-slate-500 text-center">
        No active bookings found. Start exploring!
      </div>
    </div>
  );
}
