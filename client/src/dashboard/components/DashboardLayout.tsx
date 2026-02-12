import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <Header />

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer info (Professional touch) */}
        <footer className="px-8 py-4 text-center border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-400">
            © 2026 SmartForecast Dashboard • Business Intelligence System
            v1.0.0
          </p>
        </footer>
      </div>
    </div>
  );
}

export default DashboardLayout;
