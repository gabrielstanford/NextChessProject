import Image from 'next/image';
import {useRouter} from 'next/router';
import {Typography, ThemeProvider, Button} from '@mui/material';
import theme from '../components/Theme';

const WelcomePage = () => {
    const router = useRouter();
return (
    
    <div className="Overlay" >
    <ThemeProvider theme={theme}>
    <div className="Container">
        <Image src="/image.png" className="board2" alt="Chess Board" width="500" height="500"/>
        <div className="textButton">

        <Typography color="white" variant="h2">Structured training for faster learning</Typography> 
        <Button variant="contained" sx={{bgcolor: 'text.light'}} onClick={() => {router.push("/test")}}>
            Test
        </Button>
        
        </div>
    </div>
    </ThemeProvider>
    </div>
)

}

export default WelcomePage;