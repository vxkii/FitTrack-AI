import React from 'react';

/**
 * Helper to extract the capitalized first letter from email or name.
 */
export function getInitialFromEmail(email, name) {
  if (email && typeof email === 'string' && email.trim().length > 0) {
    return email.trim().charAt(0).toUpperCase();
  }
  if (name && typeof name === 'string' && name.trim().length > 0) {
    return name.trim().charAt(0).toUpperCase();
  }
  return 'U';
}

/**
 * UserAvatar component that displays the first letter of the user's email.
 */
export default function UserAvatar({ email, name, className = '', size = 'md' }) {
  const initial = getInitialFromEmail(email, name);

  // Curated elegant color gradients based on character code
  const colorGradients = [
    'from-blue-600 to-indigo-600',
    'from-indigo-600 to-purple-600',
    'from-blue-700 to-sky-600',
    'from-violet-600 to-indigo-700',
    'from-emerald-600 to-teal-700'
  ];

  const charCode = initial.charCodeAt(0) || 0;
  const gradient = colorGradients[charCode % colorGradients.length];

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs font-bold',
    md: 'w-9 h-9 text-sm font-bold',
    lg: 'w-12 h-12 text-lg font-extrabold',
    xl: 'w-28 h-28 sm:w-32 sm:h-32 text-4xl sm:text-5xl font-black'
  };

  const appliedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className={`rounded-full bg-gradient-to-tr ${gradient} text-white flex items-center justify-center shrink-0 select-none shadow-sm ${appliedSize} ${className}`}
      title={email || name || 'User Profile'}
      aria-label={`Profile avatar: ${initial}`}
    >
      <span>{initial}</span>
    </div>
  );
}
