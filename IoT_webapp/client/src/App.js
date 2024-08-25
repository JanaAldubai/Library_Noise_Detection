import React from 'react';
import './App.css';
import Screen from './components/Screen'
import image from "./image/Figma.png"; 
import image2 from './components/I.gif'


function App() {
  const backgroundImage = `url(${image2})`;
  
    const Blob = {
      backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      
    };
  

  const titleStyle = {
    fontSize: '3.5rem',
    textAlign: 'center',
    
  };
  const titleStyle2 = {
    fontSize: '1.2rem',
    textAlign: 'center',
    
  };
 
  

  return (

    <div className="App">
      <header className="App-header" style={{ backgroundImage:`url(${image})` }}>
      {/* <div style={{ backgroundImage:`url(${image})` }}>
        
        </div> */}
        <h1 style={titleStyle}>Library Noise Level</h1>
        <p style={titleStyle2}>
    This app facilitates Librarian's mission via identifying table ID's & detecting the warning types,
    <br />
    Also, it checks if the tables are available or have people sitting.
</p>

<div 
>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', Blob}}>
  <div>
    {/* Your icon/image goes here */}
    <img src={image2} alt="Icon" style={{ width: '32px', height: '32px' }} />
  </div>
  <div style={{ marginLeft: '8px' }}>
    <p style={titleStyle2} className="text-sm font-bold text-gray-700">Readings are ongoing! ..</p>
  </div>
</div>



  
  
</div>

        <Screen></Screen>
      </header>

    </div>
  );
}

export default App;
