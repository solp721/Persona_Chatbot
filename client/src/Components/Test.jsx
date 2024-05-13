import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>react flask test</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
}

export default Test;
