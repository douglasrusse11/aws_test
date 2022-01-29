

const Form = ({onSubmit, formData, setFormData}) => {

    const onChange = (e) => {
        if (e.target.name === 'lat') {
            setFormData({
                ...formData, latlng: [parseFloat(e.target.value), formData.latlng[1]]
            })
        } else if (e.target.name === 'lng') {
            setFormData({
                ...formData, latlng: [formData.latlng[0], parseFloat(e.target.value)]
            })
        } else {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            })
        }
    }

    return (
        <>
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={onChange} />
            <input type="text" placeholder="Style" name="style" value={formData.style} onChange={onChange} />
            <input type="text" placeholder="Address" name="address" value={formData.address} onChange={onChange} />
            <input type="number" placeholder="Latitude" name="lat" value={formData.latlng[0]} step="0.00001" onChange={onChange} />
            <input type="number" placeholder="Longitude" name="lng" value={formData.latlng[1]} step="0.00001" onChange={onChange} />
            <button onClick={onSubmit}>Submit</button>
        </>
    )
}

export default Form;