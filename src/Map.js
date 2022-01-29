import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({restaurants}) => {

    const style = {
        height: "300px",
        width: "100%"
    };



    return (
        <MapContainer center={[55.96778, -3.235135]} zoom={12} scrollWheelZoom={false} style={style}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { restaurants.map((restaurant, index) => {
                return (
                    <Marker key={`marker_${index}`}position={restaurant.latlng}>
                        <Popup>
                            {restaurant.name} <br/>
                            {restaurant.style} <br/>
                            {restaurant.address}
                        </Popup>
                    </Marker>
                )
            })}
            {/* <Marker position={[city.latitude, city.longitude]} /> */}
            {/* <UpdateMap city={city} /> */}
        </MapContainer>
    );
}

// function UpdateMap({ city }) {
//     const map = useMap();
//     map.setView([city.latitude, city.longitude], map.getZoom());
  
//     return null;
// }

export default Map;