import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomePicture from './../../globe.gif'

function Navbar({session}) {
  const [openNav, setOpenNav] = useState(false);
  console.log('lmao')
  const handleDropDown = () => {
    setOpenNav(!openNav);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-slate-900 justify-between">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={HomePicture} className="h-8 mr-3" alt="GeoWhere Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GeoWhere</span>
        </Link>
        <button type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:text-blue-500 dark:focus:ring-gray-600" onClick={handleDropDown}>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${openNav ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to='/'
                onClick={handleDropDown}
                className='py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent'
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/'
                onClick={handleDropDown}
                className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
              >
                Play With Friends
              </Link>
            </li>
            <li>
              <Link
                to='/Quizform'
                onClick={handleDropDown}
                className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
              >
                Quiz
              </Link>
            </li>
            { session ? (
              <>
                <li>
                  <Link
                    to='/Account'
                    onClick={handleDropDown}
                    // className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                    
                  >
                    <img className="rounded-full h-6 ml-3 mt-1" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                    {/* Account */}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/"
                    onClick={() => supabase.auth.signOut()}
                    className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                  >
                    Logout
                  </Link>
                </li> */}
              </>
              
            ) : (
              <>
                <li>
                  <Link
                    to='/Account'
                    onClick={handleDropDown}
                    className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                </li>
                <li>
                <Link
                  to='/Register'
                  onClick={handleDropDown}
                  className="py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-blue-500 md:dark:hover:bg-transparent"
                >
                  Register
                </Link>
                </li>  
              </>
            )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;