import React, { useEffect, useState }from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faFlag } from '@fortawesome/free-solid-svg-icons'; 


function Screen() {
  const [data, setData] = useState({
    tableID: "",
    tableStatus: "",
    noiseLevel:"",
});
const [data2, setData2] = useState({
  tableID: "2",
  tableStatus: "Occupied",
  noiseLevel:"Low",
});
  // data is the actual varible, and setData used to manipulate the state of these data varible






// Set up the interval to fetch data every 2 seconds
setInterval(async () => {
  try {
      const response = await fetch("http://localhost:5000/noiseLevel");
      const data = await response.json();
      setData({
          tableID: data.tableID,
          tableStatus: data.tableStatus,
          noiseLevel: data.noiseLevel,
      })
      setData2({
        tableID: data2.tableID,
        tableStatus: data2.tableStatus,
        noiseLevel: data2.noiseLevel,
    })
      ;
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}, 2000); 



  const containerStyle = {
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Center vertically
    height: '60vh', // Adjust the height of the container to center vertically
  };

  const cardStyle = {
    position: 'relative', // Relative positioning for absolute icons
    width: '400px', // Increased width for a larger card
    height: '250px', // Increased height for a larger card
    backgroundColor: '#1a1a40',
    borderRadius: '35px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.5rem',
    borderBottom: '2px solid #fff', // White borderline
    paddingBottom: '5px', // Add space between heading and subheading
  };

  const subHeadingStyle = {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
    marginTop: '5px',
    overflow: 'hidden', // Prevent subheading from overflowing
    textOverflow: 'ellipsis', // Show ellipsis (...) if content overflows
    whiteSpace: 'nowrap', // Keep the content in a single line
  };

  const iconStyle = {
    position: 'absolute',
    top: '10px', // Adjust the top position of the icon
    color: '#fff',
    fontSize: '2rem', // Adjust the font size for larger icons
  };

  return (
    <div style={containerStyle}>


{/* data1 = DB.child('Tables/Table1/ID').get().val()  # Table ID
    data2 = DB.child('Tables/Table1/Status').get().val() #Table Status
    data3 = DB.child('Tables/Table1/Warning').get().val() #noiseLevel

    return {'tableID': data1, 'tableStatus': data2, 'noiseLevel': data3} */}
      
      <div style={cardStyle}>
        <FontAwesomeIcon icon={faCoffee} style={iconStyle} />
        <h1 style={labelStyle}>Table: {data.tableID}</h1>
        <h3 style={subHeadingStyle}>Table Availability: {data.tableStatus} </h3>
        <h3 style={subHeadingStyle}>Warning type: {data.noiseLevel} </h3>
        
      </div>

      <div style={cardStyle}>
        <FontAwesomeIcon icon={faCoffee} style={iconStyle} />
        <h1 style={labelStyle}>Table: {data2.tableID}</h1>
        <h3 style={subHeadingStyle}>Table Availability: {data2.tableStatus} </h3>
        <h3 style={subHeadingStyle}>Warning type: {data2.noiseLevel} </h3>
        
      </div>
        
      
    </div>
  );
}

export default Screen;