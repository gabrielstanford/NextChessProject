import { Typography, ThemeProvider, Modal, Box, Button } from "@mui/material";
import theme from "../components/Theme";
import * as React from 'react';
import {useState} from 'react';
import Appbar from '../components/Appbar'
import { useQuery } from "react-query";
import {newPlayer} from "./test"

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
let firstRun = true;

async function fetchSightingsRequest() {
  const response = await fetch('/api/users');
  const data = await response.json();
  console.log(data);
  const {users} = data;
  return users;
}

let openNew = false;
let openTested = false;

const Dashboard = () => {

  const [account, setAccount] = useState(false);
  // const [openNew, setOpenNew] = useState(false);
  // const [openTested, setOpenTested] = useState(false);

  const handleCloseNew = () => {
    openNew = false;
    setAccount(true);
  };
  const handleCloseTested = () => {
    openTested = false;
    setAccount(true);
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
    <Button variant="contained">Create Account</Button>
    </div>
    )
  }

  if(newPlayer && firstRun) {
    openNew = true;
    
  }
  else if(!newPlayer && firstRun) {
    openTested = true;
  }
  firstRun=false;

  if(users)
  console.log(users[users.length-1])
  return (
    <div>
    <Appbar />
  <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}>
    {account ? <CreateAccount /> : null}

    {/* {users && users[0] ? <Typography color="black" variant="h6">{users[0].level1} {users[0].level2} {users[0].level3} {users[0].level4} {users[0].level5} {users[0].level6}</Typography> : null}
    {users && users[1] ? <Typography color="black" variant="h6">{users[1].level1} {users[1].level2} {users[1].level3} {users[1].level4} {users[1].level5} {users[1].level6}</Typography> : null } */}

      <Modal
        open={openNew}
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
          {/* {users ? <Typography color="black" variant="h6">{sightings.map(sighting => <div>{sighting.id} {sighting.createdAt} {sighting.latitude} {sighting.longitude}</div>)}</Typography> : null} */}
        </Box>
      </Modal>

      <Modal
        open={openTested}
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

         <Typography color="black" variant="h6">You got {users[users.length-1].level2} puzzles correct.</Typography> 
         {users[users.length-1].level3===0 ? <Typography color="black" variant="h6">1st Problem Incorrect</Typography> : <Typography color="black" variant="h6">1st Problem Correct</Typography>}
         {users[users.length-1].level4===0 ? <Typography color="black" variant="h6">2nd Problem Incorrect</Typography> : <Typography color="black" variant="h6">2nd Problem Correct</Typography>}
         {users[users.length-1].level5===0 ? <Typography color="black" variant="h6">3rd Problem Incorrect</Typography> : <Typography color="black" variant="h6">3rd Problem Correct</Typography>}
         {users[users.length-1].level6===0 ? <Typography color="black" variant="h6">4th Problem Incorrect</Typography> : <Typography color="black" variant="h6">4th Problem Correct</Typography>}



          </> : null }

        <ThemeProvider theme={theme}>
        {/* {sightings ? <Typography color="black" variant="h6">{sightings.map(sighting => <div>{sighting.id} {sighting.createdAt} {sighting.latitude} {sighting.longitude}</div>)}</Typography> : null} */}
        {/* {level[0] === 0 ? (
          <Typography>You are new to chess.</Typography>
        ) : (
          <Typography>You know the rules of chess.</Typography>
        )}
        <Typography>You got {level[1]} puzzles correct in the test.</Typography>
        {level[2][0] === 0 ? (
          <Typography>Mate in one level: 0/10</Typography>
        ) : (
          <Typography>Mate in one level: 10/10</Typography>
        )}
        {level[2][1] === 0 ? (
          <Typography>Fork/Double Attack Level: 0/10</Typography>
        ) : (
          <Typography>Fork/Double Attack Level: 10/10</Typography>
        )}
        {level[2][2] === 0 ? (
          <Typography>Discovered attack level: 0/10</Typography>
        ) : (
          <Typography>Discovered attack level: 10/10</Typography>
        )}
        {level[2][3] === 0 ? (
          <Typography>Discovered check level: 0/10</Typography>
        ) : (
          <Typography>Discovered check level: 10/10</Typography>
        )} */}
      </ThemeProvider> 
        </Box>
      </Modal>
    </Box>
    </div>
  );
};

export default Dashboard;
