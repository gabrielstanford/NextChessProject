import { Typography, ThemeProvider, Modal, Box, Button } from "@mui/material";

export let exportEndGuestNewDash = false;

function DashboardForGuestNewPlayer() {
<>
<ThemeProvider theme={theme}>
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
  }

  export default DashboardForGuestNewPlayer;