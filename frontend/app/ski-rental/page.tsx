import MasterLayout from "@/components/layout/MasterLayout";
import React from "react";
import ExclusiveService from "@/components/sections/ExclusiveService";
import Iframe from "@/components/sections/Iframe";
import SkirentalBottom from "@/components/sections/SkiRentalBottom";
import SkiRentalDesc from "@/components/sections/SkiRentalDesc";
import SkiRentalHeroBanner from "@/components/sections/SkiRentalHeroBanner";

export default async function SkiRental() {
  return (
      <MasterLayout>
        {/* <SkiRentalHeroBanner /> */}
        <Iframe />
        <SkiRentalDesc />
        {/* Passing details as a prop */}
        {/* <SkirentalBottom /> */}
        <ExclusiveService />
      </MasterLayout>
  );
}
