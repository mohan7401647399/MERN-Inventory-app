import React, { useState } from 'react';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail, registerUser } from '../../services/service.js';
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice.js'
import Loader from '../../components/Loader/Loader.js';
import { TiUserAddOutline } from "react-icons/ti";

const initialState = { name: "", email: "", password: "", password2: "", };

const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const { name, email, password, password2 } = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const register = async (e) => {
        e.preventDefault()

        console.log(formData);
        if (!name || !email || !password) {
            return toast.error("All fields are required")
        }
        if (password.length < 6) {
            return toast.error("Password must be 6 characters")
        }
        if (password !== password2) {
            return toast.error("Passwords do not matched")
        }
        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email")
        }

        const userData = { name, email, password }
        setIsLoading(true)
        try {
            const data = await registerUser(userData);
            console.log(data);
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
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2 className='d-flex align-content-center justify-content-center'>Register</h2>
                <form onSubmit={register} className='mb-2'>
                    <div className="mb-3">
                        <label htmlFor="email" className='mb-2'>
                            <strong>Name</strong>
                        </label>
                        <input required type="text" placeholder='Enter name' autoComplete='off' name='name' className='form-control rounded-0' value={name}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="mb-2">
                            <strong>Email</strong>
                        </label>
                        <input required type="email" placeholder='Enter Email' autoComplete='off' name='email' className='form-control rounded-0' value={email}
                            onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className=' mb-2'>
                            <strong>Password</strong>
                        </label>
                        <input required type="password" placeholder='Enter password' name='password' className='form-control rounded-0 mb-2' value={password}
                            onChange={handleChange} />
                        <input required type="password" placeholder='Confirm password' name='password2' className='form-control rounded-0' value={password2}
                            onChange={handleChange} />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Register
                    </button>
                </form>
                <div className='d-flex justify-content-between'>
                    <Link to="/" className=' text-decoration-none'>Home</Link>
                    <p>Already have an account?</p>
                    <Link to="/login" className='btn btn-default bg-light rounded-0 text-decoration-none'>Login</Link>
                </div>
            </Card>
        </>
    );
}

export default Register;
