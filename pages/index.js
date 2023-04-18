import Image from 'next/image';
import { useRouter } from 'next/router';
import { Typography, ThemeProvider, Button } from '@mui/material';
import theme from '../components/Theme';
import styles from '../styles/Home.module.css';
import {useUser} from '@auth0/nextjs-auth0/client';
import React from 'react'
import { useQuery, useMutation, QueryClient } from "react-query";

const LandingPage = () => {
  console.log('hello')
  const router = useRouter();
  const {user, isLoading} = useUser();

  console.log(JSON.stringify({
    userEmail: "giggitygoo@gmail.com",
    isNew: false,
    numCorrect: 5,
    firstProbCorrect: false,
    secondProbCorrect: true,
    thirdProbCorrect: false,
    fourthProbCorrect: true,
    fifthProbCorrect: false,
    sixthProbCorrect: true,
    seventhProbCorrect: false,
  }))
  if(user) {
    router.push("/dashboard");
  }

  return (
    <div className={styles.container}>
    <ThemeProvider theme={theme}>
    {user || isLoading ? <Typography>Dashboard Loading... Please Wait</Typography> : 
    <div className={styles.interContainer}>
    
    <div className={styles.imageCont}>
        <Image src="/image.png" alt="Chess Board" width="500" height="500" className={styles.image} />
      </div>
      <div className={styles.centerCont}>
        <Typography color="white" variant="h3" className={styles.centerItem}>Revolutionize Your Chess Game</Typography>
        <Typography color="white" variant="h6" className={styles.centerItem}>Personalized and Unique Teaching Methods</Typography>
        <Button variant="contained" sx={{ bgcolor: 'text.light' }} onClick={() => router.push("/test")} className={styles.centerItem}>
          Test Your Chess Level
        </Button>
      </div>
    <div className={styles.topRightCont}>
      <Typography color="white" variant="h5">Already have an account? </Typography>
      <Button onClick={() => {router.push("/api/auth/login")}} variant="contained">Login</Button>
    </div>
    
  </div>}
  </ThemeProvider>
  </div>

  );
};

export default LandingPage;

