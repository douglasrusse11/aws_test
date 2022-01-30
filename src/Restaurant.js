import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant } from './models';
import Map from './Map';

const RestaurantComponent = ({ displayRestaurants }) => {

    const [restaurant, setRestaurant] = useState(null);

    let {id} = useParams();

    useEffect(() => {
        getRestaurant();
    }, []);

    const getRestaurant = async () => {
        const r = await DataStore.query(Restaurant, id);
        setRestaurant(r);
    }

    return (
        <>
            { restaurant && (
            <>
            <Map restaurant={restaurant} />
            { displayRestaurants([restaurant]) }
            </>
            )}
        </>
    )

}

export default RestaurantComponent;