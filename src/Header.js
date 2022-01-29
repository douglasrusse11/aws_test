import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const Header = function({user}) {

    const [displayLogin, setDisplayLogin] = useState(false);

    return (
        <>
        <div style={styles.container}>
            <div style={styles.headings}>
                <h1 style={styles.heading}>HopeN (for food)</h1>
                { user ? <h1 style={styles.heading} onClick={() => {Auth.signOut(); setDisplayLogin(false)}}>Sign Out</h1> : <h1 style={styles.heading} onClick={() => setDisplayLogin(!displayLogin)}>Sign In</h1> }
            </div>
        </div>
        { displayLogin && <Authenticator /> }
        </>
    )
}

const styles = {
    container: {
        width: '100%',
        height: '50px',
        backgroundColor: '#ff8181'
    },
    headings: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    heading: {
        color: 'whitesmoke',
        fontSize: 42,
        margin: 0
    }
}

export default Header;