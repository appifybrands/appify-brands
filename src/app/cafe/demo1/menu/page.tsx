'use client';

import { useState } from 'react';
import '../cafe.css';
import CafeNavbar from '../components/CafeNavbar';
import CafeMenuHero from '../components/CafeMenuHero';
import CafeCategoryTabs from '../components/CafeCategoryTabs';
import CafeMenuList from '../components/CafeMenuList';
import CafeFooter from '../components/CafeFooter';

export default function BrewCupMenu() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="cafe-root">
      <CafeNavbar />
      <main>
        <CafeMenuHero />
        <CafeCategoryTabs active={activeTab} onSelect={setActiveTab} />
        <CafeMenuList activeTab={activeTab} />
      </main>
      <CafeFooter />
    </div>
  );
}
