import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";

function MobileNav({ user, isDropdownOpen, setIsDropdownOpen }) {
  return (
    <>
      <div className="flex w-full items-center justify-between lg:hidden">
        <div className="w-28">
          <img
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;*,*"
            alt="logo"
            className="w-full h-full"
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">
            Use App
          </button>
          {user ? (
            <>
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 w-16 h-16 rounded-full"
              >
                <img
                  src="https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1642684921~hmac=792944c6ce89bc2fb1a6b665f0499525"
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 bg-white w-40 z-30 flex flex-col gap-2 text-center rounded top-16 -right-6">
                  <button>My Account</button>
                  <button>Orders</button>
                  <button>Logout</button>
                </div>
              )}
            </>
          ) : (
            <>
              <span
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 rounded-full"
              >
                <FaUserAlt />
              </span>
              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 -bottom-20 -right-4 w-full bg-white flex flex-col gap-2">
                  <button>Signin</button>
                  <button>Register</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
function LargeNav({ user, isDropdownOpen, setIsDropdownOpen }) {
  return (
    <>
      <div className="hidden lg:inline container px-32 mx-auto">
        <div className="hidden gap-4 w-full items-center justify-around lg:flex">
          <div className="w-28">
            <img
              src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png?fit=around|198:42&crop=198:42;*,*"
              alt="logo"
              className="w-full h-full"
            />
          </div>
          <div className="w-3/4 bg-white shadow-md p-3 flex items-center gap-3 border border-gray-200 rounded">
            <div className="flex items-center gap-2 border-r-2 border-gray-300 pr-2">
              <span className="text-zomato-300">
                <HiLocationMarker />
              </span>
              <input
                type="text"
                placeholder="Bengaluru"
                className="focus:outline-none"
              />
              <IoMdArrowDropdown />
            </div>
            <div className="flex w-full items-center gap-2">
              <RiSearch2Line />
              <input
                type="text"
                placeholder="Search for restaurant , cusine or a dish"
                className="focus:outline-none w-full"
              />
            </div>
          </div>
          {user ? (
            <div className="relative w-14">
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="border p-2 border-gray-300 text-zomato-400 w-full h-14 rounded-full"
              >
                <img
                  src="https://cdn-icons.flaticon.com/png/512/706/premium/706807.png?token=exp=1642684921~hmac=792944c6ce89bc2fb1a6b665f0499525"
                  alt="avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {isDropdownOpen && (
                <div className="absolute shadow-lg py-3 bg-white w-40 flex z-30 flex-col gap-2 text-center rounded -right-10">
                  <button>My Account</button>
                  <button>Orders</button>
                  <button>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-24 flex gap-6">
              <button className="text-gray-500 text-lg hover:text-gray-800">
                Login
              </button>
              <button className="text-gray-500 text-lg hover:text-gray-800">
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function Header() {
  const [user, setUser] = useState({
    name: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <>
      <nav className="p-4 flex bg-white shadow-md lg:shadow-none w-full items-center">
        <MobileNav
          user={user}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
        <LargeNav
          user={user}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
        />
      </nav>
    </>
  );
}

export default Header;
