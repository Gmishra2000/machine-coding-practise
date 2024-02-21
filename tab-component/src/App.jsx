import { useState } from 'react'
import './App.css'
import { Tabs } from './components/Tabs';

function App() {
  const [currenttabId, setCurrentTabId] = useState('1');
  const jsonData = [
    {
      id:'1',
      key: 'One',
      tabData:'1st tab'
    },
    {
      id:'2',
      key: 'two',
      tabData:'2nd tab'
    },
    {
      id:'3',
      key: 'three',
      tabData:'3rd tab'
    },
  ]

  const showtabData =(id)=> {
    setCurrentTabId(id);
  }

  return (
    <div className="main-component">
        <div className="main-tab-component">
          {jsonData.map((tab) => (
            <span
              key={tab.id}
              onClick={() => showtabData(tab.id)}
              className={currenttabId === tab.id ? "active" : ""}
            >
              {tab.key}
            </span>
          ))}
        </div>
        <div className="main-tab-data-component">
          {jsonData.map((item) => {
            if (item.id === currenttabId) {
              return (
                  <Tabs tabData={item.tabData} key={item.id}/>
              );
            }
          })}
        </div>
    </div>
  );
}

export default App
