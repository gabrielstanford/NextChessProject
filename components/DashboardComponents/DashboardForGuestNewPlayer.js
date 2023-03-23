import { Typography, ThemeProvider, Modal, Box, Button } from "@mui/material";

export let exportEndGuestNewDash = false;

 function DashboardForGuestNewPlayer() {
console.log('in this func')
  return(
    <>
    <ThemeProvider theme={theme}>
      <Modal
        open={true}
        onClose={() => exportEndGuestNewDash=true}
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
      </ThemeProvider>
      </>
  )
  }

  export default DashboardForGuestNewPlayer;