import {Typography} from '@mui/material'
import Dash from '../../CentralDashboard/DashboardProfile';
import Appbar from '../../Components/Appbar'
import {useUser} from '@auth0/nextjs-auth0/client'
import styles from '../../styles/profile.module.css'

function Profile() {

    const {user, isLoading} = useUser();

    return(
        <>
    <Appbar />
    <div className={styles.flexbox}>
    <Dash />
    {isLoading ? <Typography color="black" variant="h2">Loading</Typography> : null}
    {user && user.name ? 
    <>
    <Typography color="black" variant="h2">Name: {user.name}</Typography>
    </>
     :     null}
    </div>
    </>
    )   
}

export default Profile;