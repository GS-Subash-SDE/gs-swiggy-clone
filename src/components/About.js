import { useContext } from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from "../../utils/UserContext";

const About = () => {
  const { loggedInUser } = useContext(UserContext);
  return <div>
    <h1>About page</h1>
    <h2>{loggedInUser}</h2>
    <User />
    <UserClass myName={'Gabriel'} loc={'Heaven'} />
    </div>
}

export default About;