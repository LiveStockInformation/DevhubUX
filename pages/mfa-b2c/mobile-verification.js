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


  const errorMessages = {
    emptyFields: {
      heading: "Please fill in the empty required fields, as hightlighted.",
    },
    confirmMobileErrors: {
      heading: "The verifcation code you have entered needs to be 6 digits.",
    },
    verifyErrors: {
      heading: "The verification code you have entered does not match our records. Please try again, or request a new code."
    }
  };

  let summary = [];

  const [errorHeadings, setErrorHeadings] = useState([]);
  const [mobile, setMobile] = useState("");
  const [showErrorSummary, setShowErrorSummary] = useState(false);
  
  const [showVerifyCode, setShowVerifyCode] = useState(null);
  const [sendCode, setSendCode] = useState(false);

  const [errorVerify, setErrorVerify] = useState(false);

  const countryCodes = [
    { label : 'United Kingdom (+44)', value : 'United Kingdom (+44)'},
    { label : 'Ireland (+353)', value : 'Ireland (+353)'},
  ]

  const setMobileMethod = (event) => {
    const mobileNumber = event.target.value;
    setMobile(mobileNumber);
  };

  const setVerifyCodeMethod = (event) => {
    const code = event.target.value;
    setSendCode(code);
  }

  const verifyCode = () => {
    if(mobile.length > 10) {
      setShowVerifyCode(true);
    }else{

    }
  }

  const submitCode = (event) => {
    event.preventDefault();
    console.log(sendCode)
    if(sendCode === '123456') {
      setErrorVerify(false)
      setShowErrorSummary(false)
      setErrorHeadings([])
      alert('Logs you into Developerhub')
    }else{
      setErrorVerify("Please enter a valid verification code");
      setShowErrorSummary(true);
      summary.push(errorMessages.verifyErrors.heading);
      setErrorHeadings(summary);
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
        <p className="bold">Enter a number below that we can send a code via SMS or phone to authenticate you.</p>
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
          <div className={showVerifyCode ? 'hidden' : ''}>
          <SelectMenu items={countryCodes} defaultValue={'United Kingdom (+44)'} label="Country Code"/>
          <Input className="m--b-large" label="Phone Number" onChange={setMobileMethod} placeholder="Phone Number" />  
            <LsLink disabled={mobile.length < 10} onClick={()=> {verifyCode()}} type="submit">Send Code</LsLink>
            </div>
          <div className={showVerifyCode ? '' : 'hidden'}>
            <p className="align-center bold">+4407850174596</p>
            <p>Enter your verification code below, or <LsLink>send a new code</LsLink>.</p>
            <Input className="m--b-large" onChange={setVerifyCodeMethod} maxLength={6}  error={errorVerify}/>  
            <LsLink disabled={sendCode.length !== 6} onClick={submitCode} type="button">Verify Code</LsLink>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
