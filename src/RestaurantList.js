const RestaurantList = ({ restaurantList, displayRestaurants, displayForm}) => {

    return (
        <>
        { restaurantList && displayRestaurants(restaurantList)}
        { displayForm(restaurantList[0].style) }
        </>
    )
}

export default RestaurantList;