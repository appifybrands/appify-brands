import type { Metadata } from 'next';
import './cafe.css';
import CafeNavbar from './components/CafeNavbar';
import CafeHero from './components/CafeHero';
import CafeActionStrip from './components/CafeActionStrip';
import CafePromoSection from './components/CafePromoSection';
import CafeFooter from './components/CafeFooter';

export const metadata: Metadata = {
  title: 'The Brew Cup Cafe — Epic Taste & Nature',
  description: 'The Brew Cup Cafe is your nature-inspired escape for specialty coffee, artisan fast food, and seasonal drinks.',
};

export default function BrewCupHome() {
  return (
    <div className="cafe-root">
      <CafeNavbar />
      <main>
        {/* Hero Section */}
        <CafeHero />

        {/* Action Strip (Take away / Delivery equivalent) */}
        <CafeActionStrip />

        {/* Happy Kids equivalent */}
        <CafePromoSection
          imagePosition="right"
          label="NATURE INSPIRED"
          bgColor="var(--brew-cream)"
          textColor="var(--brew-dark)"
          subTextColor="var(--brew-brown)"
          heading="A SPACE TO<br/>UNWIND"
          body="Living plant walls, natural light, and the perfect atmosphere to connect. Bring your friends, family, or just a good book."
          btnLabel="Learn More!"
          btnHref="#about"
          btnClass="brew-btn-teal"
        />

        {/* Deals equivalent */}
        <CafePromoSection
          imagePosition="left"
          label="FRESH EVERY DAY"
          bgColor="var(--brew-dark)"
          textColor="var(--brew-white)"
          subTextColor="var(--brew-sand)"
          heading="OUR DAILY<br/>DEALS"
          body="Freshly baked pastries every morning, lunch combos that hit the spot, and afternoon treats. Zero compromise on flavour."
          btnLabel="View Deals"
          btnHref="/cafe/demo1/menu"
          btnClass="brew-btn-sand"
        />

        {/* Groups equivalent */}
        <CafePromoSection
          imagePosition="right"
          label="GROUPS & EVENTS"
          bgColor="var(--brew-teal)"
          textColor="var(--brew-white)"
          subTextColor="var(--brew-cream)"
          heading="LUNCH OR<br/>DINNER"
          body="With your friends, colleagues, or any other cozy group! We have the space and the taste for everyone."
          btnLabel="Tell me more!"
          btnHref="#contact"
          btnClass="brew-btn-dark"
        />

      </main>
      <CafeFooter />
    </div>
  );
}
