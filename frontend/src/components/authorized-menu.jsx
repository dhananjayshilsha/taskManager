import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthorizedMenu({ handleLogoutClick }) {

    const [isOpenMenuList, setOpenMenuList] = useState(false)

    const handlemwnuList = () => {
        setOpenMenuList(!isOpenMenuList)
    }

    return (
        <>
            <div className='' onClick={handlemwnuList}>
                <img width={50} src="/avatar-placeholder.svg" alt="" />
            </div>

            {isOpenMenuList && <div className=' w-32 text-center absolute right-5 space-x-3 bg-primary p-5 rounded-md'  >
                <div  className=' my-3'    onClick={handleLogoutClick} >
                    Log out
                </div>
            </div>}
        </>
    );
}


