import React, { useState } from "react";
import Card from '../../components/card/Card';
import { Link, useParams } from 'react-router-dom';
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/service";

const initialState = { password: "", password2: "", };

const Reset = () => {
    const [formData, setFormData] = useState(initialState);
    const { password, password2 } = formData;
    const { resetToken } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const reset = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            return toast.error("Passwords must be up to 6 characters");
        }
        if (password !== password2) {
            return toast.error("Passwords do not match");
        }
        const userData = { password, password2, };

        try {
            const response = await resetPassword(userData, resetToken);
            toast.success(response.message)
        } catch (error) {
            console.log(error.message);
        }

    }
    return (
        <>
            <Card>
                <div className='d-flex justify-content-center'>
                    <MdPassword size={35} color="#999" />
                </div>
                <div className='bg-white p-3 rounded w-auto bg-info'>
                    <h4 className='d-flex align-content-center justify-content-center'>Reset Password</h4>
                    <form onSubmit={reset}>
                        <div className="mb-3">
                            <label htmlFor="email">
                                <strong>New Password</strong>
                            </label>
                            <input
                                required
                                type="password"
                                placeholder="Enter a new Password"
                                autoComplete="off"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                className="form-control rounded-2 mt-2 p-1 m-auto"
                            />
                            <br />
                            <input
                                required
                                type="password"
                                placeholder="Enter a new Password"
                                autoComplete="off"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                                className="form-control rounded-2 p-1 m-auto"
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 rounded-2  hover:font-bold">
                            Update
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

export default Reset;
