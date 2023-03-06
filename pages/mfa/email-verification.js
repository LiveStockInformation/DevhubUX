import React, { useState } from "react";

import Head from "next/head";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { LsLink } from "../../components/LsLink";
import { Input } from "../../components/form/Input";
import { SelectMenu } from "../../components/form/SelectMenu";
import { Tooltip } from "../../components/Tooltip";

export default function Home() {
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

  let summary = [];
  const [errorHeadings, setErrorHeadings] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [organisation, setOrganisation] = useState("Select Organisation");
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorOrganisation, setErrorOrganisation] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);


  const setFirstNameMethod = (event) => {
    const firstNameText = event.target.value;
    setFirstName(firstNameText);
  };

  const setLastNameMethod = (event) => {
    const lastNameText = event.target.value;
    setLastName(lastNameText);
  };

  const setOrganisationMethod = (event) => {
    const organisationOption = event.target.value;
    setOrganisation(organisationOption);
  };

  const setEmailMethod = (event) => {
    const emailText = event.target.value;
    setEmail(emailText);
  };

  const setMobileNumberMethod = (event) => {
    const mobileNumber = event.target.value;
    setMobileNumber(mobileNumber);
  };


  const emailPattern = RegExp(
    "^[a-zA-Z0-9.!#$%&’'`*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  )

  const namePattern =/^[a-z ,.'-]+$/i;

  const mobilePattern = /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/;


  const submitForm = (event) => {
    event.preventDefault();
    if (firstName === "") {
      setErrorFirstName("Please enter your first name");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorFirstName(false);
      setErrorHeadings([])
      if (!namePattern.test(firstName)) {
        setErrorFirstName("Please enter a valid first name");
        summary.push(errorMessages.firstNameErrors.heading);
      }
    }
    if (lastName === "") {
      setErrorLastName("Please enter your last name");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorLastName(false);
      setErrorHeadings([])
      if (!namePattern.test(lastName)) {
        setErrorLastName("Please enter a valid last name");
        summary.push(errorMessages.lastNameErrors.heading);
      }
    }
    if (organisation === "Select Organisation") {
      setErrorOrganisation("Please select organisation");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorOrganisation(false)
      setErrorHeadings([])
    }
    if (email === "") {
      setErrorEmail("Please enter your email");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorEmail(false);
      setErrorHeadings([])
      if (!emailPattern.test(email)) {
        setErrorEmail("Please enter a valid email");
        summary.push(errorMessages.emailErrors.heading);
      }
    }
    if (mobileNumber === "") {
        setErrorMobile("Please enter your mobile");
        summary.push(errorMessages.emptyFields.heading);
      } else {
        setErrorEmail(false);
        setErrorHeadings([])
        if (!mobilePattern.test(mobileNumber)) {
          setErrorMobile("Please enter a valid mobile number");
          summary.push(errorMessages.mobileErrors.heading);
        }
      }
   

    let unique = [...new Set(summary)];

    setErrorHeadings(unique)
   
    if(unique.length > 0) {
      setShowErrorSummary(true);
    }else {
      setShowErrorSummary(false)
    }
   
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
        <h1>Activate your account</h1>
        <div className="ls-grid-column-one-half">
        <h2 className="m--b-xlarge">Step 3 - Please check your email</h2>
        <p>Now that you've completed mobile veriifcation, a verification email has been sent to verify your email address.</p>
        <p className="m--b-xlarge">We have sent a confirmation email to <strong>kijata9316@gpipes.com</strong></p>
        <p>Please complete activation of your Livestock Developerhub account, by clicking the verify link on the email.  </p>
          <div className={`form-errors  ${showErrorSummary ? "" : "hidden"}`}>
            <p>
              <strong>There is a problem</strong>
            </p>
            <div>
              {errorHeadings.map((error, i) => {
                return <p key={i}>{error}</p>;
              })}
            </div>
          </div>
          <form onSubmit={submitForm} >
          
           
           
            <p className="m--b-xlarge">
            I have not received the email? <LsLink> Re-try sending email verification </LsLink>
            </p>
          
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
