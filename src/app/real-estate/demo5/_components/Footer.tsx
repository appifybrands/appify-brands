"use client";

import { useEffect, useState } from "react";
import { api } from "../_lib/api";
import type { Settings } from "../_lib/types";

const DEFAULTS: Pick<
  Settings,
  "companyName" | "contactEmail" | "phone" | "socialLinks"
> = {
  companyName: "Villa Suite",
  contactEmail: "hello@villasuite.co",
  phone: "+1 (212) 555-0100",
  socialLinks: { instagram: "#", facebook: "#", twitter: "#" },
};

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    api
      .get<Settings>("/settings")
      .then(setSettings)
      .catch(() => {});
  }, []);

  const s = settings ?? (DEFAULTS as Settings);

  return (
    <footer className="vs-footer" id="contact">
      <div className="vs-container">
        <div className="vs-footer-grid">
          <div>
            <div className="vs-brand" style={{ color: "#fff" }}>
              {s.companyName.split(" ")[0]}
              <span style={{ color: "var(--vs-accent)" }}>
                {s.companyName.split(" ").slice(1).join(" ") || "Suite"}
              </span>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                marginTop: 16,
                maxWidth: 320,
              }}
            >
              A curated collection of private villas across the world&apos;s
              most storied coastlines and cities.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <a href="/real-estate/demo5/villas">All stays</a>
            <a href="#experiences">Experiences</a>
            <a href="#about">Our story</a>
          </div>
          <div>
            <h4>Concierge</h4>
            <a href={`mailto:${s.contactEmail}`}>{s.contactEmail}</a>
            <a href={`tel:${s.phone}`}>{s.phone}</a>
          </div>
          <div>
            <h4>Follow</h4>
            <a href={s.socialLinks.instagram}>Instagram</a>
            <a href={s.socialLinks.facebook}>Facebook</a>
            <a href={s.socialLinks.twitter}>Twitter</a>
          </div>
        </div>
        <div className="vs-footer-bottom">
          <span>
            © {new Date().getFullYear()} {s.companyName}. All rights reserved.
          </span>
          <span>Privacy · Terms</span>
        </div>
      </div>
    </footer>
  );
}
