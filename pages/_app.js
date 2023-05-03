import '../styles/globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import useStyles from '../css/app';
import React, {useEffect} from 'react';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {

  const classes = useStyles();

  useEffect(() => {
    const style = document.getElementById('server-side-styles');

    if(style) {
      style.parentNode.removeChild(style);
    }
  }, []);
  
  return (
    <div className={classes.app}>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
    </div>
  );
}


