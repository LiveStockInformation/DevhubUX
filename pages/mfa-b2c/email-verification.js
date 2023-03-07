import React, { useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { LsLink } from "../../components/LsLink";

export default function Home() {
  const router = useRouter();

  const breadcrumbs = ["home"];

  const organisations = [
    { label: "Select Organisation", value: "Select Organisation" },
    { label: "Livestock Information", value: "Livestock Information" },
    { label: "CFF", value: "CFF" },
  ];

  const errorMessages = {
    emptyFields: {
      heading: "Please fill in the empty required fields, as hightlighted.",
    },
    firstNameErrors: {
      heading: "The first name you've provided contains special characters.",
    },
    lastNameErrors: {
      heading: "The last name you've provided contains special characters.",
    },
    organisatationErrors: {
      heading: "You have not selected an orgainisation from the list.",
    },
    emailErrors: {
      heading: "The email you provided is not valid.",
      format: "Email does not follow the correct email format.",
    },
    mobileErrors: {
      heading: "Your mobile is not a UK valid number.",
    },
  };

  const goToMobile = () => {
    router.push("/mfa-b2c/mobile-verification");
  };

  return (
    <>
      <Head>
        <title>Livestock Information Service</title>
        <meta name="description" content="Livestock Information Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header highlight={"/signin"} />
      <div className="ls-width-container">
        <Breadcrumbs items={breadcrumbs} />
        <h1 onClick={() => {
              goToMobile();
            }}>Activate your account</h1>
        <div className="ls-grid-column-one-half">
          <p>
            A verification email has been sent to verify your email address.
          </p>
          <p className="m--b-xlarge">
            We have sent a confirmation email to{" "}
            <strong>emyr.tabrizi@glivestockinfirmation.org.uk</strong>
          </p>
          <p>
            Please complete activation of your Livestock Developerhub account,
            by clicking the verify link on the email.{" "}
          </p>

          <p className="m--b-xlarge">
            I have not received the email?{" "}
            <LsLink> Re-try sending email verification </LsLink>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
