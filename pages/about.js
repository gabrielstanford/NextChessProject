import {Typography} from '@mui/material'
import Image from 'next/image'

function About() {
    return (
        <div className="container">
            <div className="block1">
                <div className="item1">
                <Typography sx={{fontWeight: 'bold'}} variant="h2" className="sect1" color="white">Hi, I&apos;m Gabriel</Typography>
                <Typography variant="subtitle1" className="sect1" color="white">
                    My name is Gabriel Eidelman, and I am currently 17 years old. I have been playing chess since the age of 6. Since then, I have developed a deep love and passion for it and have played in tournaments in Greece, Brazil, Canada, the Czech Republic, and all over the United States.  I became a National Master at age 13, and have been a top player for my age my entire life. </Typography>
                </div>
                <Image id="youngMe" className="item1" src="/youngImage.png" alt="Young Me" width="200" height="200"/>
            </div>

            <div className="block2">
                <Image id="streetMe" src="/StreetMe.png" alt="Young Me" width="200" height="200"/>
            </div>

            <div className="block3">
                <Image id="yesuntumur" src="/yesuntumur.png" alt="Young Me" width="200" height="200"/>
            </div>

            <div className="block4">
                <Image id="SuperStates" src="/SuperStates.png" alt="Young Me" width="200" height="200"/>
            </div>
        </div>
    )
}

export default About;