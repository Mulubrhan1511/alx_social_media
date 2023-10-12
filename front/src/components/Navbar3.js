import React from "react";
import { Fragment, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  ChatBubbleLeftIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

const user = JSON.parse(localStorage.getItem("user"));
// profile menu component
const profileMenuItems = user
  ? [
      {
        label: "My Profile",
        icon: UserCircleIcon,
        href: "/profile",
      },
      {
        label: "Edit Profile",
        icon: Cog6ToothIcon,
        href: "/profile",
      },
      {
        label: "Inbox",
        icon: InboxArrowDownIcon,
      },
      {
        label: "Help",
        icon: LifebuoyIcon,
      },
      {
        label: "Sign Out",
        icon: PowerIcon,
      },
    ]
  : [
    {
        label: "Sign In",
        icon: PowerIcon,
        href: "/signin",
      },
      {
        label: "Sign UP",
        icon: PowerIcon,
        href: "/signup",
      },
  ];



function ProfileMenu() {
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
    user ? (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              alt="tania andrew"
              className="border border-gray-900 p-0.5 avatar-sm"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, href }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  if (label === "Sign Out") {
                    handleSignOut(); // Call handleSignOut when label is "Sign Out"
                  } else {
                    navigate(href); // Navigate to the specified href
                    closeMenu(); // Close the menu
                  }
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    ) : (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <h1 style={{ color: 'white', background: 'blue', padding: '10px', display: 'inline-block', borderRadius: '5px' }}>Join Us</h1>
           
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, href }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  if (label === "Sign Out") {
                    handleSignOut(); // Call handleSignOut when label is "Sign Out"
                  } else {
                    navigate(href); // Navigate to the specified href
                    closeMenu(); // Close the menu
                  }
                }}
                className={`flex items-center gap-2 rounded `}
              >
               
               <Typography
                as="span"
                variant="small"
                className="font-normal"
                color="blue"
                >
                {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    )
  );
}
 

 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
 
 
 
}
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeIcon,
    href:"/"
  },
  {
    label: "Message",
    icon: ChatBubbleLeftIcon,
    href:"/messsage",
    
  },
  {
    label: "About",
    icon: CodeBracketSquareIcon,
    href:"/about"
  },
  {
    label: "Create Post",
    icon: CodeBracketSquareIcon,
    href:"/createpost"
  },
  

];
 
function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
  {navListItems.map(({ label, icon, href }, key) => (
    <Typography
      key={label}
      as="a"
      href={href}
      variant="small"
      color="#3c5a66" // Set the color to #3c5a66
      className="font-normal"
      style={{ fontWeight: "bold" }} // Set the label to bold
    >
      <MenuItem className="flex items-center gap-2 lg:rounded-full">
        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
        {label}
      </MenuItem>
    </Typography>
  ))}
</ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        
            <ProfileMenu />
        
        
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}