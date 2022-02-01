import {useState, useEffect} from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant, Style } from './models';
import Form from './Form';
import Home from './Home';
import Nav from './Nav';
import RestaurantList from './RestaurantList';
import RestaurantComponent from './Restaurant';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import Header from './Header';

const initialState = {
    name: '',
    style: '',
    latlng: [0, 0],
    address: '',
};

function Main({user}) {

    const [formData, setFormData] = useState(initialState);
    const [displayUpdateForm, setDisplayUpdateForm] = useState({id: 0, display: false})
    const [displayAddNew, setDisplayAddNew] = useState(true);

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

    const displayRestaurants = (restaurantList) => {
        return restaurantList.map(restaurant => (
            <div key={restaurant.id}>
            <div style={styles.restaurant}>
                <Link to={`/restaurants/${restaurant.id}`} style={{textDecoration: 'none'}}>
                    <div>
                    <h3 style={styles.heading}>{restaurant.name}</h3>
                    <h4 style={styles.heading}>{restaurant.style}</h4>
                    <h5 style={styles.heading}>{restaurant.address}</h5>
                    </div>
                </Link>
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

    const displayForm = (style) => {
        return (
            <div style={styles.container}>
                {user && user.isAdmin && (displayAddNew ? <button onClick={() => {setFormData(initialState); setDisplayUpdateForm({id: 0, display: false}); setDisplayAddNew(false)}}>Add new</button> : <Form onSubmit={createRestaurant} formData={{...formData, style: style}} setFormData={setFormData} />)}
            </div>
        )
    }

    return (
        <>
        <BrowserRouter>
            <Header user={user} />
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants/bystyle/:style" element={<RestaurantList displayRestaurants={displayRestaurants} displayForm={displayForm} />} />
                <Route path="/restaurants/:id" element={<RestaurantComponent displayRestaurants={displayRestaurants} />} />
            </Routes>
            
        </BrowserRouter>
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