"use client";

import Link from "next/link";
import { MapPin, BedDouble, Bath, Users } from "lucide-react";
import type { Villa } from "../_lib/types";
import { VillaImage } from "./VillaImage";

function currency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export function VillaCard({ villa }: { villa: Villa }) {
  return (
    <Link
      href={`/real-estate/demo5/villas/${villa.slug}`}
      className="vs-card"
      style={{ textDecoration: "none" }}
    >
      <div className="vs-card-img">
        <VillaImage
          src={villa.featuredImage}
          alt={villa.title}
          fallbackLabel={villa.title.slice(0, 2).toUpperCase()}
        />
        {villa.featured && <span className="vs-card-tag">Featured</span>}
      </div>
      <div className="vs-card-body">
        <span className="vs-card-loc">
          <MapPin size={14} /> {villa.location}
        </span>
        <h3 className="vs-card-title">{villa.title}</h3>
        <div className="vs-card-meta">
          <span>
            <BedDouble size={14} /> {villa.bedrooms} beds
          </span>
          <span>
            <Bath size={14} /> {villa.bathrooms} baths
          </span>
          <span>
            <Users size={14} /> up to {villa.maxGuests}
          </span>
        </div>
        <div className="vs-card-foot">
          <div className="vs-card-price">
            {currency(villa.pricePerNight)}
            <small>/ night</small>
          </div>
          <span className="vs-card-link">View →</span>
        </div>
      </div>
    </Link>
  );
}
