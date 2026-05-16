import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Brew Cup Cafe — Epic Taste & Nature',
  description: 'The Brew Cup Cafe is your nature-inspired escape for specialty coffee, artisan fast food, and seasonal drinks.',
};

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
