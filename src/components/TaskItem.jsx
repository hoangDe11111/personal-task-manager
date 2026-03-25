import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2, Edit2, AlertCircle, CheckCircle2, Circle, Clock } from 'lucide-react';
import { isBefore, startOfDay, addDays, format, isToday, isTomorrow } from 'date-fns';
import { cn } from '../utils';

export function TaskItem({ task, onUpdate, onDelete, onEdit }) {
  const [isHovered, setIsHovered] = useState(false);

  // Status handlers
  const toNextStatus = () => {
    if (task.status === 'TODO') onUpdate(task.id, { status: 'IN_PROGRESS' });
    else if (task.status === 'IN_PROGRESS') onUpdate(task.id, { status: 'DONE' });
  };
  
  const toPrevStatus = () => {
    if (task.status === 'DONE') onUpdate(task.id, { status: 'IN_PROGRESS' });
    else if (task.status === 'IN_PROGRESS') onUpdate(task.id, { status: 'TODO' });
  };

  // Deadline logic
  const getDeadlineInfo = () => {
    if (!task.deadline) return null;
    const deadlineDate = new Date(task.deadline);
    const today = startOfDay(new Date());
    const isOverdue = isBefore(deadlineDate, today) && task.status !== 'DONE';
    const isDueSoon = isBefore(deadlineDate, addDays(today, 2)) && task.status !== 'DONE';
    
    let text = format(deadlineDate, 'MMM d');
    if (isToday(deadlineDate)) text = 'Today';
    else if (isTomorrow(deadlineDate)) text = 'Tomorrow';

    if (isOverdue) return { text, color: 'text-red-500 bg-red-50 dark:bg-red-950/30', icon: AlertCircle, label: 'Overdue' };
    if (isDueSoon) return { text, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/30', icon: Clock, label: 'Due Soon' };
    return { text, color: 'text-slate-500 bg-slate-100 dark:bg-slate-800', icon: Calendar, label: 'Deadline' };
  };

  const deadlineInfo = getDeadlineInfo();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "group bg-card border border-border p-4 rounded-xl shadow-sm hover:shadow-md transition-all relative flex flex-col gap-3",
        task.status === 'DONE' && "opacity-75 bg-slate-50 dark:bg-slate-900"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between gap-3">
        <button 
          onClick={() => onUpdate(task.id, { status: task.status === 'DONE' ? 'TODO' : 'DONE' })}
          className="mt-0.5 text-slate-400 hover:text-primary-500 transition-colors flex-shrink-0"
        >
          {task.status === 'DONE' ? (
            <CheckCircle2 className="text-emerald-500" size={20} />
          ) : task.status === 'IN_PROGRESS' ? (
            <div className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-20"></span>
              <Circle className="text-primary-500" size={20} />
            </div>
          ) : (
            <Circle size={20} />
          )}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            "text-base font-medium text-foreground truncate break-words whitespace-normal leading-snug",
            task.status === 'DONE' && "line-through text-slate-400 dark:text-slate-500"
          )}>
            {task.title}
          </h3>
          
          {deadlineInfo && (
            <div className={cn("inline-flex items-center gap-1.5 mt-2 px-2 py-0.5 rounded-md text-xs font-medium", deadlineInfo.color)}>
              <deadlineInfo.icon size={12} />
              <span>{deadlineInfo.text}</span>
            </div>
          )}
        </div>
      </div>

      <div className={cn(
        "flex items-center justify-between border-t border-border/60 pt-3 mt-1",
        "opacity-0 group-hover:opacity-100 transition-opacity",
        isHovered ? "opacity-100" : ""
      )}>
        <div className="flex gap-2">
          {task.status !== 'TODO' && (
             <button onClick={toPrevStatus} className="text-xs text-slate-500 hover:text-primary-600 transition-colors bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
               ← Move
             </button>
          )}
          {task.status !== 'DONE' && (
             <button onClick={toNextStatus} className="text-xs text-slate-500 hover:text-primary-600 transition-colors bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
               Move →
             </button>
          )}
        </div>
        
        <div className="flex gap-1.5">
          <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-md transition-colors">
            <Edit2 size={14} />
          </button>
          <button onClick={() => onDelete(task.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
