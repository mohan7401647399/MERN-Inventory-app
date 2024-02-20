import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../../services/service';
import { SET_LOGIN, selectName } from '../../redux/features/auth/authSlice.js'

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName)

    const logOut = async () => {
        await logoutUser()
        await dispatch(SET_LOGIN(false))
        navigate('/login')
    }

    return (
        <div className='header p-2'>
            <div className='d-flex justify-content-between'>
                <h3>
                    <span className=' text-black-50'>Welcome,</span>
                    <span className=' text-danger'> {name} </span>
                </h3>
                <button onClick={logOut} className='btn btn-danger'>Logout</button>
            </div>
        </div>
    );
}

export default Header;