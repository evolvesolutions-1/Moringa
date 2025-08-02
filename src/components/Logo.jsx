import { motion } from 'framer-motion';

const Logo = ({ size = 'md', className = '', showText = true, variant = 'default' }) => {
  const sizes = {
    sm: { container: 'h-8 w-8', text: 'text-lg', icon: 'text-sm' },
    md: { container: 'h-10 w-10', text: 'text-xl', icon: 'text-lg' },
    lg: { container: 'h-16 w-16', text: 'text-3xl', icon: 'text-2xl' },
    xl: { container: 'h-20 w-20', text: 'text-4xl', icon: 'text-3xl' }
  };

  const variants = {
    default: 'from-primary-500 to-primary-600',
    light: 'from-primary-400 to-primary-500',
    dark: 'from-primary-600 to-primary-700',
    white: 'bg-white text-primary-600 border-2 border-primary-200'
  };

  const currentSize = sizes[size];
  const gradientClass = variant === 'white' ? variants.white : `bg-gradient-to-r ${variants[variant]}`;

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`${currentSize.container} ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`${currentSize.icon} font-bold ${variant === 'white' ? 'text-primary-600' : 'text-white'}`}
        >
          🌿
        </motion.div>
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${currentSize.text} font-bold font-display bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent`}
        >
          MoringaCare
        </motion.span>
      )}
    </div>
  );
};

export default Logo;