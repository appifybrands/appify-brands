import { Metadata } from "next";
import LegalLayout from "@/app/my_components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund Policy | AppifyBrands",
  description: "Review the refund and cancellation policy for digital services at AppifyBrands.",
};

export default function RefundPolicy() {
  const lastUpdated = "May 9, 2026";

  return (
    <LegalLayout 
      title="Refund Policy" 
      subtitle={`Last updated: ${lastUpdated}`}
    >
      <section>
        <h2>1. Nature of Our Services</h2>
        <p>
          <strong>AppifyBrands</strong> provides highly customized digital services, including web design, 
          UI/UX development, and custom React applications. Due to the labor-intensive nature of 
          bespoke design and development work, our refund policy is structured as follows.
        </p>
      </section>

      <section>
        <h2>2. Deposits and Upfront Payments</h2>
        <p>
          The initial deposit or upfront payment made at the start of a project is 
          <strong> non-refundable</strong>. This payment secures your project slot and covers the 
          initial research, planning, and design phases.
        </p>
      </section>

      <section>
        <h2>3. Milestone-Based Refunds</h2>
        <p>
          For projects structured with milestone payments:
        </p>
        <ul>
          <li>Payments made for completed milestones are non-refundable.</li>
          <li>If a project is cancelled by the client before a milestone is completed, the payment 
          for that specific milestone may be partially refundable, minus the hours already 
          invested by our team.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cancellation by Client</h2>
        <p>
          If you wish to cancel a project, you must provide written notice via email to 
          <strong>appifybrands@gmail.com</strong>. Upon cancellation:
        </p>
        <ul>
          <li>All work completed up to the date of cancellation will be billed.</li>
          <li>Any remaining balance for work not yet started will not be charged.</li>
          <li>No refunds will be issued for work already delivered or approved.</li>
        </ul>
      </section>

      <section>
        <h2>5. Eligibility for Refunds</h2>
        <p>
          Refunds are only considered in the following exceptional circumstances:
        </p>
        <ul>
          <li>AppifyBrands is unable to complete the project as per the agreed scope for reasons 
          internal to the agency.</li>
          <li>Work has not commenced on the project or a specific milestone within 14 days of 
          the scheduled start date.</li>
        </ul>
      </section>

      <section>
        <h2>6. Revision Policy vs. Refund</h2>
        <p>
          We are committed to client satisfaction. If you are unhappy with a design or development 
          phase, we encourage you to use the included revision rounds to achieve the desired result. 
          Dissatisfaction with creative direction is not a valid ground for a refund once the 
          work has been produced and revisions have been offered.
        </p>
      </section>

      <section>
        <h2>7. Final Delivery</h2>
        <p>
          Once the final project files have been delivered, the website has been deployed, or 
          ownership of the code has been transferred, <strong>no refunds</strong> will be issued 
          under any circumstances.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding our Refund Policy, please contact us 
          at <strong>appifybrands@gmail.com</strong> before initiating a project.
        </p>
      </section>

      <div className="mt-12 p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center">
        <p className="mb-0 text-[var(--text-primary)] font-medium">
          Need clarification on refunds?
        </p>
        <a 
          href="mailto:appifybrands@gmail.com" 
          className="text-sm font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
        >
          Talk to our Billing Team
        </a>
      </div>
    </LegalLayout>
  );
}
