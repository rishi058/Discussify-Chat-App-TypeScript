import Sidebar from "../sidebar/Sidebar";

function Drawer() {

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-950 min-h-full">
        <Sidebar />
      </div>
    </div>
  );
}

export default Drawer;
