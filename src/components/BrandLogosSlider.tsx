const brandLogos = [
  { name: 'Forbes', logo: 'Forbes' },
  { name: 'TechCrunch', logo: 'TechCrunch' },
  { name: 'Healthline', logo: 'Healthline' },
  { name: 'WebMD', logo: 'WebMD' },
  { name: 'Business Insider', logo: 'Business Insider' },
  { name: 'CNN Health', logo: 'CNN Health' },
  { name: 'The Verge', logo: 'The Verge' },
  { name: 'Wired', logo: 'Wired' },
];

const BrandLogosSlider = () => {
  return (
    <div className="overflow-hidden bg-muted/30 py-8">
      <h3 className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
        As Featured In
      </h3>
      <div className="relative">
        <div className="flex animate-marquee">
          {/* First set of logos */}
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 px-8 md:px-12"
            >
              <span className="text-xl md:text-2xl font-bold text-foreground/30 hover:text-foreground/50 transition-colors whitespace-nowrap">
                {brand.logo}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brandLogos.map((brand) => (
            <div
              key={`${brand.name}-duplicate`}
              className="flex-shrink-0 px-8 md:px-12"
            >
              <span className="text-xl md:text-2xl font-bold text-foreground/30 hover:text-foreground/50 transition-colors whitespace-nowrap">
                {brand.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogosSlider;
