import React from "react";
import { Fragment, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, HandThumbUpIcon  } from '@heroicons/react/24/outline'
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
  const handleSignOut = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/signin");
    window.location.reload();
  };
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
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
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
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
