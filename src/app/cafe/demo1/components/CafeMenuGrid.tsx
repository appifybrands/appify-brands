'use client';

export type MenuItem = { name: string; desc: string; price: string; tag?: string; icon: string; };
export type MenuSection = { id: string; title: string; icon: string; items: MenuItem[] };

export const MENU_DATA: MenuSection[] = [
  {
    id: 'coffees', title: 'Coffees', icon: '☕',
    items: [
      { name: 'Signature Espresso',    desc: 'Double shot, dark chocolate & hazelnut notes.',                    price: '$4.50', tag: 'Best Seller', icon: '☕' },
      { name: 'Americano',             desc: 'Espresso pulled long over hot water. Bold, smooth.',              price: '$4.00', icon: '☕' },
      { name: 'Cappuccino',            desc: 'Equal parts espresso, steamed & frothy milk.',                   price: '$5.00', icon: '☕' },
      { name: 'Flat White',            desc: 'Microfoam steamed milk over a double ristretto.',                 price: '$5.20', tag: 'Popular', icon: '☕' },
      { name: 'Cortado',               desc: 'Espresso cut with a small amount of warm milk.',                  price: '$4.80', icon: '☕' },
      { name: 'Pour Over',             desc: 'Single origin, hand-poured with a Chemex. Delicate, floral.',     price: '$5.50', tag: 'Specialty', icon: '☕' },
    ],
  },
  {
    id: 'specialty', title: 'Specialty Drinks', icon: '🌿',
    items: [
      { name: 'Forest Latte',          desc: 'Oat milk, house-made pine syrup, cardamom.',                     price: '$6.20', tag: 'Signature', icon: '🌲' },
      { name: 'Matcha Zen',            desc: 'Ceremonial matcha, steamed oat milk, honey.',                    price: '$5.50', tag: 'Popular', icon: '🍵' },
      { name: 'Turmeric Golden Latte', desc: 'Turmeric, ginger, cinnamon, coconut milk.',                      price: '$5.80', icon: '🌟' },
      { name: 'Lavender Fog',          desc: 'House lavender syrup, oat milk, chamomile tea.',                  price: '$6.00', tag: 'New', icon: '💜' },
      { name: 'Rose Cardamom Latte',   desc: 'Espresso, rose water, cardamom, frothy oat milk.',               price: '$6.50', icon: '🌹' },
      { name: 'Beetroot Latte',        desc: 'Earthy beetroot, vanilla, oat milk. Vibrant & nourishing.',      price: '$5.80', icon: '❤️' },
    ],
  },
  {
    id: 'cold', title: 'Cold Drinks', icon: '🧊',
    items: [
      { name: 'Cold Brew Mason',       desc: '18-hour steep, served over rock ice, coconut cream.',            price: '$5.80', tag: 'Best Seller', icon: '🧊' },
      { name: 'Iced Caramel Macchiato',desc: 'Vanilla, espresso, cold milk, house caramel.',                   price: '$6.20', icon: '🍯' },
      { name: 'Nitro Cold Brew',       desc: 'Nitrogen-infused cold brew. Silky, creamy, no milk needed.',     price: '$6.50', tag: 'Signature', icon: '✨' },
      { name: 'Iced Matcha Latte',     desc: 'Ceremonial matcha, oat milk, ice. Pure refreshment.',            price: '$5.80', icon: '🍵' },
      { name: 'Fresh Lemonade',        desc: 'Hand-squeezed with mint and a hint of ginger.',                  price: '$4.50', icon: '🍋' },
      { name: 'Berry Hibiscus Cooler', desc: 'Hibiscus tea, mixed berries, sparkling water, honey.',           price: '$5.20', icon: '🫐' },
    ],
  },
  {
    id: 'breakfast', title: 'Breakfast', icon: '🥐',
    items: [
      { name: 'Avocado Toast',         desc: 'Sourdough, smashed avocado, poached egg, chilli flakes.',        price: '$10.50', tag: 'Popular', icon: '🥑' },
      { name: 'Acai Bowl',             desc: 'Blended acai, banana, granola, seasonal fruits, honey.',          price: '$11.00', icon: '🫐' },
      { name: 'Eggs Benedict',         desc: 'Toasted muffin, hollandaise, smoked salmon, poached eggs.',       price: '$13.50', tag: 'Signature', icon: '🍳' },
      { name: 'Brew Cup Granola',      desc: 'House granola, Greek yoghurt, honey, mixed berries.',             price: '$9.00', icon: '🌾' },
      { name: 'Shakshuka',             desc: 'Eggs poached in spiced tomato sauce, feta, rustic bread.',        price: '$13.00', icon: '🍅' },
      { name: 'Almond Croissant',      desc: 'Buttery croissant, almond cream, flaked almonds. Freshly baked.', price: '$5.50', icon: '🥐' },
    ],
  },
  {
    id: 'sandwiches', title: 'Sandwiches', icon: '🥪',
    items: [
      { name: 'BLT Club',              desc: 'Bacon, lettuce, tomato, garlic aioli on toasted sourdough.',      price: '$11.00', icon: '🥪' },
      { name: 'Smoked Salmon Bagel',   desc: 'Cream cheese, capers, red onion, dill on a sesame bagel.',       price: '$12.50', tag: 'Popular', icon: '🐟' },
      { name: 'Caprese Ciabatta',      desc: 'Buffalo mozzarella, tomato, fresh basil, pesto, olive oil.',      price: '$11.00', icon: '🧀' },
      { name: 'Grilled Chicken Wrap',  desc: 'Char-grilled chicken, avocado, mixed greens, honey mustard.',     price: '$12.00', icon: '🫔' },
      { name: 'Tuna Melt',             desc: 'Tuna, cheddar, jalapeños, toasted sourdough. Perfectly melty.',   price: '$11.50', icon: '🥪' },
      { name: 'Veggie Pesto Panini',   desc: 'Roasted peppers, courgette, feta, sun-dried tomato pesto.',       price: '$10.50', tag: 'Vegan Option', icon: '🌿' },
    ],
  },
  {
    id: 'burgers', title: 'Burgers', icon: '🍔',
    items: [
      { name: 'Brew Smash Burger',     desc: 'Double smash beef patty, house sauce, pickles, American cheese.',  price: '$14.50', tag: 'Signature', icon: '🍔' },
      { name: 'Truffle Mushroom Melt', desc: 'Beef patty, truffle aioli, sautéed mushrooms, gruyère.',          price: '$16.00', tag: 'Chef\'s Pick', icon: '🍄' },
      { name: 'Spicy Jalapeño Burger', desc: 'Beef, pickled jalapeños, pepper jack, sriracha mayo.',             price: '$15.00', icon: '🌶️' },
      { name: 'Crispy Chicken Burger', desc: 'Buttermilk fried chicken, slaw, dill pickles, chipotle mayo.',    price: '$14.00', tag: 'Popular', icon: '🍗' },
      { name: 'Garden Burger',         desc: 'Black bean & beetroot patty, avocado, roasted peppers. Vegan.',   price: '$13.50', tag: 'Vegan', icon: '🌱' },
      { name: 'BBQ Bacon Stacker',     desc: 'Double beef, crispy bacon, cheddar, caramelised onion jam.',      price: '$16.50', icon: '🥓' },
    ],
  },
  {
    id: 'sides', title: 'Sides', icon: '🍟',
    items: [
      { name: 'Hand-Cut Fries',        desc: 'Skin-on, double-fried with house seasoning and aioli dip.',       price: '$5.50', tag: 'Best Seller', icon: '🍟' },
      { name: 'Sweet Potato Fries',    desc: 'Crispy sweet potato, smoked paprika, chipotle mayo.',             price: '$6.00', icon: '🍠' },
      { name: 'Onion Rings',           desc: 'Beer-battered, golden fried. Served with BBQ sauce.',             price: '$5.80', icon: '🧅' },
      { name: 'Side Salad',            desc: 'Mixed greens, cherry tomato, cucumber, house vinaigrette.',       price: '$5.00', icon: '🥗' },
      { name: 'Mac & Cheese Bites',    desc: 'Crispy breaded mac & cheese fritters, sriracha dip.',             price: '$7.00', tag: 'New', icon: '🧀' },
      { name: 'Garlic Sourdough',      desc: 'Toasted sourdough with roasted garlic butter and herbs.',         price: '$4.50', icon: '🍞' },
    ],
  },
  {
    id: 'desserts', title: 'Desserts', icon: '🍰',
    items: [
      { name: 'Affogato',              desc: 'Vanilla bean gelato drowned in a double espresso shot.',          price: '$7.00', tag: 'Must Try', icon: '🍨' },
      { name: 'Tiramisu',              desc: 'Classic Italian. Mascarpone, espresso-soaked ladyfingers, cocoa.',price: '$8.50', tag: 'Signature', icon: '🍰' },
      { name: 'Salted Caramel Tart',   desc: 'Buttery pastry shell, silky caramel, dark chocolate ganache.',    price: '$7.50', icon: '🍫' },
      { name: 'Basque Cheesecake',     desc: 'Burnt-top, cloud-soft, caramelised edges. Serve warm.',           price: '$8.00', tag: 'Popular', icon: '🎂' },
      { name: 'Churro Bites',          desc: 'Crispy churros, cinnamon sugar, Belgian chocolate dipping sauce.', price: '$6.50', icon: '🍩' },
      { name: 'Açaí Sorbet',           desc: 'Dairy-free açaí sorbet, fresh mango, coconut flakes.',            price: '$6.00', tag: 'Vegan', icon: '🫐' },
    ],
  },
  {
    id: 'kids', title: 'Kids Menu', icon: '🧸',
    items: [
      { name: 'Mini Pancakes',         desc: 'Fluffy mini pancakes, maple syrup, fresh strawberries.',          price: '$7.50', icon: '🥞' },
      { name: 'Grilled Cheese Toastie',desc: 'Soft white bread, cheddar and mozzarella blend, lightly buttered.', price: '$6.50', icon: '🧀' },
      { name: 'Kids Smoothie',         desc: 'Banana, strawberry, oat milk. Sweet and nutritious.',             price: '$4.50', icon: '🥤' },
      { name: 'Dippy Eggs & Soldiers', desc: 'Soft-boiled egg with wholemeal toast soldiers.',                  price: '$7.00', icon: '🍳' },
      { name: 'PB&J Sandwich',         desc: 'Peanut butter, strawberry jam, soft white bread.',                price: '$5.50', icon: '🥜' },
      { name: 'Vanilla Milkshake',     desc: 'Real vanilla, whole milk. A timeless classic.',                   price: '$5.00', icon: '🍦' },
    ],
  },
];

