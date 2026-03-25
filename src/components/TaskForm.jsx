import { useState, useEffect } from 'react';
import { Calendar, Plus, X } from 'lucide-react';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';

export function TaskForm({ onSubmit, onClose, initialData = null }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [deadline, setDeadline] = useState(initialData?.deadline || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      deadline: deadline || null,
      status: initialData?.status || 'TODO',
    });
    
    setTitle('');
    setDeadline('');
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-xl p-4 shadow-sm relative"
      >
        {onClose && (
          <button 
            type="button" 
            onClick={onClose}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={16} />
          </button>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-lg font-medium text-foreground placeholder-slate-400 border-none focus:outline-none focus:ring-0 w-full"
            autoFocus
          />
          
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-border">
            <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-slate-800 rounded-md px-2 py-1.5 w-fit">
              <Calendar size={14} className="mr-2" />
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="bg-transparent outline-none text-xs w-[110px] cursor-pointer"
              />
            </div>
            
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex items-center justify-center gap-1.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-1.5 px-4 rounded-lg transition-colors"
            >
              {initialData ? 'Save' : 'Add Task'}
              {!initialData && <Plus size={16} />}
            </button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
