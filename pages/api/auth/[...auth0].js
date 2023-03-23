// pages/api/auth/[...auth0].js
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';

export default handleAuth({
    callback: handleCallback({ redirectUri: 'http://localhost:3000/dashboard' })
});