import { Metadata } from "next";
import LegalLayout from "@/app/my_components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | AppifyBrands",
  description: "Learn how AppifyBrands collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "May 9, 2026";

  return (
    <LegalLayout 
      title="Privacy Policy" 
      subtitle={`Last updated: ${lastUpdated}`}
    >
      <section>
        <h2>1. Introduction</h2>
        <p>
          At <strong>AppifyBrands</strong>, we respect your privacy and are committed to protecting the 
          personal information you share with us. This Privacy Policy outlines how we collect, 
          use, and safeguard your data when you visit our website (https://appifybrands.com) or 
          engage with our services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, and project details 
          when you contact us via email, WhatsApp, or contact forms.</li>
          <li><strong>Usage Data:</strong> Information about how you interact with our website, such as 
          IP address, browser type, and pages visited.</li>
          <li><strong>Communication Data:</strong> Records of your communication with us for project 
          management and support.</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>
          We use the collected data for the following purposes:
        </p>
        <ul>
          <li>To provide and manage our web design and development services.</li>
          <li>To communicate with you regarding project updates, invoices, and support.</li>
          <li>To improve our website&apos;s user experience and analyze traffic.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies and Tracking</h2>
        <p>
          Our website uses cookies and similar tracking technologies to enhance your experience. 
          Cookies are small text files stored on your device that help us remember your preferences 
          and understand how you use our site.
        </p>
        <p>
          You can choose to disable cookies through your browser settings, though some features 
          of the site may not function properly as a result.
        </p>
      </section>

      <section>
        <h2>5. Third-Party Integrations</h2>
        <p>
          We may use third-party tools and integrations (such as Google Analytics, Framer Motion, 
          Spline, and hosting providers) that may collect data according to their own privacy policies. 
          We encourage you to review the privacy policies of these third parties.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information from 
          unauthorized access, disclosure, or alteration. However, no method of transmission 
          over the internet or electronic storage is 100% secure.
        </p>
      </section>

      <section>
        <h2>7. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes 
          outlined in this policy or as required by law.
        </p>
      </section>

      <section>
        <h2>8. Your Rights</h2>
        <p>
          Depending on your location, you may have rights regarding your personal data, including 
          the right to access, correct, or delete your information. To exercise these rights, 
          please contact us at <strong>appifybrands@gmail.com</strong>.
        </p>
      </section>

      <section>
        <h2>9. International Transfers</h2>
        <p>
          As we serve both local (India) and international clients, your data may be processed 
          in countries other than your own. By using our services, you consent to these transfers.
        </p>
      </section>

      <section>
        <h2>10. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. Any changes will be posted on 
          this page with an updated &quot;Last updated&quot; date.
        </p>
      </section>

      <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
        <p className="mb-0 text-[var(--text-primary)] font-medium">
          Privacy concerns?
        </p>
        <a 
          href="mailto:appifybrands@gmail.com" 
          className="text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
        >
          Email our Privacy Team
        </a>
      </div>
    </LegalLayout>
  );
}
