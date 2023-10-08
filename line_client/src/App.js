import Home from './components/Home';
import Result from './components/Result';
import BoundMap from './components/BoundMap';
import Register from './components/Register';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/result" element={<Result />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
