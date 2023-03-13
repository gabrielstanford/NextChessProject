import React from "react";
import Image from 'next/image'
import {useRouter} from "next/router";
import { Button } from '@mui/material';
import {Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe6048',
    },
  },
});

const WelcomePage = () => {
    const router = useRouter()
    
    const Button1 = () => (
    <div>
    <ThemeProvider theme={theme}>
        <Button color='primary' size="large" variant="contained" onClick={OnClickButton1}>About Me</Button>
        </ThemeProvider>
      </div>
      )

    const OnClickButton1 = () => {
        router.push("/about")
    }
return (
    <div className="ContainerAlt">
        <div className = "intText firstItem">
        <h1 className="text1">Chess Lessons from a 17 year old National Master</h1> 
        <Button1 />
        </div>
        <Image className="board firstItem" src="/imageOfMe.png" alt="Chess Board" width="300" height="300"/>
    </div>
)

}

export default WelcomePage;