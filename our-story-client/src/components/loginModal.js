import React from 'react';
import { Link } from 'react-router-dom';


 const LoginModal = (props) => {
    return (
        <div>
            Log in here!
            <Link to='/home' onClick ={e => props.showModal(e, 'submit')}>Log in</Link>
            <button onClick ={e => props.showModal(e, 'submit')}>back</button>

        </div>
    )
}

export default LoginModal