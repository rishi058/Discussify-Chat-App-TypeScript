import CircleAnimationSwitch from "../switch/circleAnimationSwitch";

const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between items-center py-4 px-8 bg-white text-gray-800 dark:bg-gray-950 dark:text-white">
        <div></div>
        <div className="text-lg font-semibold">Discussify</div>
        <div>
          <CircleAnimationSwitch />
        </div>
      </nav>
      <div className="border-b border-gray-300 dark:border-gray-700"></div>
    </>
  );
};

export default NavBar;
