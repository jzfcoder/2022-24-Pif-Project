import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        const { address } = e.target.elements;
        const adrs = address.value;

        navigate('/result', {state: {address: adrs}});
    }

    const handleRegister = e => {
        e.preventDefault();

        navigate("/register");
    }

    return (
        <>
            <div style={{paddingTop: '15%'}}>
                <h1 className='homeTitle'>FoodLine</h1>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <input type='text' className='homeInput'placeholder='Address' id='address'/>
                    <button type='submit' className='homeSubmit'>find pantries near you</button>
                </form>
                <button className='register'onClick={handleRegister}>register a pantry</button>
            </div>
       </>
    );
}

export default Home;