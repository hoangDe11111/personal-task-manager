import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Search, Plus, Filter, CheckCircle2, CircleDashed, ListTodo, AlertCircle } from 'lucide-react';
import { isBefore, startOfDay } from 'date-fns';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

const STATUSES = [
  { id: 'TODO', label: 'To Do', icon: ListTodo, color: 'text-slate-500' },
  { id: 'IN_PROGRESS', label: 'In Progress', icon: CircleDashed, color: 'text-primary-500' },
  { id: 'DONE', label: 'Done', icon: CheckCircle2, color: 'text-emerald-500' }
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isDark, setIsDark] = useLocalStorage('theme-dark', false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addTask = (data) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setIsAddingTask(false);
  };

  const updateTask = (id, updates) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, ...updates } : t)));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'DONE').length;
    const today = startOfDay(new Date());
    const overdue = tasks.filter(t => 
      t.status !== 'DONE' && t.deadline && isBefore(new Date(t.deadline), today)
    ).length;
    
    return { total, completed, overdue };
  }, [tasks]);

  // Filtered
  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  return (
    <div className="min-h-screen pb-12 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 text-white p-2 rounded-xl shadow-inner">
              <CheckCircle2 size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-indigo-500 dark:from-primary-400 dark:to-indigo-300">
              Personal Task Manager
            </h1>
          </div>
          
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col gap-6">
        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl">
              <ListTodo size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Tasks</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.total}</h3>
            </div>
          </div>
          
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.completed}</h3>
            </div>
          </div>
          
          <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overdue</p>
              <h3 className="text-2xl font-bold text-foreground">{stats.overdue}</h3>
            </div>
          </div>
        </section>

        {/* Toolbar */}
        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-2 rounded-2xl shadow-sm">
          <div className="flex-1 flex items-center px-4 gap-2 w-full sm:w-auto">
            <Search size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:ring-0 text-sm py-2 text-foreground placeholder-slate-400 outline-none"
            />
          </div>
          
          <div className="w-full sm:w-auto flex items-center gap-2 sm:pl-4 sm:border-l border-border px-2 sm:px-0">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full sm:w-auto justify-between">
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${statusFilter === 'ALL' ? 'bg-white dark:bg-slate-700 shadow-sm text-foreground' : 'text-slate-500 hover:text-foreground'}`}
              >
                All
              </button>
              {STATUSES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStatusFilter(s.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${statusFilter === s.id ? 'bg-white dark:bg-slate-700 shadow-sm text-foreground' : 'text-slate-500 hover:text-foreground'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => { setIsAddingTask(true); setEditingTask(null); }}
              className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white p-2 sm:px-4 sm:py-2 rounded-lg font-medium text-sm transition-colors ml-2 shadow-sm whitespace-nowrap"
            >
              <Plus size={18} className="sm:mr-1.5" />
              <span className="hidden sm:inline">New Task</span>
            </button>
          </div>
        </section>

        {/* Adding inline Task */}
        <AnimatePresence>
          {isAddingTask && (
            <div className="mb-2">
              <TaskForm 
                onSubmit={addTask} 
                onClose={() => setIsAddingTask(false)} 
              />
            </div>
          )}
        </AnimatePresence>

        {/* Board View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-2">
          {STATUSES.map(statusData => {
            // If filtering by specific status, only show that column (or hide others)
            if (statusFilter !== 'ALL' && statusFilter !== statusData.id) return null;
            
            const columnTasks = filteredTasks.filter(t => t.status === statusData.id);
            const StatusIcon = statusData.icon;
            
            return (
              <div 
                key={statusData.id} 
                className={`flex flex-col gap-3 ${statusFilter !== 'ALL' ? 'lg:col-span-3 lg:w-1/2 lg:mx-auto' : ''}`}
              >
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <StatusIcon size={18} className={statusData.color} />
                    <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                      {statusData.label}
                    </h2>
                  </div>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                
                <div className="flex flex-col gap-3 min-h-[150px] rounded-2xl lg:bg-slate-50/50 lg:dark:bg-slate-900/20 lg:p-3 lg:border lg:border-border/50">
                  <AnimatePresence mode="popLayout">
                    {columnTasks.map(task => (
                      editingTask?.id === task.id ? (
                        <TaskForm 
                          key={task.id} 
                          initialData={task} 
                          onSubmit={(data) => updateTask(task.id, data)}
                          onClose={() => setEditingTask(null)}
                        />
                      ) : (
                        <TaskItem
                          key={task.id}
                          task={task}
                          onUpdate={updateTask}
                          onDelete={deleteTask}
                          onEdit={setEditingTask}
                        />
                      )
                    ))}
                  </AnimatePresence>
                  
                  {columnTasks.length === 0 && (
                    <div className="p-8 text-center text-slate-400 border-2 border-dashed border-border/60 rounded-xl">
                      <p className="text-sm">No tasks</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
