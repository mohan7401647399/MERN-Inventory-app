import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";
import { HiMenuAlt3 } from "react-icons/hi";
import menu from './Menu';
import SidebarItem from './SidebarItem';

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => { setIsOpen(!isOpen) };
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/")
    }

    return (
        <div className='d-flex'>
            <div className='sidebar' style={{ width: isOpen ? "230px" : "60px" }}>
                <div className="top_section bg-black">
                    <div className="logo" style={{ display: isOpen ? "block" : "none" }}>
                        <RiProductHuntLine size={35} style={{ cursor: "pointer" }} onClick={goHome} />
                    </div>
                    <div className="bars" style={{ marginLeft: isOpen ? "130px" : "0px" }}>
                        <HiMenuAlt3 onClick={toggle} />
                    </div>
                </div>
                {menu.map((item, value) => {
                    return <SidebarItem key={value} item={item} isOpen={isOpen} />
                })}
            </div>
            <main style={{ paddingLeft: isOpen ? "230px" : "62px", transition: "all 0.5s" }} className='w-100 bg-body-secondary'> {children} </main>
        </div>
    );
}

export default Sidebar;
