'use client';

export type MenuItem = { name: string; desc: string; price: string; tag?: string; };
export type MenuSection = { id: string; title: string; items: MenuItem[] };

export const MENU_DATA: MenuSection[] = [
  {
    id: 'coffees', title: 'Coffees',
    items: [
      { name: 'Signature Espresso',    desc: 'Double shot, dark chocolate & hazelnut notes.',                    price: '4.50', tag: 'Best Seller' },
      { name: 'Americano',             desc: 'Espresso pulled long over hot water. Bold, smooth.',              price: '4.00' },
      { name: 'Cappuccino',            desc: 'Equal parts espresso, steamed & frothy milk.',                   price: '5.00' },
      { name: 'Flat White',            desc: 'Microfoam steamed milk over a double ristretto.',                 price: '5.20', tag: 'Popular' },
      { name: 'Cortado',               desc: 'Espresso cut with a small amount of warm milk.',                  price: '4.80' },
      { name: 'Pour Over',             desc: 'Single origin, hand-poured with a Chemex. Delicate, floral.',     price: '5.50', tag: 'Specialty' },
    ],
  },
  {
    id: 'specialty', title: 'Specialty Drinks',
    items: [
      { name: 'Forest Latte',          desc: 'Oat milk, house-made pine syrup, cardamom.',                     price: '6.20', tag: 'Signature' },
      { name: 'Matcha Zen',            desc: 'Ceremonial matcha, steamed oat milk, honey.',                    price: '5.50', tag: 'Popular' },
      { name: 'Turmeric Golden Latte', desc: 'Turmeric, ginger, cinnamon, coconut milk.',                      price: '5.80' },
      { name: 'Lavender Fog',          desc: 'House lavender syrup, oat milk, chamomile tea.',                  price: '6.00', tag: 'New' },
      { name: 'Rose Cardamom Latte',   desc: 'Espresso, rose water, cardamom, frothy oat milk.',               price: '6.50' },
      { name: 'Beetroot Latte',        desc: 'Earthy beetroot, vanilla, oat milk. Vibrant & nourishing.',      price: '5.80' },
    ],
  },
  {
    id: 'cold', title: 'Cold Drinks',
    items: [
      { name: 'Cold Brew Mason',       desc: '18-hour steep, served over rock ice, coconut cream.',            price: '5.80', tag: 'Best Seller' },
      { name: 'Iced Caramel Macchiato',desc: 'Vanilla, espresso, cold milk, house caramel.',                   price: '6.20' },
      { name: 'Nitro Cold Brew',       desc: 'Nitrogen-infused cold brew. Silky, creamy, no milk needed.',     price: '6.50', tag: 'Signature' },
      { name: 'Iced Matcha Latte',     desc: 'Ceremonial matcha, oat milk, ice. Pure refreshment.',            price: '5.80' },
      { name: 'Fresh Lemonade',        desc: 'Hand-squeezed with mint and a hint of ginger.',                  price: '4.50' },
      { name: 'Berry Hibiscus Cooler', desc: 'Hibiscus tea, mixed berries, sparkling water, honey.',           price: '5.20' },
    ],
  },
  {
    id: 'breakfast', title: 'Breakfast',
    items: [
      { name: 'Avocado Toast',         desc: 'Sourdough, smashed avocado, poached egg, chilli flakes.',        price: '10.50', tag: 'Popular' },
      { name: 'Acai Bowl',             desc: 'Blended acai, banana, granola, seasonal fruits, honey.',          price: '11.00' },
      { name: 'Eggs Benedict',         desc: 'Toasted muffin, hollandaise, smoked salmon, poached eggs.',       price: '13.50', tag: 'Signature' },
      { name: 'Brew Cup Granola',      desc: 'House granola, Greek yoghurt, honey, mixed berries.',             price: '9.00' },
      { name: 'Shakshuka',             desc: 'Eggs poached in spiced tomato sauce, feta, rustic bread.',        price: '13.00' },
      { name: 'Almond Croissant',      desc: 'Buttery croissant, almond cream, flaked almonds. Freshly baked.', price: '5.50' },
    ],
  },
  {
    id: 'sandwiches', title: 'Sandwiches',
    items: [
      { name: 'BLT Club',              desc: 'Bacon, lettuce, tomato, garlic aioli on toasted sourdough.',      price: '11.00' },
      { name: 'Smoked Salmon Bagel',   desc: 'Cream cheese, capers, red onion, dill on a sesame bagel.',       price: '12.50', tag: 'Popular' },
      { name: 'Caprese Ciabatta',      desc: 'Buffalo mozzarella, tomato, fresh basil, pesto, olive oil.',      price: '11.00' },
      { name: 'Grilled Chicken Wrap',  desc: 'Char-grilled chicken, avocado, mixed greens, honey mustard.',     price: '12.00' },
      { name: 'Tuna Melt',             desc: 'Tuna, cheddar, jalapeños, toasted sourdough. Perfectly melty.',   price: '11.50' },
      { name: 'Veggie Pesto Panini',   desc: 'Roasted peppers, courgette, feta, sun-dried tomato pesto.',       price: '10.50', tag: 'Vegan Option' },
    ],
  },
  {
    id: 'burgers', title: 'Burgers',
    items: [
      { name: 'Brew Smash Burger',     desc: 'Double smash beef patty, house sauce, pickles, American cheese.',  price: '14.50', tag: 'Signature' },
      { name: 'Truffle Mushroom Melt', desc: 'Beef patty, truffle aioli, sautéed mushrooms, gruyère.',          price: '16.00', tag: "Chef's Pick" },
      { name: 'Spicy Jalapeño Burger', desc: 'Beef, pickled jalapeños, pepper jack, sriracha mayo.',             price: '15.00' },
      { name: 'Crispy Chicken Burger', desc: 'Buttermilk fried chicken, slaw, dill pickles, chipotle mayo.',    price: '14.00', tag: 'Popular' },
      { name: 'Garden Burger',         desc: 'Black bean & beetroot patty, avocado, roasted peppers. Vegan.',   price: '13.50', tag: 'Vegan' },
      { name: 'BBQ Bacon Stacker',     desc: 'Double beef, crispy bacon, cheddar, caramelised onion jam.',      price: '16.50' },
    ],
  },
  {
    id: 'sides', title: 'Sides',
    items: [
      { name: 'Hand-Cut Fries',        desc: 'Skin-on, double-fried with house seasoning and aioli dip.',       price: '5.50', tag: 'Best Seller' },
      { name: 'Sweet Potato Fries',    desc: 'Crispy sweet potato, smoked paprika, chipotle mayo.',             price: '6.00' },
      { name: 'Onion Rings',           desc: 'Beer-battered, golden fried. Served with BBQ sauce.',             price: '5.80' },
      { name: 'Side Salad',            desc: 'Mixed greens, cherry tomato, cucumber, house vinaigrette.',       price: '5.00' },
      { name: 'Mac & Cheese Bites',    desc: 'Crispy breaded mac & cheese fritters, sriracha dip.',             price: '7.00', tag: 'New' },
      { name: 'Garlic Sourdough',      desc: 'Toasted sourdough with roasted garlic butter and herbs.',         price: '4.50' },
    ],
  },
  {
    id: 'desserts', title: 'Desserts',
    items: [
      { name: 'Affogato',              desc: 'Vanilla bean gelato drowned in a double espresso shot.',          price: '7.00', tag: 'Must Try' },
      { name: 'Tiramisu',              desc: 'Classic Italian. Mascarpone, espresso-soaked ladyfingers, cocoa.',price: '8.50', tag: 'Signature' },
      { name: 'Salted Caramel Tart',   desc: 'Buttery pastry shell, silky caramel, dark chocolate ganache.',    price: '7.50' },
      { name: 'Basque Cheesecake',     desc: 'Burnt-top, cloud-soft, caramelised edges. Serve warm.',           price: '8.00', tag: 'Popular' },
      { name: 'Churro Bites',          desc: 'Crispy churros, cinnamon sugar, Belgian chocolate dipping sauce.', price: '6.50' },
      { name: 'Açaí Sorbet',           desc: 'Dairy-free açaí sorbet, fresh mango, coconut flakes.',            price: '6.00', tag: 'Vegan' },
    ],
  },
  {
    id: 'kids', title: 'Kids Menu',
    items: [
      { name: 'Mini Pancakes',         desc: 'Fluffy mini pancakes, maple syrup, fresh strawberries.',          price: '7.50' },
      { name: 'Grilled Cheese Toastie',desc: 'Soft white bread, cheddar and mozzarella blend, lightly buttered.', price: '6.50' },
      { name: 'Kids Smoothie',         desc: 'Banana, strawberry, oat milk. Sweet and nutritious.',             price: '4.50' },
      { name: 'Dippy Eggs & Soldiers', desc: 'Soft-boiled egg with wholemeal toast soldiers.',                  price: '7.00' },
      { name: 'PB&J Sandwich',         desc: 'Peanut butter, strawberry jam, soft white bread.',                price: '5.50' },
      { name: 'Vanilla Milkshake',     desc: 'Real vanilla, whole milk. A timeless classic.',                   price: '5.00' },
    ],
  },
];

