import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import WrapButton from "@/components/ui/wrap-button";

const UITransformationDetail = ({ onPlanSelect }: { onPlanSelect: (plan: string) => void }) => {
  return (
    <div className="mt-10 min-h-screen bg-background py-12 px-6 flex flex-col items-center">
      {/* Service Overview */}
      <div className="max-w-3xl text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">UI Transformation Services</h2>
        <p className="text-muted-foreground text-lg">
          Transform your user interfaces with modern design, improved usability, and responsive layouts.
          Our UI transformation services focus on enhancing user experience and visual appeal.
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
            <p className="text-muted-foreground mb-4">For small projects or simple UI updates.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Wireframing</li>
              <li>✔ Basic UI Design</li>
              <li>✔ Responsive Layout</li>
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
            <p className="text-muted-foreground mb-4">For medium projects needing interactive elements.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Prototyping</li>
              <li>✔ Interactive Elements</li>
              <li>✔ User Testing</li>
              <li>✔ Advanced Layouts</li>
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
            <p className="text-muted-foreground mb-4">For large-scale UI overhauls and complex designs.</p>
            <ul className="text-sm space-y-2 mb-6">
              <li>✔ Full Redesign</li>
              <li>✔ Advanced Animations</li>
              <li>✔ Accessibility Compliance</li>
              <li>✔ Multi-Device Optimization</li>
              <li>✔ Performance Optimization</li>
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

export default UITransformationDetail;
