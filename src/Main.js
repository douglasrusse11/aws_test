import {useState, useEffect} from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant } from './models';
import Form from './Form';
import Map from './Map';

const initialState = {
    name: '',
    style: '',
    latlng: [0, 0],
    address: '',
};

function Main({user}) {

    const [formData, setFormData] = useState(initialState);
    const [restaurants, setRestaurants] = useState([]);
    const [displayUpdateForm, setDisplayUpdateForm] = useState({id: 0, display: false})
    const [displayAddNew, setDisplayAddNew] = useState(true);

    useEffect(() => {
        fetchRestaurants();
        const subscription = DataStore.observe(Restaurant)
                                      .subscribe(() => fetchRestaurants())
        return () => subscription.unsubscribe()
      }, []);

    const fetchRestaurants = () => {
        DataStore.query(Restaurant)
            .then(data => setRestaurants(data));
    }

    const createRestaurant = async () => {
        if (!formData.name) return
        await DataStore.save(new Restaurant({ ...formData }));
        setFormData(initialState);
        setDisplayAddNew(true);
    }

    const updateRestaurant = async (id) => {
        const restaurant = await DataStore.query(Restaurant, id);
        await DataStore.save(Restaurant.copyOf(restaurant, updated => {
            updated.name = formData.name;
            updated.style = formData.style;
            updated.address = formData.address;
            updated.latlng = formData.latlng;
        }))
        setDisplayUpdateForm({id: 0, display: false});
    }

    const deleteRestaurant = async (id) => {
        const restaurant = await DataStore.query(Restaurant, id);
        await DataStore.delete(restaurant);
    }

    const displayRestaurants = () => {
        return restaurants.map(restaurant => (
            <div key={restaurant.id}>
            <div style={styles.restaurant}>
                <div>
                <h3 style={styles.heading}>{restaurant.name}</h3>
                <h4 style={styles.heading}>{restaurant.style}</h4>
                <h5 style={styles.heading}>{restaurant.address}</h5>
                </div>
                <div>
                { user && user.isAdmin && (
                    <>
                        <button style={styles.button} onClick={() => { setFormData({name: restaurant.name, style: restaurant.style, address: restaurant.address, latlng: restaurant.latlng}); setDisplayAddNew(true); setDisplayUpdateForm({id: restaurant.id, display: true})}}>Update</button>
                        <button style={styles.button} onClick={() => deleteRestaurant(restaurant.id)}>Delete</button>
                    </>
                )}
                </div>
            </div>
                {
                    restaurant.id === displayUpdateForm.id && displayUpdateForm.display === true && (
                        <Form onSubmit={() => updateRestaurant(restaurant.id)} formData={formData} setFormData={setFormData} />
                    )
                }
          </div>  
        ))
    }

    return (
        <>
            <Map restaurants={restaurants}/>
            <div style={styles.container}>
                {displayRestaurants()}
                {user && user.isAdmin && (displayAddNew ? <button onClick={() => {setFormData(initialState); setDisplayUpdateForm({id: 0, display: false}); setDisplayAddNew(false)}}>Add new</button> : <Form onSubmit={createRestaurant} formData={formData} setFormData={setFormData} />)}
            </div>
        </>
    )
}

const styles = {
    container: {
        backgroundColor: '#ffb9b9',
        padding: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 0
    },
    restaurant: {
        margin: 0,
        marginBottom: 10,
        paddingLeft: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    heading: {
        margin: 0,
        color: 'whitesmoke'
    },
    button: {
        height: 20
    }

}
export default Main;