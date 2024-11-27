import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Trash2, 
  X 
} from 'lucide-react';

const AlertIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
  delete: Trash2
};

const CreativeAlertComponent = ({
  type = "info",
  title,
  text,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (type === 'success') {
        if (stage === 0) {
          // Move to next stage after initial icon display
          setStage(1);
        } else {
          // Close after full alert is shown
          onClose?.();
        }
      } else {
        setStage(1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [type, stage, onClose]);

  const alertStyles = {
    success: {
      background: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-300',
      iconColor: 'text-emerald-600',
      textColor: 'text-emerald-900',
      buttonBg: 'bg-emerald-600',
      buttonHover: 'hover:bg-emerald-700'
    },
    error: {
      background: 'bg-gradient-to-br from-red-50 to-red-100',
      borderColor: 'border-red-300',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      buttonBg: 'bg-red-600',
      buttonHover: 'hover:bg-red-700'
    },
    delete: {
      background: 'bg-gradient-to-br from-red-50 to-red-100',
      borderColor: 'border-red-300',
      iconColor: 'text-red-600',
      textColor: 'text-red-900',
      buttonBg: 'bg-red-600',
      buttonHover: 'hover:bg-red-700'
    }
  }[type];

  const AlertIcon = AlertIcons[type];

  const renderButtons = () => {
    switch (type) {
      case 'delete':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            className="flex space-x-4 w-full"
          >
            <motion.button
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-lg 
                ${alertStyles.buttonBg} ${alertStyles.buttonHover}
                text-white font-semibold uppercase tracking-wide 
                transition-all shadow-md hover:shadow-lg`}
            >
              Yes, Delete
            </motion.button>
            <motion.button
              onClick={() => {
                onCancel?.();
                onClose?.();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 rounded-lg 
                bg-gray-200 text-gray-700 
                font-semibold uppercase tracking-wide 
                hover:bg-gray-300 transition-all 
                shadow-md hover:shadow-lg"
            >
              Cancel
            </motion.button>
          </motion.div>
        );
      case 'error':
        return (
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg 
              ${alertStyles.buttonBg} ${alertStyles.buttonHover}
              text-white font-semibold uppercase tracking-wide 
              transition-all shadow-md hover:shadow-lg`}
          >
            Close
          </motion.button>
        );
      case 'success':
        return null;
      default:
        return null;
    }
  };

  const renderContent = () => {
    // Full alert stage for most types or success type's second stage
    if (stage === 1) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="relative z-10 text-center w-full"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className={`w-24 h-24 rounded-full 
                bg-white/50 flex items-center justify-center shadow-lg`}
            >
              <AlertIcon 
                size={64} 
                className={`${alertStyles.iconColor}`} 
                strokeWidth={1.5} 
              />
            </motion.div>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className={`text-3xl font-bold mb-4 
              ${alertStyles.textColor} tracking-tight`}
          >
            {title}
          </motion.h2>

          {text && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              className={`mb-8 ${alertStyles.textColor} 
                opacity-80 text-lg font-medium`}
            >
              {text}
            </motion.p>
          )}

          {renderButtons()}
        </motion.div>
      );
    }
    
    // Initial icon stage (no background)
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          className={`w-48 h-48 rounded-full 
            bg-white/80 flex items-center justify-center shadow-2xl`}
        >
          <AlertIcon 
            size={96} 
            className={`${alertStyles.iconColor}`} 
            strokeWidth={1.5} 
          />
        </motion.div>
      </motion.div>
    );
  };

  // Full alert stage with background
  if (stage === 1) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ 
            scale: 0.8, 
            opacity: 0 
          }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 250,
              damping: 25
            }
          }}
          exit={{ 
            scale: 0.8, 
            opacity: 0,
            transition: { duration: 0.2 }
          }}
          className={`w-full max-w-md rounded-2xl p-6 relative overflow-hidden 
            ${alertStyles.background} ${alertStyles.borderColor}
            shadow-2xl border transform min-h-[400px] flex items-center`}
        >
          {/* Removed X button for error type */}

          {renderContent()}
        </motion.div>
      </motion.div>
    );
  }

  // Initial icon stage
  return renderContent();
};

export const Alert = {
  fire: ({
    type = "info",
    title,
    text,
    confirmButtonText,
    cancelButtonText,
    onConfirm,
    onCancel,
  }) => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);

    const handleClose = () => {
      root.unmount();
      document.body.removeChild(container);
    };

    root.render(
      <AnimatePresence>
        <CreativeAlertComponent
          type={type}
          title={title}
          text={text}
          confirmButtonText={confirmButtonText}
          cancelButtonText={cancelButtonText}
          onConfirm={onConfirm}
          onCancel={onCancel}
          onClose={handleClose}
        />
      </AnimatePresence>
    );
  },
};

export default Alert;