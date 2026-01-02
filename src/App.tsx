import React, { useState, useEffect } from 'react';
import { Entry, EntryType, AppState } from './types';
import { loadState, saveState, calculateStats } from './services/storage';
import Layout from './components/Layout';
import Home from './views/Home';
import Editor from './views/Editor';
import History from './views/History';
import Analytics from './views/Analytics';
import Settings from './views/Settings';

type Tab = 'home' | 'diary' | 'history' | 'analytics' | 'settings';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [state, setState] = useState<AppState>(loadState());
  const [editingEntry, setEditingEntry] = useState<{
    type: EntryType;
    entry?: Entry;
  } | null>(null);

  /* ---------- Persistence ---------- */
  useEffect(() => {
    saveState(state);
  }, [state]);

  /* ---------- Theme Handling ---------- */
  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  /* ---------- Save / Update Entry ---------- */
  const handleSaveEntry = (newEntryData: Partial<Entry>) => {
    setState(prev => {
      const timestamp = new Date().toISOString();
      let entries = [...prev.entries];

      if (editingEntry?.entry) {
        // Update existing entry
        entries = entries.map(entry =>
          entry.id === editingEntry.entry!.id
            ? { ...entry, ...newEntryData, updatedAt: timestamp }
            : entry
        );
      } else {
        // Create new entry
        const newEntry: Entry = {
          id: crypto.randomUUID(),
          type: newEntryData.type!,
          date: newEntryData.date!,
          responses: newEntryData.responses || {},
          mood: newEntryData.mood,
          ratings: newEntryData.ratings,
          createdAt: timestamp,
          updatedAt: timestamp
        };
        entries.push(newEntry);
      }

      return {
        ...prev,
        entries,
        stats: calculateStats(entries)
      };
    });

    setEditingEntry(null);
    setActiveTab('home');
  };

  /* ---------- Delete Entry ---------- */
  const handleDeleteEntry = (id: string) => {
    if (!window.confirm('This entry will be permanently removed. Continue?')) return;

    setState(prev => {
      const entries = prev.entries.filter(e => e.id !== id);
      return {
        ...prev,
        entries,
        stats: calculateStats(entries)
      };
    });
  };

  /* ---------- Export Data ---------- */
  const handleExport = () => {
    const exportData = {
      app: 'MindLog',
      exportedAt: new Date().toISOString(),
      entries: state.entries
    };

    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(exportData, null, 2));

    const anchor = document.createElement('a');
    anchor.href = dataStr;
    anchor.download = `mindlog_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  };

  /* ---------- Clear All Data ---------- */
  const handleClearData = () => {
    if (
      window.confirm(
        'This will erase your journal from this device. This action cannot be undone. Continue?'
      )
    ) {
      localStorage.removeItem('mindlog_state_v1');
      window.location.reload();
    }
  };

  /* ---------- Render Views ---------- */
  const renderContent = () => {
    if (editingEntry) {
      return (
        <Editor
          type={editingEntry.type}
          initialEntry={editingEntry.entry}
          onSave={handleSaveEntry}
          onClose={() => setEditingEntry(null)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home state={state} onWrite={type => setEditingEntry({ type })} />;

      case 'diary':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">New Reflection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { type: EntryType.DAILY, label: 'Daily Diary', desc: 'Capture today’s thoughts' },
                { type: EntryType.WEEKLY, label: 'Weekly Review', desc: '7-day overview' },
                { type: EntryType.MONTHLY, label: 'Monthly Recap', desc: 'Observe your patterns' },
                { type: EntryType.YEARLY, label: 'Yearly Reflection', desc: 'Life-level clarity' }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => setEditingEntry({ type: item.type })}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-left hover:border-indigo-200 transition-all hover:-translate-y-0.5"
                >
                  <h3 className="font-semibold text-lg">{item.label}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 'history':
        return (
          <History
            entries={state.entries}
            onEdit={entry => setEditingEntry({ type: entry.type, entry })}
            onDelete={handleDeleteEntry}
          />
        );

      case 'analytics':
        return <Analytics state={state} />;

      case 'settings':
        return (
          <Settings
            theme={state.theme}
            setTheme={theme => setState(prev => ({ ...prev, theme }))}
            onExport={handleExport}
            onClearData={handleClearData}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
