import React, { useState } from "react";

import Head from "next/head";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Breadcrumbs } from "../components/Breadcrumbs";

import { LsLink } from "../components/LsLink";
import { Input } from "../components/form/Input";
import { SelectMenu } from "../components/form/SelectMenu";

export default function Home() {
  const items = ["test"];
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
    passwordErrors: {
      heading: "The password you have entered is not valid. Your Password must contain  at least 1 uppercase letter, 1 lowercase letter, 1 special character and 1 number. ",
    },
    confirmPasswordErrors: {
      heading: "The confirmation password you have entered does not match the password. ",
    },
  };

  const [errorList, setErrorList] = useState([]);
  const [errorHeadings, setErrorHeadings] = useState([]);

  let summary = [];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("Select Organisation");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showErrorSummary, setShowErrorSummary] = useState(false);

  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorOrganisation, setErrorOrganisation] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);

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

  const setPasswordMethod = (event) => {
    const passwordText = event.target.value;
    setPassword(passwordText);
  };

  const setConfirmPasswordMethod = (event) => {
    const passwordConfirmText = event.target.value;
    setConfirmPassword(passwordConfirmText);
  };

  const emailPattern = RegExp(
    "^[a-zA-Z0-9.!#$%&’'`*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  )

  const namePattern =/^[a-z ,.'-]+$/i;

  const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

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
    if (password === "") {
      setErrorPassword("Please enter a password");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorPassword(false);
      setErrorHeadings([])
      if (!passwordPattern.test(password)) {
        setErrorPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
      }
    }
    if (confirmPassword === "") {
      setErrorConfirmPassword("Please confirm a password");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorConfirmPassword(false);
      setErrorHeadings([])
      if (!passwordPattern.test(confirmPassword)) {
        setErrorConfirmPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
      }
      if (confirmPassword !== password) {
        setErrorConfirmPassword("Sorry, your password does not match");
        summary.push(errorMessages.confirmPasswordErrors.heading);
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
        <Breadcrumbs items={items} />
        <h1>Create an account</h1>
        <p className="m--b-xxlarge">
          If you already have an account <LsLink>sign in</LsLink>.
        </p>
        <div className="ls-grid-column-one-half">
          <div className={`form-errors ${showErrorSummary ? "" : "hidden"}`}>
            <p>
              <strong>There is a problem</strong>
            </p>
            <div>
              {errorHeadings.map((error, i) => {
                return <p key={i}>{error}</p>;
              })}
            </div>
            <ul>
              {errorList.map((error, i) => {
                <li key={i}>{error}</li>;
              })}
            </ul>
          </div>
          <form onSubmit={submitForm}>
            <Input
              error={errorFirstName}
              label="First Name"
              onChange={setFirstNameMethod}
              value={firstName}
              placeholder="First Name"
            />
            <Input
              error={errorLastName}
              label="Last Name"
              onChange={setLastNameMethod}
              value={lastName}
              placeholder="Last Name"
            />
            <Input
              error={errorEmail}
              label="Email address"
              onChange={setEmailMethod}
              value={email}
              placeholder="Email address"
            />
            <SelectMenu
              error={errorOrganisation}
              defaultValue={organisation}
              onChange={setOrganisationMethod}
              items={organisations}
              label="Select Organisation"
            />
            <Input
              error={errorPassword}
              label="Create Password"
              type="password"
              value={password}
              onChange={setPasswordMethod}
              placeholder="Create Password"
              hint="At least 8 characters. A combination of uppercase letters, lowercase letters, numbers and symbols."
            />
            <Input
              error={errorConfirmPassword}
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              className="m--b-large"
              onChange={setConfirmPasswordMethod}
              value={confirmPassword}
            />
            <p className="m--b-xlarge">
              By creating an account you agree to our{" "}
              <a href="https://dev-developers.livestockinformation.org.uk/documentation/terms-of-use">
                terms and conditions,
              </a>{" "}
              <a href="https://dev-developers.livestockinformation.org.uk/privacy-policy">
                privacy policy
              </a>{" "}
              and{" "}
              <a href="https://dev-developers.livestockinformation.org.uk/cookies">
                cookie policy
              </a>
              .
            </p>
            <LsLink type="submit"> Create Account</LsLink>
            <LsLink type="button" className="m--l-large" styleClear>
              Cancel
            </LsLink>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
