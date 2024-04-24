import { useState } from 'react';

import Login from './Login';
import Register from './Register';

export default function App() {
    let [isLogin, setLogin] = useState(true);

    return (
        <>
            {isLogin ? <Login setSwap={setLogin} /> : <Register setSwap={setLogin} />}
        </>
    );
}