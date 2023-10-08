import { Link } from 'react-router-dom';

function Register()
{
    return (
        <>
            <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                <h1 style={{margin: '0px'}}>FoodLine</h1>
            </Link>
            Registrar aqui
        </>
    );
}

export default Register;