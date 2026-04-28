import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
};

const styles = {
  success:
    "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  error:
    "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
  info: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  warning:
    "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
};

export default function Toast({ id, message, type = "info" }) {
  const { dispatch } = useApp();
  const Icon = icons[type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${styles[type]} animate-slide-in`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => dispatch({ type: "REMOVE_TOAST", payload: id })}
        className="ml-auto p-1 rounded hover:bg-black/10"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
