import { Fragment, useEffect, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { UserData, getUser } from "../../../services/auth.service";

const ProfileDropdown = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    getUser((success, userDataOrError) => {
      if (success) {
        setUser(userDataOrError as UserData);
      } else {
        console.error(userDataOrError);
      }
    });
  }, []);
  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full">
          <img
            src={user?.avatar}
            className="object-cover border-2 border-white rounded-full shadow-sm w-7 h-7 md:mr-4"
            alt="profile_picture"
          />

          <span className="hidden font-medium md:block">{user?.name}</span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform scale-95"
        enterTo="transform scale-100"
        leave="transition ease-in duration=75"
        leaveFrom="transform scale-100"
        leaveTo="transform scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-56 mt-2 origin-top-right rounded shadow-sm bg-slate-500">
          <div className="p-1">
            <Menu.Item>
              <Link
                to="/profile"
                className="flex items-center p-2 text-sm text-white transition-colors rounded hover:bg-blue-400 hover:text-white group"
              >
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="/dashboard"
                className="flex items-center p-2 text-sm text-white transition-colors rounded hover:bg-blue-400 hover:text-white group"
              >
                Dashboard
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                onClick={handleLogout}
                to="#"
                className="flex items-center p-2 text-sm text-white transition-colors rounded hover:bg-blue-400 hover:text-white group"
              >
                Logout
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
