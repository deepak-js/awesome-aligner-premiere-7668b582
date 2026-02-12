import smartDental from '@/assets/logos/smart-dental.png';
import shanthiDental from '@/assets/logos/shanthi-dental.png';
import ragaDental from '@/assets/logos/raga-dental.png';
import primeDental from '@/assets/logos/prime-dental.png';
import pdhcSmileStudio from '@/assets/logos/pdhc-smile-studio.png';
import nashDental from '@/assets/logos/nash-dental.png';
import mmDentcare from '@/assets/logos/mm-dentcare.png';
import aravinthDental from '@/assets/logos/aravinth-dental.png';
import endokraftDental from '@/assets/logos/endokraft-dental.jpg';
import srikamatchiMedical from '@/assets/logos/srikamatchi-medical.jpg';

const brandLogos = [
  { name: 'Smart Dental Clinic', logo: smartDental },
  { name: 'Shanthi Dental Clinic', logo: shanthiDental },
  { name: 'RAGA Dental', logo: ragaDental },
  { name: 'Prime Dental Thanjavur', logo: primeDental },
  { name: 'PDHC The Smile Studio', logo: pdhcSmileStudio },
  { name: 'NASH Dental', logo: nashDental },
  { name: 'MM Dentcare', logo: mmDentcare },
  { name: 'Aravinth Dental Care', logo: aravinthDental },
  { name: 'Endokraft Dental Clinic', logo: endokraftDental },
  { name: 'Srikamatchi Medical Centre', logo: srikamatchiMedical },
];

const BrandLogosSlider = () => {
  return (
    <div className="overflow-hidden bg-muted/30 py-10 rounded-2xl">
      <h3 className="text-center text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-widest">
        Trusted by Leading Dental Practices
      </h3>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee items-center">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 px-8 md:px-12"
            >
              <div className="h-12 md:h-14 w-auto flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-auto max-w-[160px] md:max-w-[180px] object-contain"
                />
              </div>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {brandLogos.map((brand) => (
            <div
              key={`${brand.name}-duplicate`}
              className="flex-shrink-0 px-8 md:px-12"
            >
              <div className="h-12 md:h-14 w-auto flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-auto max-w-[160px] md:max-w-[180px] object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandLogosSlider;
