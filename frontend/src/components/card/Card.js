import React from 'react';

const Card = ({ children }) => {
    return (
        <div className="container-fluid w-100 p-2">
            <div className="d-flex justify-content-center align-content-center">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="card mt-1 p-2">
                        <div className='bg-white rounded bg-info p-2'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
