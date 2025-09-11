import HoverExpandComponent from '@/app/my_components/HoverExpandComponent';
import WrapButton from '@/components/ui/wrap-button';
import { Globe } from "lucide-react";
import Image from 'next/image';

export default function ServicesSection() {
   const hover_images = ["/hover_images/1.jpg", "/hover_images/2.jpg", "/hover_images/6.jpg", "/hover_images/4.jpg", "/hover_images/5.jpg", "/hover_images/3.jpg"]

  return (
    <section id="services" className="flex flex-col items-center justify-center text-center min-h-screen">
      <div className=''>
        {/* Laptop & Desktop: Hover Expand Component */}
        <div className="hidden lg:block">
          <HoverExpandComponent />
        </div>

        {/* Tablets & Mobile: Simple Image Display */}
        <div className="lg:hidden">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 mt-9
  bg-gradient-to-r from-green-400 via-green-500 to-emerald-600
  bg-clip-text text-transparent animate-gradient"
          >
            Services We Offer...
          </h1>

          <div className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
            {hover_images.map((image, index) => (
              <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={`Service ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <WrapButton  href="/services" variant='green'>
            <Globe className="animate-spin " />
            View Our Services
          </WrapButton>
        </div>
      </div>
    </section>
  )
}
