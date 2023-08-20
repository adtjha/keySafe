import React from "react";
import importPage from "../../images/Import_API_page.png";
import { FullScreenCard } from "./FullScreenCard";

export const Features = () => {
  const cards = [
    {
      data: {
        head: ["max out your api potential."],
        tag: ["Take Your API Calls to the Next Level using analytics"],
        body: ` Know what's working and what's not, set custom meta tags for your analytics and easily manage user accesses. Sharing your API with your partners and customers is now easier than ever. Create, edit and delete meta tags in real
            time. Get a detailed analytics report for each of your endpoint at the click of a button.`,
        button: "Get real-time insights",
        imgSrc: importPage,
      },
      style: {
        backgroundColor: "#e8fff7",
        buttonColor: "#4db380",
      },
    },
    {
      data: {
        head: ["effortless credential management."],
        tag: ["Simplify API access and management with keysafe"],
        body: `Our API authentication solution enables developers to create applications that can focus on creating, rather than managing user credentials. You want to know how your API is doing. You want to edit access rights easily and
            quickly. You don't want to integrate manual editing. We got it all covered.`,
        button: "Try for a week now.",
        imgSrc: importPage,
      },
      style: {
        backgroundColor: "aliceblue",
        buttonColor: "#3977ac",
      },
    },
    {
      data: {
        head: ["quick integration."],
        tag: ["go live within minutes not days"],
        body: " With minimal integration and setup, you can quickly and easily manage API access tokens and users, track the performance of your APIs, and share them with partners and customers.",
        button: "Try for a week now.",
        imgSrc: importPage,
      },
      style: {
        backgroundColor: "#f0ebfa",
        buttonColor: "#7359a6",
      },
    },
  ];

  return (
    <React.Fragment>
      {cards.map((card) => (
        <FullScreenCard data={card.data} style={card.style} />
      ))}
    </React.Fragment>
  );
};
