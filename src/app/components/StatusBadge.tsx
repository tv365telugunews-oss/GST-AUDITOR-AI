import { CheckCircle2, AlertCircle, Clock, XCircle } from 'lucide-react';

type StatusType = 'success' | 'warning' | 'urgent' | 'pending' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  text: string;
  icon?: boolean;
}

export function StatusBadge({ status, text, icon = true }: StatusBadgeProps) {
  const styles = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    urgent: 'bg-red-100 text-red-700 border-red-200',
    pending: 'bg-blue-100 text-blue-700 border-blue-200',
    info: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  const icons = {
    success: CheckCircle2,
    warning: AlertCircle,
    urgent: XCircle,
    pending: Clock,
    info: AlertCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {icon && <Icon className="w-3.5 h-3.5" />}
      {text}
    </span>
  );
}
