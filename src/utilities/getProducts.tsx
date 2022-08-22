import { useEffect, useState } from 'react';

const productsURL = 'http://localhost:3001/api/products/';
const [data, setData] = useState<any[]>([]);
// const [error, setError] = useState(null);

useEffect(() => {
  fetch(productsURL)
    .then((response) => {
      // if (!response.ok) {
      //   throw new Error(
      //     `This is an HTTP error: The status is ${response.status}`
      //   );
      // }
      return response.json();
    })
    .then((actualData) => {
      setData(actualData);
      // setError(null);
    });
  // .catch((err) => {
  //   setError(err.message);
  //   setData(null);
  // });
}, []);

export default data
