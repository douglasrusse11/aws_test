import {useState, useEffect} from 'react';
import {Auth, Hub} from 'aws-amplify';
import {Authenticator} from '@aws-amplify/ui-react';
import Header from './Header';
import Main from './Main';

const App = () => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser()
        Hub.listen('auth', (data) => {
            const { payload: { event }} = data
            console.log('event: ', event)
            if (event == 'signIn' || event == 'signOut') getUser()
        })
    }, [])

    const getUser = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser();
            console.log('data: ', data)
            const userInfo = {username: data.username, isAdmin: data.signInUserSession.idToken.payload['cognito:groups'] && data.signInUserSession.idToken.payload['cognito:groups'].includes('Admin'), ...data.attributes};
            setUser(userInfo);
        } catch (err) {
            setUser(null);
            console.log('error: ', err);
        }
    }

    return (
        <>
        <Header user={user} />
        <Main user={user}/>
        </>
    )
}
export default App;