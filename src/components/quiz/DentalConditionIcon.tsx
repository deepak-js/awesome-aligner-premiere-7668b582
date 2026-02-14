interface DentalConditionIconProps {
  condition: string;
  className?: string;
}

const CrowdedTeeth = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gum line */}
    <path d="M10 45 Q30 30 60 35 Q90 30 110 45 L110 55 Q90 42 60 47 Q30 42 10 55 Z" fill="#F4A0B0" />
    {/* Overlapping/crowded teeth */}
    <rect x="28" y="47" width="14" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-8 35 61)" />
    <rect x="38" y="45" width="14" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(5 45 60)" />
    <rect x="50" y="44" width="14" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-6 57 59)" />
    <rect x="62" y="45" width="14" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(7 69 60)" />
    <rect x="74" y="47" width="14" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-4 81 61)" />
    {/* Lower gum */}
    <path d="M10 95 Q30 108 60 103 Q90 108 110 95 L110 85 Q90 96 60 91 Q30 96 10 85 Z" fill="#F4A0B0" />
    {/* Lower teeth */}
    <rect x="32" y="68" width="12" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(6 38 79)" />
    <rect x="44" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-4 50 78)" />
    <rect x="56" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(5 62 78)" />
    <rect x="68" y="68" width="12" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-6 74 79)" />
  </svg>
);

const GapTeeth = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45 Q30 30 60 35 Q90 30 110 45 L110 55 Q90 42 60 47 Q30 42 10 55 Z" fill="#F4A0B0" />
    {/* Upper teeth with gap */}
    <rect x="25" y="47" width="14" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="41" y="45" width="14" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* GAP */}
    <rect x="65" y="45" width="14" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="81" y="47" width="14" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Gap indicator */}
    <line x1="57" y1="55" x2="63" y2="55" stroke="#F4A0B0" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="57" y1="65" x2="63" y2="65" stroke="#F4A0B0" strokeWidth="1" strokeDasharray="2 2" />
    {/* Lower gum */}
    <path d="M10 95 Q30 108 60 103 Q90 108 110 95 L110 85 Q90 96 60 91 Q30 96 10 85 Z" fill="#F4A0B0" />
    <rect x="30" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="44" y="64" width="12" height="26" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="64" y="64" width="12" height="26" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="78" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
  </svg>
);

const Overbite = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Side view - upper jaw */}
    <path d="M15 40 Q40 28 80 32 Q100 34 105 42 L105 50 Q100 44 80 42 Q40 38 15 50 Z" fill="#F4A0B0" />
    {/* Upper teeth - protruding down significantly */}
    <rect x="30" y="42" width="13" height="32" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="45" y="40" width="13" height="35" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="60" y="40" width="13" height="35" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="75" y="42" width="13" height="32" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Lower jaw - recessed */}
    <path d="M20 100 Q40 112 70 108 Q95 112 105 100 L105 90 Q95 98 70 94 Q40 98 20 90 Z" fill="#F4A0B0" />
    {/* Lower teeth - shorter, behind upper */}
    <rect x="35" y="72" width="11" height="20" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="48" y="70" width="11" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="61" y="70" width="11" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="74" y="72" width="11" height="20" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Arrow showing overlap */}
    <path d="M95 50 L95 70" stroke="#E57373" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowDown)" />
    <defs><marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#E57373" /></marker></defs>
  </svg>
);

const Underbite = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 40 Q40 28 80 32 Q100 34 105 42 L105 50 Q100 44 80 42 Q40 38 15 50 Z" fill="#F4A0B0" />
    {/* Upper teeth - shorter */}
    <rect x="35" y="42" width="11" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="48" y="40" width="11" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="61" y="40" width="11" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="74" y="42" width="11" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Lower jaw protruding */}
    <path d="M15 100 Q40 115 75 110 Q100 115 110 100 L110 88 Q100 98 75 94 Q40 98 15 88 Z" fill="#F4A0B0" />
    {/* Lower teeth - protruding past upper */}
    <rect x="30" y="60" width="13" height="32" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="45" y="58" width="13" height="35" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="60" y="58" width="13" height="35" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="75" y="60" width="13" height="32" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Arrow showing protrusion */}
    <path d="M95 85 L95 65" stroke="#E57373" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#arrowUp)" />
    <defs><marker id="arrowUp" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 Z" fill="#E57373" /></marker></defs>
  </svg>
);

