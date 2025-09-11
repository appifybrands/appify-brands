import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import WrapButton from "@/components/ui/wrap-button";

const FBDetail = ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => {
  return (
    <div className="mt-10 min-h-screen bg-background py-12 px-6 flex flex-col items-center">
      {/* Service Overview */}
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">F&B Services</h2>
        <p className="text-muted-foreground text-lg">
          Create attractive websites for food and beverage businesses to showcase menus and attract customers.
          Our F&B services include online ordering, menu display, and reservation systems.
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
            <p className="text-muted-foreground mb-4">For small restaurants or cafes needing a simple online presence.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Menu Display</li>
              <li>✔ Contact Information</li>
              <li>✔ Basic Website Layout</li>
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
            <p className="text-muted-foreground mb-4">For medium businesses needing online ordering and reservations.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Online Ordering</li>
              <li>✔ Reservation System</li>
              <li>✔ Photo Gallery</li>
              <li>✔ Customer Reviews</li>
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
            <p className="text-muted-foreground mb-4">For large chains or premium dining experiences with advanced features.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Multi-Location Support</li>
              <li>✔ Advanced Ordering System</li>
              <li>✔ Loyalty Programs</li>
              <li>✔ Analytics Dashboard</li>
              <li>✔ Custom Integrations</li>
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

export default FBDetail;
