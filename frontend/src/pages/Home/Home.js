import React from 'react';
import './Home.scss';
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLinks";
import Image from "../../assets/inv-img.png";

const Home = () => {
    return (
        <div className="home bg-[#030b6b] min-h-screen">
            <nav className="container d-flex justify-content-between pt-6 pb-6 text-white">
                <div className="logo text-white">
                    <RiProductHuntLine size={35} />
                </div>
                <ul className="home-links d-flex justify-content-between list-unstyled">
                    <ShowOnLogout>
                        <li className="p-2">
                            <Link to="/register" className='text-white  text-decoration-none'>Register</Link>
                        </li>
                    </ShowOnLogout>
                    <ShowOnLogout>
                        <li>
                            <button className="btn btn-primary  ms-3">
                                <Link to="/login" className='text-white m-2  text-decoration-none'>Login</Link>
                            </button>
                        </li>
                    </ShowOnLogout>
                    <ShowOnLogin>
                        <li>
                            <button className="btn btn-primary ms-3">
                                <Link to="/dashboard" className=' text-white m-2 text-decoration-none'>Dashboard</Link>
                            </button>
                        </li>
                    </ShowOnLogin>
                </ul>
            </nav>
            <section className="container d-flex justify-content-center align-items-center">
                <div className='w-50 text-white mg-2'>
                    <h2 className='d-block'>Inventory {"&"} Management System</h2>
                    <p>
                        Inventory system to control and manage proucts in the warehouse in
                        real timeand integrated to make it easier to develop your business.
                    </p>
                    <div>
                        <div className="btn btn-body btn-outline-primary">
                            <Link to="/dashboard" className='text-white text-decoration-none'>Free Trial 1 Month</Link>
                        </div>
                        <div className='d-flex mt-4'>
                            <NumberText num="14K" text="Brand Owners" />
                            <NumberText num="23K" text="Active Users" />
                            <NumberText num="500+" text="Partners" />
                        </div>
                    </div>
                </div>
                <div className='object-fill	mb-5'>
                    <img src={Image} alt="inventory_image" />
                </div>
            </section>
        </div >
    );
}

const NumberText = ({ num, text }) => {
    return (
        <div className='p-2'>
            <h3>{num}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Home;