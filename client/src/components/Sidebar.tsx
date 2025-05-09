import { Assignment } from "@shared/schema";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { format, isToday, isTomorrow } from "date-fns";
import { useTheme } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  assignments: Assignment[];
}

export default function Sidebar({ open, setOpen, assignments }: SidebarProps) {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();

  // Get recent assignments (up to 5)
  const recentAssignments = assignments
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-400';
    }
  };

  const formatDueDate = (date: Date) => {
    if (isToday(new Date(date))) return 'Today';
    if (isTomorrow(new Date(date))) return 'Tomorrow';
    return format(new Date(date), 'MMM d');
  };

  return (
    <div 
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 lg:translate-x-0 lg:static lg:w-72",
        open ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
      )}>
      
      <div className="flex flex-col h-full overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden self-end m-2"
        >
          <i className="ri-close-line text-xl"></i>
        </Button>
        
        {/* Navigation removed */}
        <nav className="flex-1"></nav>
      </div>
    </div>
  );
}
