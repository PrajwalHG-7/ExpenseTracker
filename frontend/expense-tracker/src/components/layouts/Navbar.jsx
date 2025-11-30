import React, { useState } from 'react'
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30'>
            <button
                className='block lg:hidden text-black'
                onClick={() => {
                    setOpenSideMenu(!openSideMenu)
                }}
            >
                {openSideMenu ? (
                    <HiOutlineX className='text-2xl' />
                ) : (
                    <HiOutlineMenu className='text-2xl' />
                )}
            </button>

            <div className='flex hover:cursor-pointer p-2 rounded-lg hover:bg-purple-200 bg-purple-100 items-center justify-center gap-2' onClick={() => {navigate("/dashboard")}}>
                <img src="/expenseTrackerLogo.png" alt="logo" className='h-10 w-10' />
                <h2 className='text-xl font-medium text-black'>Expense Tracker</h2>
            </div>

            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar