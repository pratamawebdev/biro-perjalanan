import { forwardRef } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  showNav: boolean;
}
const Sidebar = forwardRef<HTMLDivElement, SidebarProps>((_, ref) => {
  return (
    <aside
      ref={ref}
      className="fixed z-10 w-56 h-full bg-white border-r-2 border-gray-200 shadow-lg"
    >
      <div className="flex justify-center mt-8 mb-8 ">
        <h1 className="text-3xl font-bold text-blue-600">Tourist</h1>
      </div>

      <div className="flex flex-col ">
        <>
          <Link to="/">
            <div
              className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors
              
              `}
            >
              <div className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </div>
              <p>Tourist</p>
            </div>
          </Link>
        </>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