const Crossbite = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45 Q30 30 60 35 Q90 30 110 45 L110 55 Q90 42 60 47 Q30 42 10 55 Z" fill="#F4A0B0" />
    {/* Upper teeth - shifted to one side */}
    <rect x="22" y="47" width="13" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="37" y="45" width="13" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="52" y="45" width="13" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="67" y="45" width="13" height="30" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="82" y="47" width="13" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Lower gum */}
    <path d="M10 95 Q30 108 60 103 Q90 108 110 95 L110 85 Q90 96 60 91 Q30 96 10 85 Z" fill="#F4A0B0" />
    {/* Lower teeth - offset laterally to show crossbite */}
    <rect x="28" y="68" width="12" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="42" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="56" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="70" y="66" width="12" height="24" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="84" y="68" width="12" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Crossing arrows */}
    <path d="M48 62 L54 62" stroke="#E57373" strokeWidth="1.5" />
    <path d="M66 62 L72 62" stroke="#E57373" strokeWidth="1.5" />
    <line x1="60" y1="58" x2="60" y2="66" stroke="#E57373" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

const OpenBite = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 40 Q30 25 60 30 Q90 25 110 40 L110 50 Q90 38 60 42 Q30 38 10 50 Z" fill="#F4A0B0" />
    {/* Upper teeth - shorter in front, creating gap */}
    <rect x="22" y="42" width="13" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="37" y="40" width="13" height="18" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="52" y="39" width="13" height="16" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="67" y="40" width="13" height="18" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="82" y="42" width="13" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    {/* Gap between upper and lower front teeth */}
    <line x1="45" y1="60" x2="45" y2="70" stroke="#E57373" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="60" y1="57" x2="60" y2="73" stroke="#E57373" strokeWidth="1" strokeDasharray="2 2" />
    <line x1="75" y1="60" x2="75" y2="70" stroke="#E57373" strokeWidth="1" strokeDasharray="2 2" />
    {/* Lower gum */}
    <path d="M10 100 Q30 115 60 110 Q90 115 110 100 L110 88 Q90 100 60 96 Q30 100 10 88 Z" fill="#F4A0B0" />
    {/* Lower teeth - shorter in front */}
    <rect x="22" y="74" width="13" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="37" y="78" width="13" height="18" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="52" y="80" width="13" height="16" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="67" y="78" width="13" height="18" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="82" y="74" width="13" height="22" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" />
  </svg>
);

const StraightenTeeth = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 45 Q30 30 60 35 Q90 30 110 45 L110 55 Q90 42 60 47 Q30 42 10 55 Z" fill="#F4A0B0" />
    {/* Slightly uneven upper teeth */}
    <rect x="22" y="48" width="13" height="26" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-2 28 61)" />
    <rect x="37" y="46" width="13" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(2 43 60)" />
    <rect x="52" y="45" width="13" height="29" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-1 58 59)" />
    <rect x="67" y="46" width="13" height="28" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(3 73 60)" />
    <rect x="82" y="48" width="13" height="26" rx="3" fill="white" stroke="#D1D5DB" strokeWidth="1.5" transform="rotate(-2 88 61)" />
    {/* Alignment arrows */}
    <path d="M20 85 L100 85" stroke="#4CAF50" strokeWidth="1.5" strokeDasharray="4 3" />
    <path d="M50 82 L50 88" stroke="#4CAF50" strokeWidth="1.5" />
    <path d="M60 82 L60 88" stroke="#4CAF50" strokeWidth="1.5" />
    <path d="M70 82 L70 88" stroke="#4CAF50" strokeWidth="1.5" />
    {/* Lower gum */}
    <path d="M10 95 Q30 108 60 103 Q90 108 110 95 L110 87 Q90 96 60 93 Q30 96 10 87 Z" fill="#F4A0B0" />
  </svg>
);

const DentalConditionIcon = ({ condition, className = "" }: DentalConditionIconProps) => {
  const icons: Record<string, JSX.Element> = {
    crowded: <CrowdedTeeth />,
    gaps: <GapTeeth />,
    overbite: <Overbite />,
    underbite: <Underbite />,
    crossbite: <Crossbite />,
    open_bite: <OpenBite />,
    straighten: <StraightenTeeth />,
  };

  return (
    <div className={`w-full h-full flex items-center justify-center bg-muted/30 rounded-lg ${className}`}>
      {icons[condition] || <div className="text-muted-foreground text-xs">N/A</div>}
    </div>
  );
};

export default DentalConditionIcon;
