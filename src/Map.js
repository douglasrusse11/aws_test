import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({restaurant}) => {

    const style = {
        height: "300px",
        width: "100%"
    };



    return (
        <MapContainer center={restaurant.latlng} zoom={15} scrollWheelZoom={false} style={style}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={restaurant.latlng}>
                <Popup>
                    {restaurant.name} <br/>
                    {restaurant.style} <br/>
                    {restaurant.address}
                </Popup>
            </Marker>
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