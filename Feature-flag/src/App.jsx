import React from 'react'
import { useState } from 'react'
import './App.css'

import {FeatureFlagProvider, FeatureFlag} from './context/FeatureFlag'
const Example = () =>{
  return(
    <>
    <Feature feature="isGpayEnabled" value={false}>
      Google
    </Feature>
    <Feature feature="isApplePayEnabled" value={true}>
      Apple
    </Feature>
    </>
  ) 
}

const Feature = ({feature,children,value})=>{
  const {features} = React.useContext(FeatureFlag);
  console.log(features[feature],value);
  return features[feature] === value ? children :null;
}

function App() {
  const [count, setCount] = useState(0)

  return (
   <FeatureFlagProvider>
    <Example />
   </FeatureFlagProvider>
  )
}



export default App
