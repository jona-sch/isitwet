import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { PageLayout } from './utils/PageLayout';
import { TutorialFeature } from './tutorial/TutorialFeature';

import isItWetBrand from "./icons/brand-color.svg";

export const Home = () => {

    const featuresList = [
        {
          title: "1. Create an account",
          description:
            "Just click sign up at the top right.",
          icon: "add-symbol",
        },
        {
          title: "2. Create your location",
          description:
            "You can create your location using exact coordinates or with our interactive map.",
          icon: "location-symbol",
        },
        {
          title: "3. Check out the weather",
          description:
            "We offer a simple overview or detailed charts for the weather: 2 previous days, today and tomorrow.",
          icon: "weather-symbol",
        },
        {
          title: "4. Go climb ! Or change your plans",
          description:
            "You have everything, now make a choice :)",
          icon: "climb-symbol",
        },
      ];

    return (
        <PageLayout>
          <div className="banner banner--pink-yellow">
              <div className="banner__logo">
                  <img className="banner__image" src={isItWetBrand} alt="IsItWet logo" />
              </div>
              <h1 className="banner__headline">IsItWet</h1>
              <p className="banner__description">
                  A cool website to check conditions for the day, but also (and most
                  importantly), conditions for the two previous days. <br></br>
                  Just select the location, if needed create it, and plan your day accordingly:
              </p>
              <NavLink tag={Link} to="/locations"><a
                  id="back_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button--secondary"
              >
                  Check out locations →
              </a></NavLink>
          </div>
          <div className="isitwet-features">
            <h2 className="isitwet-features__title">IsItWet Tutorial</h2>
            <div className="isitwet-features__grid">
                {featuresList.map((feature) => (
                <TutorialFeature
                    key={feature.resourceUrl}
                    title={feature.title}
                    description={feature.description}
                    resourceUrl={feature.resourceUrl}
                    icon={feature.icon}
                />
                ))}
             </div>
          </div>
        </PageLayout>
    );
}
export default Home;