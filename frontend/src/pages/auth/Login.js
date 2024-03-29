import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { loginUser, validateEmail } from '../../services/service.js';
import Loader from '../../components/Loader/Loader';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice.js'
import { BiLogIn } from "react-icons/bi";

const initialState = { email: "", password: "" };


const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { email, password } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const login = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            return toast.error("All fields are required");
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        const userData = { email, password };
        setIsLoading(true);
        try {
            const data = await loginUser(userData)
            dispatch(SET_LOGIN(true))
            dispatch(SET_NAME(data.name))
            navigate('/dashboard')
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    return (
        <>
            {isLoading && <Loader />}
            <Card>
                <div className='d-flex justify-content-center'>
                    <BiLogIn size={35} color="#999" />
                </div>
                <h2 className='d-flex align-content-center justify-content-center'>Login</h2>
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input required type="email" placeholder='Enter Email' autoComplete='off' name='email' className='form-control rounded-2 p-1 m-auto' value={email}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input required type="password" placeholder='Enter password' name='password' className='form-control rounded-2 p-1 m-auto' value={password}
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-2  hover:font-bold'>
                        Login
                    </button>
                </form>
                <Link to="/forgot" className=' text-decoration-none'>Forgot Password</Link>
                <span className='d-flex justify-content-between align-content-center p-2'>
                    <Link to="/" className='btn btn-primary text-decoration-none m-1 p-1  hover:font-bold'>Home</Link>
                    <p className='m-2'> &nbsp; Don't have an account &nbsp;</p>
                    <Link to="/register" className='btn btn-primary text-decoration-none m-1 p-1  hover:font-bold'>Signup</Link>
                </span>
            </Card>
        </>
    );
}

export default Login;
