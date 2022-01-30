import { Link } from 'react-router-dom';

const Nav = ({ styleList }) => {

    return (
        <div style={navStyle}>
        { styleList &&  (
            styleList.map((style, index) => (
                <Link style={linkStyle} key={`style_${index}`} to={`/restaurants/bystyle/${style}`}>
                    <h3 style={headerStyle}>{style}</h3>
                </Link>
        )))}
        </div>
    )

}

const navStyle = {
    display: 'flex',
};
const linkStyle = {
    color: 'whitesmoke',
    textDecoration: 'none'
}
const headerStyle = {
    fontSize: 24,
    margin: 0,
    marginLeft: 10
};

export default Nav;