"use client";

import { redirect } from "next/navigation";
import { URL_LOGIN } from "@/constants/urls";
import LadingPageHeaderContainer from "@/modules/lading-page/header/lading-page-header.container";
import LadingPageHeroContainer from "@/modules/lading-page/hero/lading-page-hero.container";
import DetailsCardContainer from "@/modules/lading-page/details-card/details-card.container";
import CardMultiStoresContainer from "@/modules/lading-page/card-multi-stores/card-multi-stores.container";
import PlansContainer from "@/modules/lading-page/plans/plans.container";
import FAQContainer from "@/modules/lading-page/FAQ/faq.container";
import FooterContainer from "@/modules/lading-page/footer/footer.container";
import TestimonialsContainer from "@/modules/lading-page/testimonials/testimonials.container";

export default function Home() {
  return (
    <>
      <LadingPageHeaderContainer />
      <div className="flex flex-col  min-h-screen">
        <LadingPageHeroContainer />
        <div
          style={{ margin: "4rem" }}
          className="flex flex-col items-center justify-center"
        >
          <CardMultiStoresContainer />
          <DetailsCardContainer />
        </div>
        <TestimonialsContainer />
        <div
          style={{ padding: "4rem" }}
          className="flex flex-col items-center justify-center bg-blue-900"
        >
          <PlansContainer />
        </div>
        <FAQContainer />
        <FooterContainer />
      </div>
    </>
  );
}
