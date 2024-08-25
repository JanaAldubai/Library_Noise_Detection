import React, { useEffect, useState } from 'react';
import { announcer, formatSSE } from './utils'; 
import Screen from './components/Screen';

const App = () => {
  const [warning, setWarning] = useState('First Warning');
  const [availability, setAvailability] = useState('Not Available');
  const [sseMessage, setSseMessage] = useState('');

  const ping = () => {
    const msg = formatSSE({
      warning: warning,
      availability: availability,
    });

    announcer.announce({ msg: msg });
  };

  useEffect(() => {
    const eventSource = new EventSource('/listen');

    eventSource.onmessage = (event) => {
      setSseMessage(event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={ping}>Ping</button>
      <div>
      <Screen setWarning={warning} />
        <strong>Meao</strong> {warning}
      </div>
      <div>
        <strong>Availability:</strong> {availability}
      </div>
      <div>
        <strong>SSE Message:</strong> {sseMessage}
      </div>
    </div>
  );
};

export default App;
