import ProfileDropdown from "./Dashboard/ProfileDropdown";

interface TopbarProps {
  showNav: boolean;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Topbar: React.FC<TopbarProps> = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`fixed z-10 bg-white dark:bg-gray-900 w-full h-16 flex justify-between items-center transition-all duration-[400ms] shadow-md ${
        showNav ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8 cursor-pointer text-darkColor "
          onClick={() => setShowNav(!showNav)}
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="flex items-center justify-center gap-3 pr-4 md:pr-16">
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Topbar;
