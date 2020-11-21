import {useEffect} from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
export default function App({ Component, pageProps }) {
  
     /**  register service worker
      * Default service worker path is '/service-worker.js' 
      * Refer https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register for default scope rules
      *
    */
  
  return(<Component {...pageProps} />);
}
