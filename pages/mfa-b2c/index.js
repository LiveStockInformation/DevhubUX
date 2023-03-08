import React, { useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { LsLink } from "../../components/LsLink";
import { Input } from "../../components/form/Input";
import { SelectMenu } from "../../components/form/SelectMenu";


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
    passwordErrors: {
      heading: "The password you have entered is not valid.",
      uppercase: "The password must contain at least 1 Uppercase character.",
      lowercase: "The password must contain at least 1 Lowercase character.",
      number: "The password must contain at least 1 Number.",
      symbol: "The password must contain at least 1 Symbol.",
      length: "The password must be at least 8 characters long.",
    },
    confirmPasswordErrors: {
      heading:
        "The confirmation password you have entered does not match the password. ",
    },
  };

  let summary = [];
  let listSummary = [];

  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("Select Organisation");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorHeadings, setErrorHeadings] = useState([]);
  const [errorList, setErrorList] = useState([]);
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

  const uppercasePattern = /[A-Z]/;

  const lowercasePattern = /[a-z]/;

  const numberPattern = /[0-9]/;

  const symbolPattern = /[^A-Za-z0-9]/;

  const emailPattern = RegExp(
    "^[a-zA-Z0-9.!#$%&’'`*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  );

  const namePattern =/^[a-z ,.'-]+$/i;

  const submitForm = (event) => {
    event.preventDefault();
    if (firstName === "") {
      setErrorFirstName("Please enter your first name");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorFirstName(false);
      setErrorHeadings([]);
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
      setErrorHeadings([]);
      setErrorList([]);
      if (!namePattern.test(lastName)) {
        setErrorLastName("Please enter a valid last name");
        summary.push(errorMessages.lastNameErrors.heading);
      }
    }
    if (organisation === "Select Organisation") {
      setErrorOrganisation("Please select organisation");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorOrganisation(false);
      setErrorHeadings([]);
      setErrorList([]);
    }
    if (email === "") {
      setErrorEmail("Please enter your email");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorEmail(false);
      setErrorHeadings([]);
      setErrorList([]);
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
      setErrorHeadings([]);
      setErrorList([]);
      if (!uppercasePattern.test(password)) {
        setErrorPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
        listSummary.push(errorMessages.passwordErrors.uppercase);
      }
      if (!lowercasePattern.test(password)) {
        setErrorPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
        listSummary.push(errorMessages.passwordErrors.lowercase);
      }
      if (!numberPattern.test(password)) {
        setErrorPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
        listSummary.push(errorMessages.passwordErrors.number);
      }
      if (!symbolPattern.test(password)) {
        setErrorPassword("Please enter a valid password");
        listSummary.push(errorMessages.passwordErrors.symbol);
      }
      if (password.length < 8) {
        setErrorPassword("Please enter a valid password");
        summary.push(errorMessages.passwordErrors.heading);
        listSummary.push(errorMessages.passwordErrors.length);
      }
    }
    if (confirmPassword === "") {
      setErrorConfirmPassword("Please confirm a password");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorConfirmPassword(false);
      setErrorHeadings([]);
      setErrorList([]);
      if (confirmPassword !== password) {
        setErrorConfirmPassword("Sorry, your password does not match");
        summary.push(errorMessages.confirmPasswordErrors.heading);
      }
    }

    let unique = [...new Set(summary)];

    setErrorHeadings(unique);

    setErrorList(listSummary);

    if (unique.length > 0) {
      setShowErrorSummary(true);
    } else {
      setShowErrorSummary(false);
      router.push("/mfa-b2c/email-verification");
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
        <h1>Create an account</h1>
        <p className="m--b-xlarge">
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
              <ul>
                {errorList.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
              </ul>
            </div>
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

            <p>
              Please contact our <LsLink>support</LsLink> team, if your
              orgainisation is not available.{" "}
            </p>

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