const MenuItemCard = ({ item, sectionId }: { item: MenuItem; sectionId: string }) => (
  <div className="brew-menu-card">
    {/* Image placeholder */}
    <div className="brew-placeholder" style={{ height: '180px', borderRadius: '0', border: 'none', borderBottom: '1px solid var(--brew-border)' }}>
      <div style={{ fontSize: '2.5rem', opacity: 0.35, position: 'relative', zIndex: 1 }}>{item.icon}</div>
      <div className="brew-placeholder-label" style={{ fontSize: '0.6rem' }}>
        {item.name} · {sectionId}
      </div>
    </div>
    <div style={{ padding: '18px 20px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
        <h3 className="brew-heading" style={{ fontSize: '0.97rem', lineHeight: 1.25 }}>{item.name}</h3>
        <span className="brew-price-tag" style={{ flexShrink: 0 }}>{item.price}</span>
      </div>
      {item.tag && (
        <div style={{
          display: 'inline-block', marginBottom: '8px',
          padding: '2px 10px', borderRadius: '100px',
          background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border)',
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--brew-teal-light)',
        }}>{item.tag}</div>
      )}
      <p style={{ color: 'var(--brew-white-dim)', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: 'Inter, sans-serif', fontWeight: 300, marginBottom: '16px' }}>
        {item.desc}
      </p>
      <button style={{
        width: '100%', padding: '9px', borderRadius: '10px',
        background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border-mid)',
        color: 'var(--brew-teal-light)', fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.25s ease',
        letterSpacing: '0.05em',
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--brew-teal)'; e.currentTarget.style.color = 'var(--brew-white)'; e.currentTarget.style.borderColor = 'var(--brew-teal)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--brew-teal-pale)'; e.currentTarget.style.color = 'var(--brew-teal-light)'; e.currentTarget.style.borderColor = 'var(--brew-border-mid)'; }}
      >
        + Add to Order
      </button>
    </div>
  </div>
);

export default function CafeMenuGrid({ activeTab }: { activeTab: string }) {
  const sections = activeTab === 'all'
    ? MENU_DATA
    : MENU_DATA.filter(s => s.id === activeTab);

  return (
    <section className="brew-section" style={{ background: 'var(--brew-dark)', position: 'relative' }}>
      <div className="brew-nature-bg" style={{ opacity: 0.4 }} />
      <div className="brew-container" style={{ position: 'relative', zIndex: 1 }}>
        {sections.map(section => (
          <div key={section.id} id={`menu-section-${section.id}`} style={{ marginBottom: '72px' }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--brew-border)' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                background: 'var(--brew-teal-pale)', border: '1px solid var(--brew-border-mid)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
              }}>{section.icon}</div>
              <div>
                <h2 className="brew-heading" style={{ fontSize: '1.5rem' }}>{section.title}</h2>
                <p style={{ color: 'var(--brew-white-dim)', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem' }}>
                  {section.items.length} items
                </p>
              </div>
            </div>

            {/* Items grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {section.items.map(item => (
                <MenuItemCard key={item.name} item={item} sectionId={section.id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
