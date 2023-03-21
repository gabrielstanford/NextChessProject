import Image from 'next/image';
import { useRouter } from 'next/router';
import { Typography, ThemeProvider, Button } from '@mui/material';
import theme from '../components/Theme';
import styles from '../styles/Home.module.css';
import {useUser} from '@auth0/nextjs-auth0/client';
import React from 'react'
import { useQuery, useMutation, QueryClient } from "react-query";

const LandingPage = () => {

  const router = useRouter();
  const {user} = useUser();


  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <div className={styles.header}>
          <Typography color="white" variant="h3">Revolutionize Your Chess Game</Typography>
          <Typography color="white" variant="h6">Personalized and Unique Teaching Methods</Typography>
        
        </div>
        <div className={styles.content}>
          <Image src="/image.png" alt="Chess Board" width="500" height="500" className={styles.image} />
          <Typography color="white" variant="h5" className={styles.text}>Unlock Your Full Potential with Our Revolutionary Chess Teaching System</Typography>
          <Button variant="contained" sx={{ bgcolor: 'text.light' }} onClick={() => router.push("/test")} className={styles.button}>
            Test Your Chess Level
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default LandingPage;

