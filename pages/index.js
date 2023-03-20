import Image from 'next/image';
import { useRouter } from 'next/router';
import { Typography, ThemeProvider, Button } from '@mui/material';
import theme from '../components/Theme';
import styles from '../styles/Home.module.css';
import {useUser} from '@auth0/nextjs-auth0/client';
import React from 'react'
import { useQuery, useMutation, QueryClient } from "react-query";

//useQuery: fetching data from server
//useMutation: changing data in server
//queryCache: UI updates during server requests

async function fetchSightingsRequest() {
  const response = await fetch('/api/sightings');
  const data = await response.json();
  const {sightings} = data;
  return sightings;
}

async function createSightingRequest(sightingData) {
  const settings = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({sighting: sightingData})
 };
 try {

  const response = await fetch("/api/sightings/create", settings);
  const data = await response.json();
  return data;
 } catch(e) {
    return e;
 }
}

const queryClient = new QueryClient();

const LandingPage = () => {
  const [frame, runFrame] = React.useState(false);

  const mutation = useMutation(createSightingRequest, 
//     {
//     onMutate: async sightingData => {
//     //1) cancel queries
//     await queryClient.cancelQueries("sightings");

//     //2 save snapshot
//     const previousSightings = queryClient.getQueryData("sightings");
    
//     //3 optimistically update cache
//     queryClient.setQueryData("sightings", old => [...(old || []), sightingData]);
//     runFrame(!frame)
//     //4 return rollback function which reset cache back to snapshot
//     return {previousSightings};
//   },
//   onError: (err, sightingData, rollback) => rollback(),
//   onSettled: () => queryClient.invalidateQueries("sightings"),
// }
);
  const router = useRouter();
  const {user} = useUser();

  const {data: sightings} = useQuery("sightings", fetchSightingsRequest)

  const onMapClick = React.useCallback(() => {
    mutation.mutate({
      latitude: 35,
      longitude: 22
    })
  }, []);
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <div className={styles.header}>
          <Typography color="white" variant="h3">Revolutionize Your Chess Game</Typography>
          <Typography color="white" variant="h6">Personalized and Unique Teaching Methods</Typography>
          {sightings ? <Typography color="white" variant="h6">{sightings.map(sighting => <div>{sighting.id} {sighting.createdAt} {sighting.latitude} {sighting.longitude}</div>)}</Typography> : null}
        </div>
        <div className={styles.content}>
          <Image src="/image.png" alt="Chess Board" width="500" height="500" className={styles.image} />
          <Typography color="white" variant="h5" className={styles.text}>Unlock Your Full Potential with Our Revolutionary Chess Teaching System</Typography>
          <Button variant="contained" sx={{ bgcolor: 'text.light' }} onClick={onMapClick} className={styles.button}>
            Test Your Chess Level
          </Button>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default LandingPage;

