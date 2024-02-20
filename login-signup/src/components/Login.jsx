import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import OtpInput from "./OtpInput";

export const Login = () => {
  const [phonenumber, setPhonenumber] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const phoneInput = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /[^0-9]/g;
    if(phonenumber.length > 10 || regex.test(phonenumber || phonenumber < 10)){
        alert("inavlid phone number");
        return;
    }
    console.log(phonenumber);
    setShowOtpInput(true);
  };

  useEffect(()=>{
    if(phoneInput?.current){
      phoneInput.current?.focus();
    }
  })

  const handlePhonenumber = (e) =>{
    const {value} = e.target;
    setPhonenumber(value)
    console.log(value);
  }

  const onOtpSubmit  =(otp)=>{
    console.log("Login successful",otp);
  }
  return (
    <div>
        {!showOtpInput ?(
            <>
                <h2
                    style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                    }}
                >
                    Login with Phone
                </h2>
                <form onSubmit={handleSubmit} style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input type="tel" value={phonenumber} ref={phoneInput} onChange={handlePhonenumber}/>
                    <button type="submit">Submit</button>
                </form>
            </>
        ):
        (
          <>
          
            <div style={{textAlign:'center', marginTop:'20px'}}>Enter otp sent to {phonenumber}</div>
            <div style={{display:'flex', gap:'16px', justifyContent:'center', marginTop:'20px'}}>
                <OtpInput onOtpSubmit={onOtpSubmit}/>
            </div>
          </>
        )}
    </div>
  );
};
