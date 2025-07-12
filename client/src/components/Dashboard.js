import { useSelector } from "react-redux";
import TopNavigation from "./TopNavigation";

function Dashboard() {
  let userDetails = useSelector((store) => {
    return store.userDetails;
  });
  return (
    <div>
      <TopNavigation></TopNavigation>
      <h1>Dashboard</h1>
      <h1>
        {userDetails.firstName}
        {userDetails.lastName}
        <img src={`/${userDetails.profilePic}`} alt=""></img>
      </h1>
    </div>
  );
}

export default Dashboard;
