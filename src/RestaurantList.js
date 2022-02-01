import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Restaurant } from './models';
import { useParams } from 'react-router-dom';

const RestaurantList = ({ displayRestaurants, displayForm}) => {

    const [restaurantList, setRestaurantList] = useState(null);
    let { style } = useParams();

    useEffect(() => {
        fetchRestaurants();
        const subscription = DataStore.observe(Restaurant)
                                      .subscribe(() => fetchRestaurants())
        return () => subscription.unsubscribe()
      }, [style]);

    const fetchRestaurants = () => {
        DataStore.query(Restaurant, r => r.style("eq", style))
            .then(data => {
                setRestaurantList(data);
            })
    }

    return (
        <>
        { restaurantList && displayRestaurants(restaurantList)}
        { displayForm(style) }
        </>
    )
}

export default RestaurantList;