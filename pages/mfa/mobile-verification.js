import React, { useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Breadcrumbs } from "../../components/Breadcrumbs";

import { LsLink } from "../../components/LsLink";
import { Input } from "../../components/form/Input";


export default function Home() {

  const router = useRouter();

  const breadcrumbs = ["home"];


  const errorMessages = {
    emptyFields: {
      heading: "Please fill in the empty required fields, as hightlighted.",
    },
    confirmMobileErrors: {
      heading: "The verifcation code is not 6 digits.",
    }
  };

  let summary = [];
  const [errorHeadings, setErrorHeadings] = useState([]);
  const [confirmMobile, setConfirmMobile] = useState("");
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  const [errorMobile, setErrorMobile] = useState(false);


  const setConfirmMobileMethod = (event) => {
    const confirmNumber = event.target.value;
    setConfirmMobile(confirmNumber);
  };



  const submitForm = (event) => {

    event.preventDefault();
    
    if (confirmMobile === "") {
      setErrorMobile("Please enter verification code");
      summary.push(errorMessages.emptyFields.heading);
    } else {
      setErrorMobile(false);
      setErrorHeadings([])
      if (confirmMobile.length !== 6) {
        setErrorMobile("Please enter a 6 digit code");
        summary.push(errorMessages.confirmMobileErrors.heading);
      }
    }


    let unique = [...new Set(summary)];

    setErrorHeadings(unique)


    if(unique.length > 0) {
      setShowErrorSummary(true);
    }else {
      setShowErrorSummary(false);
      router.push("/mfa/email-verification");
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
        <h1>Verify your mobile number</h1>
        <div className="ls-grid-column-one-half">
        <h2 className="m--b-xlarge">Step 2 - Please check your mobile</h2>
        <p className="bold">We've sent you a verification code to *******111</p>
        <p className="m--b-xlarge">It might take a few minutes to arrive. The code will expire after 2 hours.</p>
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
          
            <Input
              error={errorMobile}
              label="Enter the 6 digit verification code"
              onChange={setConfirmMobileMethod}
              value={confirmMobile}
              maxLength={6}
            />
           
            <p className="m--b-xlarge">
              There's a problem with my code? <LsLink>Re-try sending code</LsLink>
            </p>
            <LsLink type="submit"> Continue</LsLink>
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
