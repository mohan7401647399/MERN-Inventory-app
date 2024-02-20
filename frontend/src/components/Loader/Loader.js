import React from 'react';
import LoaderImg from '../../assets/loader.gif';
import ReactDom from 'react-dom';
// import './Loader.css';

const Loader = () => {
    return ReactDom.createPortal(
        <div className="wrapper position-fixed w-100 h-100 bg-[ rgba(0, 0, 0, 0.7)] z-10">
            <div className="loader position-fixed top-1/2 left-1/2 z-auto transform translate-[-50%, -50%]">
                <img src={LoaderImg} alt="loader" />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export const SpinnerImg = () => {
    return (
        <div className=" align-items-center">
            <img src={LoaderImg} alt="loading..." />
        </div>
    )
}

export default Loader;