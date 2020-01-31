import React from 'react';
import { Link } from 'react-router-dom';


 const SignUpModal = (props) => {
    return (
        <div>

            Sign up here!
            <Link to='home'  onClick ={e => props.showModal(e, 'submit')}>Sign Up</Link>
            <button onClick ={e => props.showModal(e, 'submit')}>back</button>
            
        </div>
    )
}

export default SignUpModal