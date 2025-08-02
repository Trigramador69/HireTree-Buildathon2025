"use client"

interface HireTreeLogoProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function HireTreeLogo({ size = "md", className = "" }: HireTreeLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Tree trunk */}
        <rect x="45" y="70" width="10" height="25" fill="url(#trunkGradient)" rx="2" />

        {/* Tree layers - representing hierarchy */}
        <ellipse cx="50" cy="65" rx="25" ry="12" fill="url(#leafGradient1)" opacity="0.9" />
        <ellipse cx="50" cy="55" rx="20" ry="10" fill="url(#leafGradient2)" opacity="0.9" />
        <ellipse cx="50" cy="45" rx="15" ry="8" fill="url(#leafGradient3)" opacity="0.9" />

        {/* Professional nodes - representing talent */}
        <circle cx="35" cy="60" r="3" fill="#14b8a6" opacity="0.8" />
        <circle cx="65" cy="58" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="50" cy="40" r="3" fill="#10b981" opacity="0.8" />
        <circle cx="42" cy="50" r="2.5" fill="#0891b2" opacity="0.7" />
        <circle cx="58" cy="48" r="2.5" fill="#059669" opacity="0.7" />

        {/* Connecting lines - representing connections */}
        <line x1="50" y1="70" x2="35" y2="60" stroke="#14b8a6" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="70" x2="65" y2="58" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="55" x2="50" y2="40" stroke="#10b981" strokeWidth="1" opacity="0.6" />

        <defs>
          <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f766e" />
            <stop offset="100%" stopColor="#134e4a" />
          </linearGradient>

          <linearGradient id="leafGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>

          <linearGradient id="leafGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>

          <linearGradient id="leafGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
