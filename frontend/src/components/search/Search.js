// import React from 'react';
// import { BiSearch } from "react-icons/bi";
// import styles from "./Search.module.scss";

// const Search = ({ value, onChange }) => {
//     return (
//         // <div className="search m-1 position-relative flex-1">
//         <div className={styles.Search}>
//             <BiSearch size={18} className={styles.icon} />
//             {/* <BiSearch size={18} value={{ className: "icon position-absolute top-1/2 left-4 translate-y-1/2" }} /> */}
//             {/* <input className='flex p-2 pl-12 w-full border-2 rounded-sm	outline-0 m-4 font-light text-2xl' type="text" placeholder='Search Products' value={value} onChange={onChange} /> */}
//             <input type="text" placeholder='Search Products' value={value} onChange={onChange} />
//         </div>
//     );
// }

// export default Search;


import React from "react";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
    return (
        <div className={styles.search}>
            <BiSearch size={18} className={styles.icon} />
            <input
                type="text"
                placeholder="Search products"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Search;
