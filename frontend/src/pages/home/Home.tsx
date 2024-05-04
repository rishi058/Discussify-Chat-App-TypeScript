import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className="justify-center flex items-center">
			<div className="border-2 border-slate-600 w-[95vw] h-[90vh] m-4 rounded-3xl flex lg:w-[70vw]">
				<Sidebar />
				<MessageContainer />
			</div>
		</div>
	);
};
export default Home;