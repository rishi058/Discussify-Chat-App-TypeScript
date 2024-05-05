import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import Drawer from "../../components/drawer/Drawer";

function Home()  {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page Content */}
        <div className="justify-center flex items-center">
          <div className="border-2 border-slate-600 w-[95vw] h-[90vh] m-4 rounded-3xl flex lg:w-[70vw]">
            <div className="hidden sm:flex">
              <Sidebar />
            </div>
            <MessageContainer />
          </div>
        </div>
        {/* Page Content */}
      </div>
      <Drawer />
    </div>
  );
}

export default Home;
