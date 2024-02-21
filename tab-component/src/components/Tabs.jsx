import React from 'react'

export const Tabs = ({tabData,tab1}) => {
  return (
    <div onClick={tab1}>{tabData}</div>
  )
}
