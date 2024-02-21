import React, { useState } from "react";
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from "react-icons/ai";
import { forgotPassword, validateEmail } from '../../services/service.js';
import { toast } from 'react-toastify';

const Forgot = () => {
    const [email, setEmail] = useState("");

    const forgot = async (e) => {
        e.preventDefault()
        if (!email) {
            return toast.error("Please enter an email");
        }

        if (!validateEmail(email)) {
            return toast.error("Please enter a valid email");
        }
        await forgotPassword({ email })
        setEmail("")
    }

    return (
        <>
            <Card>
                <div className='bg-white p-3 rounded w-auto bg-info'>
                    <div className='d-flex justify-content-center'>
                        <AiOutlineMail size={35} color="#999" />
                    </div>
                    <h4 className='d-flex align-content-center justify-content-center'>Forgot Password</h4>
                    <form onSubmit={forgot}>
                        <div className="mb-3">
                            <label htmlFor="email" className='mb-2'>
                                <strong>Email</strong>
                            </label>
                            <input
                                required
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control rounded-2 p-1 m-auto"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-2">
                            Get Reset Email
                        </button>
                        <div className='d-flex justify-content-between mt-1'>
                            <p> <Link to="/"> - Home</Link></p>
                            <p> <Link to="/login"> - Login</Link></p>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}

export default Forgot;
