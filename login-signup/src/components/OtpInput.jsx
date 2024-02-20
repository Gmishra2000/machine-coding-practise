import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({onOtpSubmit = ()=>{}}) => {
  let otpLength = 4;
  const [otp, setOtp] = useState(new Array(otpLength).fill(""));
  const otpinputref = useRef([]);

  useEffect(() => {
    if(otpinputref.current[0]){
      otpinputref.current[0]?.focus();
    }
    // console.log(otpinputref.current[0]);
  }, []);

  const handleChange = (index,e)=>{
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const finalOtp = newOtp.join("");
    if(finalOtp.length === otpLength) onOtpSubmit(finalOtp);

    if(value && index < otpLength -1 && otpinputref.current[index+1]){
      console.log('i');
      otpinputref.current[index+1].focus();
    }

  }

  const handleKeyDown = (index,e) =>{
    if(e.key === "Backspace" && !otp[index] && index > 0
    && otpinputref.current[index-1]){
      otpinputref.current[index-1].focus();
    }
  }

  const handleClick = (index) =>{
    otpinputref.current[index].setSelectionRange(1,1);

    if (index > 0 && !otp[index - 1]) {
      otpinputref.current[otp.indexOf("")].focus();
    }
  }
  return (
    <>
      {otp.map((value, index) => {
        return (
          <input
            type="text"
            key={index}
            ref={(input) => (otpinputref.current[index] = input)}
            style={{ width: "40px", height: "40px", textAlign: "center", fontSize:'1.2rem' }}
            value={value}
            onChange={(e)=> handleChange(index,e)}
            onClick={()=> handleClick(index)}
            onKeyDown={(e)=> handleKeyDown(index,e)}
          />
        );
      })}
    </>
  );
};

export default OtpInput;
