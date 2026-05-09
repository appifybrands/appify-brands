import { Metadata } from "next";
import LegalLayout from "@/app/my_components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service | AppifyBrands",
  description: "Read the Terms of Service for AppifyBrands, a premier web design and landing page agency.",
};

export default function TermsOfService() {
  const lastUpdated = "May 9, 2026";

  return (
    <LegalLayout 
      title="Terms of Service" 
      subtitle={`Last updated: ${lastUpdated}`}
    >
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by <strong>AppifyBrands</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), 
          a web design and landing page agency based in India, you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, please do not use our services.
        </p>
      </section>

      <section>
        <h2>2. Services Provided</h2>
        <p>
          AppifyBrands offers digital services including but not limited to:
        </p>
        <ul>
          <li>Landing page design and React development</li>
          <li>UI/UX design and Branding</li>
          <li>Portfolio websites and Startup web solutions</li>
          <li>Booking-focused websites for villas, homestays, and businesses</li>
          <li>Custom digital experience engineering</li>
        </ul>
      </section>

      <section>
        <h2>3. Communication</h2>
        <p>
          Our primary modes of communication for project updates, feedback, and support are:
        </p>
        <ul>
          <li>Email: <strong>appifybrands@gmail.com</strong></li>
          <li>WhatsApp: (Project specific contact provided upon onboarding)</li>
        </ul>
        <p>
          While we strive for prompt responses, we do not guarantee 24/7 availability.
        </p>
      </section>

      <section>
        <h2>4. Project Timelines & Scope</h2>
        <p>
          Project timelines provided during the proposal phase are estimates. Actual completion dates may vary 
          depending on the complexity of the project, client feedback cycles, and the timely provision of 
          required assets.
        </p>
        <p>
          Any work requested outside the initial agreed scope will be subject to additional fees and 
          timeline adjustments.
        </p>
      </section>

      <section>
        <h2>5. Client Responsibilities</h2>
        <p>
          The client is responsible for providing all necessary content, images, branding assets, 
          and feedback required to complete the project. Delays in providing these assets will 
          result in project timeline extensions.
        </p>
        <p>
          The client warrants that they own the rights to all materials provided to AppifyBrands for 
          use in the project.
        </p>
      </section>

      <section>
        <h2>6. Payment Terms</h2>
        <p>
          Payments are typically structured as a percentage upfront (deposit) and the remaining 
          balance upon project completion or milestones. Specific payment terms will be outlined 
          in your project proposal.
        </p>
        <p>
          We reserve the right to pause work if payments are not made according to the agreed schedule.
        </p>
      </section>

      <section>
        <h2>7. Revisions</h2>
        <p>
          Each project includes a specific number of revision rounds as defined in the project proposal. 
          Additional revisions beyond the included rounds will be billed at our hourly rate or a 
          flat fee per revision.
        </p>
      </section>

      <section>
        <h2>8. No Guarantee of Results</h2>
        <p>
          While we use industry best practices to design high-converting landing pages and 
          websites, AppifyBrands does not guarantee specific business results, sales, 
          conversions, or search engine rankings.
        </p>
      </section>

      <section>
        <h2>9. Intellectual Property</h2>
        <p>
          Upon final payment, the client receives ownership of the final digital product (the code 
          and design assets created specifically for the project). AppifyBrands retains the right 
          to showcase the work in our portfolio and marketing materials unless a Non-Disclosure 
          Agreement (NDA) is in place.
        </p>
      </section>

      <section>
        <h2>10. Limitation of Liability</h2>
        <p>
          AppifyBrands shall not be liable for any indirect, incidental, or consequential damages 
          arising from the use of our services or the digital products we create.
        </p>
      </section>

      <section>
        <h2>11. Governing Law</h2>
        <p>
          These terms are governed by and construed in accordance with the laws of India. 
          Any disputes arising out of these terms shall be subject to the exclusive jurisdiction 
          of the courts in India.
        </p>
      </section>

      <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
        <p className="mb-0 text-[var(--text-primary)] font-medium">
          Have questions about our terms?
        </p>
        <a 
          href="mailto:appifybrands@gmail.com" 
          className="text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
        >
          Contact Support
        </a>
      </div>
    </LegalLayout>
  );
}
