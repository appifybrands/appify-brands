import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import WrapButton from "@/components/ui/wrap-button";

const ECommerceDetail = ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => {
  return (
    <div className="mt-10 min-h-screen bg-background py-12 px-6 flex flex-col items-center">
      {/* Service Overview */}
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">eCommerce Services</h2>
        <p className="text-muted-foreground text-lg">
          Develop robust online stores with secure payment integration and inventory management.
          Our eCommerce services provide complete solutions for selling products online.
        </p>
      </div>

      {/* Package Models */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Basic */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Basic</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">For small businesses starting their online store.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Product Catalog</li>
              <li>✔ Basic Shopping Cart</li>
              <li>✔ Payment Integration</li>
            </ul>
          </CardContent>
          <CardFooter  className="mt-auto">
            <WrapButton onClick={() => onPlanSelect("basic")} variant="green" className="border-0">Choose Basic</WrapButton>
          </CardFooter>
        </Card>

        {/* Plus */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Plus</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">For growing businesses needing advanced features.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Inventory Management</li>
              <li>✔ Customer Accounts</li>
              <li>✔ Order Tracking</li>
              <li>✔ Email Marketing</li>
            </ul>
          </CardContent>
          <CardFooter  className="mt-auto">
            <WrapButton onClick={() => onPlanSelect("plus")} variant="green" className="border-0">Choose Plus</WrapButton>
          </CardFooter>
        </Card>

        {/* Pro */}
        <Card className="rounded-2xl shadow-md hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Pro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">For large-scale eCommerce operations with enterprise features.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Multi-Vendor Support</li>
              <li>✔ Advanced Analytics</li>
              <li>✔ Custom Integrations</li>
              <li>✔ Mobile App</li>
              <li>✔ AI Recommendations</li>
            </ul>
          </CardContent>
          <CardFooter >
            <WrapButton onClick={() => onPlanSelect("pro")} variant="green" className="border-0">Choose Pro</WrapButton>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ECommerceDetail;
