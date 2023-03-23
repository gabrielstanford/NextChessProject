import { Typography, ThemeProvider, Modal, Box, Button } from "@mui/material";
import {DoneOutline, Close} from '@mui/icons-material'
import theme from "../components/Theme";
import * as React from 'react';
import {useState} from 'react';
import Appbar from '../components/Appbar'
import { useQuery } from "react-query";
import {useRouter} from 'next/router';
import { useUser } from "@auth0/nextjs-auth0/client";
import { RouteMatcher } from "next/dist/server/future/route-matchers/route-matcher";

//next step: use localstorage to save test results before user creates account so that data is not lost on accidental reload

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//database

// if (typeof window !== 'undefined') {
// const newPlayerString = localStorage.getItem('newPlayer');
// }

async function fetchSightingsRequest() {
  const response = await fetch('/api/users');
  const data = await response.json();
  const {users} = data;
  return users;
}

let firstRun = false;
let guestNewDash = false;
let guestTestedDash = false;
let newPlayer= 'unsettled';
let youCanRun = true;

const Dashboard = () => {
  console.log('here')
  console.log(firstRun)
  const router = useRouter();
  const [account, setAccount] = useState(false);
  const {user, isLoading} = new useUser();

  if(router.query && youCanRun) {
    if(router.query.newPlayer === 'true') {
    newPlayer = 'true';
    }
    else if(router.query.newPlayer === 'false') {
    newPlayer = 'false';
    }
    else {
      console.log('otherwise')
    }
    firstRun = true;
    } 
  else {
  console.log('otherwise')
  }

  const handleCloseTested = () => {
    guestTestedDash=false;
    setAccount(true);
  }

  const handleCloseNew = () => {
    guestNewDash = false;
    setAccount(true);
  }

  if(!isLoading && !user && firstRun) {

    if(newPlayer==='true') {
      firstRun=false;
      youCanRun=false;
      guestNewDash = true;
    }
    else if(newPlayer==='false') {
      firstRun=false;
      youCanRun=false;
      guestTestedDash=true;
    }
    else {
      console.log(newPlayer)
    }
    
    
    }

  const {data: users} = useQuery("users", fetchSightingsRequest)

  const CreateAccount = () => {
    // const {loginWithRedirect} = useAuth0();
    return(
      <div>
    <Typography variant="h3">
      We&apos;re all set to get you on your chess improvement journey. To save your results and keep the training personalized, please create an account.
    </Typography>
    {/* <Button variant="contained" onClick={() => loginWithRedirect()}>Create Account</Button> */}
    <Button variant="contained" onClick={() => {router.push("/api/auth/login")}}>Create Account</Button>
    </div>
    )
  }

  const Loading = () => {
    <Typography color="black" variant="h2">Loading...</Typography>
  }

  const DashboardForUser = () => {

  }

  function DashNewGuest() {
    console.log('in this func')
      return(
        <>
        <ThemeProvider theme={theme}>
          <Modal
            open={true}
            onClose={handleCloseNew}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Welcome, new player!
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Click out of this to open your dashboard and start learning!
              </Typography>
            </Box>
          </Modal>
          </ThemeProvider>
          </>
      )
      }

      function DashTestedGuest() {
        console.log('in this fun')
        return(
            <>
            <ThemeProvider theme={theme}>
            <Modal
            open={true}
            onClose={handleCloseTested}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Thanks for completing the test! Here are your results: 
              </Typography>
              {users && users[users.length-1] ? <>
              {/* <Typography color="black" variant="h6">{users[users.length-1].level1 } {users[users.length-1].level2} {users[users.length-1].level3} {users[users.length-1].level4} {users[users.length-1].level5} {users[users.length-1].level6}</Typography> */}

            <Typography color="black" variant="h6">You got {users[users.length-1].numCorrect} puzzles correct.</Typography> 
            {users[users.length-1].firstProbCorrect ? <Typography color="black" variant="h6">#1: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#1: <Close /></Typography>}
            {users[users.length-1].secondProbCorrect ? <Typography color="black" variant="h6">#2: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#2: <Close /></Typography>}
            {users[users.length-1].thirdProbCorrect ? <Typography color="black" variant="h6">#3: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#3: <Close /></Typography>}
            {users[users.length-1].fourthProbCorrect ? <Typography color="black" variant="h6">#4: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#4: <Close /></Typography>}
            {users[users.length-1].fifthProbCorrect ? <Typography color="black" variant="h6">#5: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#5: <Close /></Typography>}
            {users[users.length-1].sixthProbCorrect ? <Typography color="black" variant="h6">#6: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#6: <Close /></Typography>}
            {users[users.length-1].seventhProbCorrect ? <Typography color="black" variant="h6">#7: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#7: <Close /></Typography>}
              </> : null }
              </Box>
            </Modal>
            </ThemeProvider>
            </>
        );
      }

  return (
    <div>
    <Appbar />
  <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}>

    {isLoading ? <Loading /> : null}
    {account && !guestNewDash && !guestTestedDash ? <CreateAccount /> : null}
    {guestNewDash ? <DashNewGuest /> : null}
    {guestTestedDash ? <DashTestedGuest /> : null}

    </Box>
    </div>
  );
};

export default Dashboard;