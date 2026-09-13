"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "../_lib/api";
import type { Settings } from "../_lib/types";

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    api
      .get<Settings>("/settings")
      .then(setSettings)
      .catch(() => {});
  }, []);

  return (
    <div className="vs-footer-wrapper" id="contact">
      <footer className="vs-footer">
        <div className="vs-container">
          <div className="vs-footer-grid">
            <div className="vs-footer-brand-col">
              <div className="vs-footer-logo">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginRight: 8 }}
                >
                  <path
                    d="M12 2L2 22H6L12 10L18 22H22L12 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 10L6 22H10L12 16L14 22H18L12 10Z"
                    fill="currentColor"
                    fillOpacity="0.5"
                  />
                </svg>
                AURA VILLAS
              </div>
              <p>
                A curated collection of private villas designed for ultimate
                relaxation, where architecture naturally blends with its
                surroundings.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <Link href="/real-estate/demo5/villas">All Villas</Link>
              <a href="#featured">Featured</a>
              <a href="#about">Story</a>
            </div>
            <div>
              <h4>Concierge</h4>
              <a
                href={`mailto:${settings?.contactEmail || "hello@auravillas.com"}`}
              >
                {settings?.contactEmail || "hello@auravillas.com"}
              </a>
              <a href={`tel:${settings?.phone || "+1 234 567 890"}`}>
                {settings?.phone || "+1 234 567 890"}
              </a>
            </div>
            <div>
              <h4>Follow</h4>
              <a href={settings?.socialLinks?.instagram || "#"}>Instagram</a>
              <a href={settings?.socialLinks?.facebook || "#"}>Facebook</a>
              <a href={settings?.socialLinks?.twitter || "#"}>Twitter</a>
            </div>
          </div>
          <div className="vs-footer-bottom">
            <span>
              © {new Date().getFullYear()} AURA VILLAS. All rights reserved.
            </span>
            <span>Privacy · Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