export default function CafeMenuList({ activeTab }: { activeTab: string }) {
  const sections = activeTab === 'all'
    ? MENU_DATA
    : MENU_DATA.filter(s => s.id === activeTab);

  return (
    <section className="brew-section">
      <div className="brew-container" style={{ maxWidth: '800px' }}>
        {sections.map(section => (
          <div key={section.id} id={`menu-section-${section.id}`} style={{ marginBottom: '80px' }}>
            <h2 className="brew-heading" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--brew-dark)', marginBottom: '40px', borderBottom: '4px solid var(--brew-teal)', paddingBottom: '10px' }}>
              {section.title}
            </h2>
            <ul className="brew-menu-list">
              {section.items.map(item => (
                <li key={item.name} className="brew-menu-item">
                  <div className="brew-menu-item-row">
                    <div className="brew-menu-name">
                      {item.name}
                      {item.tag && (
                        <span style={{ marginLeft: '12px', fontSize: '0.7rem', padding: '4px 10px', backgroundColor: 'var(--brew-teal)', color: 'var(--brew-white)', borderRadius: '100px', verticalAlign: 'middle' }}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <div className="brew-menu-dots"></div>
                    <div className="brew-menu-price">{item.price}</div>
                  </div>
                  <div className="brew-menu-desc">{item.desc}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
