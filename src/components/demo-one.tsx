import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';

// Contextual resort reviews data
const testimonials = [
  {
    name: 'Owais Ali',
    username: '@oovi',
    body: 'Wow nature + mountains + dal view + no distractions. Great place to calm..',
    img: 'https://i.pravatar.cc/150?u=owais',
    country: '🇮🇳 India',
  },
  {
    name: 'Venkaatesh Rangchari',
    username: '@venkaatesh',
    body: 'A lovely property with amazing scenic views. Highly recommended. Thank you team Shangraff!',
    img: 'https://i.pravatar.cc/150?u=venkaatesh',
    country: '🇮🇳 India',
  },
  {
    name: 'Konpal Patni',
    username: '@konpal',
    body: 'Shangraff ought to be ones top choice for the ultimate Kashmiri hospitality experience...',
    img: 'https://i.pravatar.cc/150?u=konpal',
    country: '🇮🇳 India',
  },
  {
    name: 'Ruhail Bhatt',
    username: '@ruhail',
    body: 'Shangraff Mountain Abode is a beautiful stay. The views are unmatched and the service is excellent.',
    img: 'https://i.pravatar.cc/150?u=ruhail',
    country: '🇮🇳 India',
  },
  {
    name: 'Zacharias',
    username: '@zacharias',
    body: 'Exceptional hospitality and a breathtaking location. Truly a 5-star experience in Srinagar.',
    img: 'https://i.pravatar.cc/150?u=zacharias',
    country: '🇦🇪 UAE',
  },
  {
    name: 'Arvind Bansode',
    username: '@arvind',
    body: 'The perfect mountain getaway. Peaceful, scenic, and very well maintained. Will definitely visit again.',
    img: 'https://i.pravatar.cc/150?u=arvind',
    country: '🇮🇳 India',
  },
  {
    name: 'Suhail Ahmed',
    username: '@suhail',
    body: 'The staff is very polite and the view from the room is just magical. Best resort in Srinagar.',
    img: 'https://i.pravatar.cc/150?u=suhail',
    country: '🇮🇳 India',
  },
  {
    name: 'Priya Sharma',
    username: '@priya',
    body: 'A hidden gem in Kashmir. Everything was perfect, from the decor to the food. Highly recommended.',
    img: 'https://i.pravatar.cc/150?u=priya',
    country: '🇮🇳 India',
  },
  {
    name: 'David Wilson',
    username: '@david',
    body: 'The tranquility here is something else. Waking up to mountain views was the highlight of my trip.',
    img: 'https://i.pravatar.cc/150?u=david',
    country: '🇬🇧 UK',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
              {name} <span className="text-xs">{country}</span>
            </figcaption>
            <p className="text-xs font-medium text-muted-foreground">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-sm text-secondary-foreground">&quot;{body}&quot;</blockquote>
      </CardContent>
    </Card>
  );
}

export default function DemoOne() {
  return (
    <div className="border border-black/5 dark:border-white/10 rounded-2xl relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden gap-4 [perspective:1000px] bg-white/30 dark:bg-black/20 backdrop-blur-3xl transition-colors">
      <div
        className="flex flex-row items-center gap-6"
        style={{
          transform:
            'translateX(-50px) translateY(0px) translateZ(-150px) rotateX(20deg) rotateY(-10deg) rotateZ(10deg)',
        }}
      >
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s] [--gap:1.5rem]">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={`col1-${idx}`} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:35s] [--gap:1.5rem]">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={`col2-${idx}`} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:45s] [--gap:1.5rem]">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={`col3-${idx}`} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:30s] [--gap:1.5rem]">
          {testimonials.map((review, idx) => (
            <TestimonialCard key={`col4-${idx}`} {...review} />
          ))}
        </Marquee>
      </div>
      
      {/* Gradient overlays for vertical marquee - Theme aware */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/90 dark:from-black/80 to-transparent transition-colors"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 dark:from-black/80 to-transparent transition-colors"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/60 dark:from-black/50 to-transparent transition-colors"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/60 dark:from-black/50 to-transparent transition-colors"></div>
    </div>
  );
}
