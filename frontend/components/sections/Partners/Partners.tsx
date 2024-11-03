"use client";
import React, { Fragment } from "react";
import PricingCards from "./PricingCards";

export interface Partners {
  id: number;
  content_for: string;
  title: string;
  sub_title: string;
  pricing_cards?: string;
  company_benifits?: string;
  image: string;
  status: string;
}
export interface ParterTypes {
  partners: Partners[];
}
export default function Partners({ partners }: ParterTypes) {
  return (
    <>
      <div className="box-grid-tours wow fadeIn">
        <div className="row">
          <div className="box-list-flights box-list-flights-2">
            {partners && partners?.map((partner,index) =>(
                <Fragment key={index}>
                    <PricingCards partner={partner}/>
                </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
