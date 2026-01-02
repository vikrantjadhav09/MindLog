
import React from 'react';
import { Home, Book, History, BarChart2, Settings, Plus } from 'lucide-react';

type Tab = 'home' | 'diary' | 'history' | 'analytics' | 'settings';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}


const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'diary', icon: Plus, label: 'Write' },
    { id: 'history', icon: History, label: 'History' },
    { id: 'analytics', icon: BarChart2, label: 'Stats' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];


  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar - Desktop */}
      <nav className="hidden md:flex flex-col w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sticky top-0 h-screen">
        <div className="mb-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <h1 className="text-xl font-semibold tracking-tight">MINDLOG</h1>
        </div>

        <div className="flex flex-col gap-2 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 font-medium'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-400">A quiet place to grow.</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pb-24 md:pb-0">
        <div className="max-w-4xl mx-auto p-6 md:p-12">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'
              }`}
          >
            <tab.icon size={20} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
