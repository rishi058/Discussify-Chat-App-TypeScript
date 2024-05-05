import CircleAnimationSwitch from "../switch/circleAnimationSwitch";
import { IoMenu } from "react-icons/io5";
import appIcon from "../../../public/chat.png";
import { useAuthContext } from "../../context/AuthContext";


const NavBar = () => {
  const { authUser } = useAuthContext();

  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8 bg-white text-gray-800 dark:bg-gray-950 dark:text-white">
        <div className="hidden sm:block"></div>
        {authUser ? (
          <label htmlFor="my-drawer" className="sm:hidden">
            <IoMenu size={30} />
          </label>   // Drawer Invoke Button - Daisy UI, displayed only if authUser exists
        ): null}
        <div className="flex items-center">
        <img className="h-[25px]" src={appIcon} alt="👻"/>
        <div className="text-lg font-semibold">Discussify</div>
        </div>
        <div>
          <CircleAnimationSwitch />
        </div>
      </nav>
      <div className="border-b border-gray-300 dark:border-gray-700"></div>
    </>
  );
};

export default NavBar;
