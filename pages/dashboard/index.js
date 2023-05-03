import { Typography, ThemeProvider, Modal, Box, Button, Tooltip, IconButton, Avatar, Menu } from "@mui/material";
import {DoneOutline, Close} from '@mui/icons-material'
import theme from "../../components/Theme";
import * as React from 'react';
import {useState} from 'react';
import Appbar from '../../components/Appbar'
import { useQuery } from "react-query";
import {useRouter} from 'next/router';
import { useUser } from "@auth0/nextjs-auth0/client";
import Dash from '../../CentralDashboard/CentralDashboard';
import styles from '../../styles/dashboardhome.module.css';

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
  console.log('loading? ' + isLoading)
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
    return(
      <div>
    <Typography variant="h3">
      We&apos;re all set to get you on your chess improvement journey. To save your results and keep the training personalized, please create an account.
    </Typography>
    <Button variant="contained" onClick={() => {router.push("/api/auth/signup")}}>Create Account</Button>
    </div>
    )
  }

  const Loading = () => {
    console.log('in loading')
    return(
    <Typography color="black" variant="h2">Loading...</Typography>
    )
  }

  const DashForUser = () => {
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const settings = ['Profile', 'Logout'];
  
    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    return(
      <div>
      {/* <Tooltip title="Open settings">
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
      <Avatar>{user.name.charAt(0)}</Avatar>
    </IconButton>
  </Tooltip><Menu
    sx={{ mt: '45px' }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
  >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu> */}
    <Appbar />

      <Dash />

      </div>
      )
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
        let level = [];
        if (typeof window !== 'undefined') {
          level = JSON.parse(localStorage.getItem('level'));
        }
        console.log(level)
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
              {level ? <>
              {/* <Typography color="black" variant="h6">{users[users.length-1].level1 } {users[users.length-1].level2} {users[users.length-1].level3} {users[users.length-1].level4} {users[users.length-1].level5} {users[users.length-1].level6}</Typography> */}

            <Typography color="black" variant="h6">You got {level[1]} puzzles correct.</Typography> 
            {level[2][0] ? <Typography color="black" variant="h6">#1: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#1: <Close /></Typography>}
            {level[2][1] ? <Typography color="black" variant="h6">#2: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#2: <Close /></Typography>}
            {level[2][2] ? <Typography color="black" variant="h6">#3: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#3: <Close /></Typography>}
            {level[2][3] ? <Typography color="black" variant="h6">#4: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#4: <Close /></Typography>}
            {level[2][4] ? <Typography color="black" variant="h6">#5: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#5: <Close /></Typography>}
            {level[2][5] ? <Typography color="black" variant="h6">#6: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#6: <Close /></Typography>}
            {level[2][6] ? <Typography color="black" variant="h6">#7: <DoneOutline></DoneOutline></Typography> : <Typography color="black" variant="h6">#7: <Close /></Typography>}
              </> : null }
              </Box>
            </Modal>
            </ThemeProvider>
            </>
        );
      }
      
  return (
    <div>
  <Box sx={{bgcolor: '#cfe8fc', height: '100vh'}}>

    {isLoading ? <Loading /> : null}
    {account && !guestNewDash && !guestTestedDash ? <CreateAccount /> : null}
    {guestNewDash ? <DashNewGuest /> : null}
    {guestTestedDash ? <DashTestedGuest /> : null}
    {user ? <DashForUser /> : null}

    </Box>
    </div>
  );
};

export default Dashboard;