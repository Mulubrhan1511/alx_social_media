import React,{useState} from "react";
import { Fragment, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, MagnifyingGlassIcon  } from '@heroicons/react/24/outline'
const user = JSON.parse(localStorage.getItem("user"));
const navigation = 
  user ? [
  { name: 'Home', href: '/', current: false },
  
  { name: 'Message', href: '/messsage1', current: false },
  { name: 'Upload', href: '/createpost', current: false },
  { name: 'About', href: '/about', current: false },
 
  
  ]
  : 
  [
    { name: 'Home', href: '/ho', current: false },
  { name: 'About', href: '/aboutl', current: false },
  
  ]
  
  


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { state, dispatch } = useContext(UserContext);
  const closeMenu = () => setIsMenuOpen(false);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchusers, setSearchusers] = useState([]);
  
  const fetchUsers = (query) =>{
    setSearch(query)
    fetch('/serach-users',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        query
      })
      }).then((res)=> res.json())
      .then((data)=>{
        setSearchusers(data.user)

    })
  }
  const handleSignOut = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
    window.location.reload();
  };
  const toggleModal = (postId) => {
    
    setShowModal(!showModal);
  };
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
        {showModal && (
  <div
    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
  >
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-4xl mx-auto" style={{ maxWidth: '70vw', maxHeight: '60vh' }}>
      <button
        type="button"
        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={toggleModal}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close modal</span>
      </button>
      <div className="p-4">
        <div className="relative mb-3" data-te-input-wrapper-init>
          <input
            type="search"
            className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleSearch2"
            placeholder="Type query"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
          />
          <label
            htmlFor="exampleSearch2"
            className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none"
          >
            Search
          </label>
        </div>
        <ul className="max-w-md divide-y divide-gray-200 mt-4" style={{ maxHeight: '10rem', overflowY: 'auto' }}>
          {searchusers.map((item) => (
            <li className="pb-3 sm:pb-4" onClick={toggleModal}>
            <a href={item._id !== user._id ? '/profile1/' + item._id : '/profile1/'} key={item.id}>
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  <img className="w-12 h-12 rounded-full" src={item.pic} alt="Neil image" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {item.email}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900">
                  {item.followers.length} followers
                </div>
              </div>
            </a>
          </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
)}
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2  hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden md:ml-6 md:block">
              <a href={user ? "/" : "/ho"}>
                  <img
                    className="h-8 w-auto"
                    src="https://res.cloudinary.com/dhw1mueq4/image/upload/v1696845956/Screenshot_from_2023-10-09_13-05-26_xp1sjw.png"
                    alt="Your Company"
                  />
                  </a>
                </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:items-center">
              <div className="lg:hidden lg:flex lg:items-center">
                  <a href={user ? "/" : "/ho"}><img
                    className="h-8 w-auto"
                    src="https://res.cloudinary.com/dhw1mueq4/image/upload/v1696845956/Screenshot_from_2023-10-09_13-05-26_xp1sjw.png"
                    alt="Your Company"
                  /></a>
                </div>
                <div className="hidden sm:ml-6 sm:block flex items-center sm:justify-center">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'text-white' : 'hover:bg-blue-400 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {
                  user ? [
                    <button
                  type="button"
                  className="relative rounded-full p-1 text-blue-400 hover:text-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-400"
                  onClick={toggleModal}
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                  ] : [
                    null
                  ]
                }

                {/* Profile dropdown */}
                {
                  user ? [
                    <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.pic}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile1"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/editprofile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            EditProfile 
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          onClick={handleSignOut} // Add onClick event to call handleSignOut function
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                  ] : [
                    <div class="flex items-center gap-6">
                    <button class="bg-[#5d93f1] text-white px-4 py-1 rounded-full hover:bg-[#0f67ae]">
                      <a href="/signin" class="text-white">Join Us</a>
                    </button>
                    <ion-icon onclick="onToggleMenu(this)" name="menu" class="text-3xl cursor-pointer md:hidden md hydrated" role="img" aria-label="menu"></ion-icon>
                  </div>
                  ]
                }
                
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
