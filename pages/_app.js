import '@/styles/globals.css'
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function App({ Component, pageProps }) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}



// import { UserProvider } from '@auth0/nextjs-auth0';
// import { useRouter } from 'next/router';
// import React from 'react';

// function MyApp({ Component, pageProps }) {
//   const router = useRouter();

//   // Specify the redirect URI here
//   const redirectUri = `${process.env.AUTH0_BASE_URL}${router.asPath}`;

//   return (
//     <UserProvider
//       auth0Domain={process.env.AUTH0_ISSUER_BASE_URL}
//       auth0ClientId={process.env.AUTH0_CLIENT_ID}
//       redirectUri={redirectUri}
//     >
//       <Component {...pageProps} />
//     </UserProvider>
//   );
// }

// export default MyApp;