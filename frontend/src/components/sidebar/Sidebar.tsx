import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div className="p-4 flex flex-col min-w-[240px] border-slate-600 w-[30vw] lg:w-[20vw] sm:border-r-2">
      <SearchInput />
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
