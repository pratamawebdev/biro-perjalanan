import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Sidebar from "../Fragments/Sidebar";
import Topbar from "../Fragments/Topbar";
import { UserData, getUser } from "../../services/auth.service";

const ProfileLayouts = () => {
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleResize = () => {
    if (window.innerWidth <= 640) {
      setIsMobile(true);
      setShowNav(false);
    } else {
      setIsMobile(false);
      setShowNav(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Topbar showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter=" transform transition duration-[400ms] "
        enterFrom=" -translate-x-full "
        enterTo=" translate-x-0 "
        leave=" transform  duration-[400ms] transition ease-in-out "
        leaveFrom=" translate-x-0 "
        leaveTo=" -translate-x-full"
      >
        <Sidebar showNav={showNav} />
      </Transition>
      <main
        className={`pb-16 pt-8 h-screen  transition-all duration-[400ms]  ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 py-16 md:px-16">
          <div className="flex flex-col gap-8 mb-8 md:justify-between md:items-center md:flex-row">
            <p className="text-3xl font-bold ">Tourist</p>
          </div>
          <div>
            <div className="flex flex-col justify-center p-6 shadow-md lg:col-span-3 rounded-xl sm:px-12 ">
              <img
                src={user?.avatar}
                alt=""
                className="object-cover w-32 h-32 mx-auto border border-gray-400 rounded-full aspect-square"
              />
              <div className="space-y-4 text-center divide-y divide-gray-700">
                <div className="my-2 space-y-1">
                  <h2 className="text-xl font-semibold sm:text-2xl">
                    {user?.name}
                  </h2>
                  <p className="px-5 text-xs sm:text-base ">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileLayouts;
