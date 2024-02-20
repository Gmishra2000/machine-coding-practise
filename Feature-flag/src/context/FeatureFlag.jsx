import React from 'react'
import { useState } from 'react';

export const FeatureFlag = React.createContext({});

export const FeatureFlagProvider = ({children}) => {
    const [features,setFeatures] = useState({
        isGpayEnabled:false,
        isApplePayEnabled:false
    });

    return (
    <FeatureFlag.Provider value={{features}}>{children}</FeatureFlag.Provider>
  )
}

