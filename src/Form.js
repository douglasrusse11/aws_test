import { useState } from 'react';

const Form = ({onSubmit, formData, setFormData}) => {

    const [addressList, setAddressList] = useState([])
    const [lastRequest, setLastRequest] = useState(Date.now());

    const onChange = (e) => {
        if (e.target.name === 'lat') {
            setFormData({
                ...formData, latlng: [parseFloat(e.target.value), formData.latlng[1]]
            })
        } else if (e.target.name === 'lng') {
            setFormData({
                ...formData, latlng: [formData.latlng[0], parseFloat(e.target.value)]
            })
        } else if (e.target.name === 'address') {
            if (e.target.value && (Date.now() - lastRequest > 2000)) {
                    fetch(`https://nominatim.openstreetmap.org/?q=${e.target.value}&format=json&limit=10&addressdetails=1&countrycodes=gb`)
                        .then(res => res.json())
                        .then(data => setAddressList(data));
                    setLastRequest(Date.now());
                }
            if (addressList.length !== 0) {
                setFormData({
                    ...formData, [e.target.name]: e.target.value, latlng: [addressList[0].lat, addressList[0].lon]
                })
            } else {
                setFormData({
                    ...formData, [e.target.name]: e.target.value
                })
            } 
        } else {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    return (
        <>
            <input type="search" placeholder="Address" name="address" list="addresses" value={formData.address} onChange={onChange} autoComplete="true"/>
            <datalist id="addresses">
                { addressList.map((address, index) => (
                    <option value={address.display_name} key={`address_${index}`}  />
                ))}
            </datalist>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={onChange} />
            <input type="text" placeholder="Style" name="style" value={formData.style} onChange={onChange} />
            <input type="number" placeholder="Latitude" name="lat" value={formData.latlng[0]} step="0.00001" onChange={onChange} />
            <input type="number" placeholder="Longitude" name="lng" value={formData.latlng[1]} step="0.00001" onChange={onChange} />
            <button onClick={onSubmit}>Submit</button>
        </>
    )
}

export default Form;