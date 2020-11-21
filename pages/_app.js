import {useEffect} from 'react';
import '../styles/global.css';
import '../styles/tailwind.css';
//https://github.com/hanford/next-offline#runtime-registration
import { register, unregister } from 'next-offline/runtime'
import { ReactQueryCacheProvider, QueryCache } from 'react-query'
import { Hydrate } from 'react-query/hydration'
const queryCache = new QueryCache()
export default function App({ Component, pageProps }) {
  
     /**  register service worker
      * Default service worker path is '/service-worker.js' 
      * Refer https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register for default scope rules
      *
    */
  useEffect(()=>{
    register()
    return ()=>{
      unregister()
    }
  },[])

  return(<ReactQueryCacheProvider queryCache={queryCache}><Hydrate state={pageProps.dehydratedState}><Component {...pageProps} /></Hydrate></ReactQueryCacheProvider>);
}
