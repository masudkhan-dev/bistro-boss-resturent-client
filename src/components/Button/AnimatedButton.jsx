import React from 'react';
import { motion } from 'framer-motion';

// Button Variants
const buttonVariants = {
  primary: {
    backgroundColor: 'bg-blue-500',
    hoverBackgroundColor: 'hover:bg-blue-600',
    textColor: 'text-white'
  },
  secondary: {
    backgroundColor: 'bg-gray-500',
    hoverBackgroundColor: 'hover:bg-gray-600',
    textColor: 'text-white'
  },
  success: {
    backgroundColor: 'bg-green-500',
    hoverBackgroundColor: 'hover:bg-green-600',
    textColor: 'text-white'
  },
  danger: {
    backgroundColor: 'bg-red-500',
    hoverBackgroundColor: 'hover:bg-red-600',
    textColor: 'text-white'
  },
  outline: {
    backgroundColor: 'bg-transparent',
    hoverBackgroundColor: 'hover:bg-blue-50',
    textColor: 'text-blue-500',
    border: 'border border-blue-500'
  }
};

// Framer Motion animation configurations
const buttonAnimations = {
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  },
  rotate: {
    whileHover: { rotate: 5 },
    whileTap: { rotate: -5 }
  },
  bounce: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 }
  }
};

// Reusable Button Component
const AnimatedButton = ({ 
  variant = 'primary', 
  size = 'md', 
  animation = 'scale', 
  onClick, 
  children,
  className = '',
  disabled = false
}) => {
  const buttonStyle = buttonVariants[variant];
  const animationProps = buttonAnimations[animation];

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <motion.button
      className={`
        rounded-md 
        transition-all 
        duration-300 
        ease-in-out 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        ${buttonStyle.backgroundColor} 
        ${buttonStyle.hoverBackgroundColor} 
        ${buttonStyle.textColor} 
        ${buttonStyle.border || ''} 
        ${sizeClasses[size]}
        ${className}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      {...animationProps}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

// Example Usage Component
const Buttonshowcase = () => {
  const handleClick = (buttonType) => {
    console.log(`${buttonType} button clicked!`);
  };

  return (
    <div className="flex flex-col space-y-4 p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Animated Buttons Showcase</h2>
      
      <div className="flex space-x-4">
        <AnimatedButton 
          variant="primary" 
          onClick={() => handleClick('Primary')}
        >
          Primary Button
        </AnimatedButton>
        
        <AnimatedButton 
          variant="secondary" 
          animation="rotate"
          onClick={() => handleClick('Secondary')}
        >
          Secondary Button
        </AnimatedButton>
      </div>
      
      <div className="flex space-x-4">
        <AnimatedButton 
          variant="success" 
          size="lg"
          animation="bounce"
          onClick={() => handleClick('Success')}
        >
          Success Button
        </AnimatedButton>
        
        <AnimatedButton 
          variant="danger" 
          size="sm"
          onClick={() => handleClick('Danger')}
        >
          Danger Button
        </AnimatedButton>
      </div>
      
      <div>
        <AnimatedButton 
          variant="outline" 
          disabled
          onClick={() => handleClick('Disabled')}
        >
          Disabled Button
        </AnimatedButton>
      </div>
    </div>
  );
};

export { AnimatedButton };