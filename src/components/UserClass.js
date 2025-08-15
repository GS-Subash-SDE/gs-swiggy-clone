import { Component } from "react";
import UserContext from "../../utils/UserContext";


class UserClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
  count:0,count1:9
}    
  }

  componentDidMount() {
    console.log("Mounted");
    this.timer = setInterval(() => {
      console.log('timeout');
      
    },1000)
  }

  componentDidUpdate() {
    console.log("Updated "+this.state.count);
    
  }

  componentWillUnmount() {
    console.log("Will Unmount");
    clearInterval(this.timer);
  }

  render() {
    const { myName, loc } = this.props;
    const { count } = this.state;

    return (
      <div className="userCard">
        <p>{count}</p>
        <button onClick={() => {
          
          this.setState({count:this.state.count+1});
          console.log(this.state);
          // this.setState({...this.state,count:this.state.count+1,})
        }}>inc</button>
        
          <UserContext.Consumer>

            {(a) => <h1>{a.loggedInUser}</h1>}
          </UserContext.Consumer>
        
        <h1>Name: {myName}</h1>
        <h2>Location: {loc}</h2>
        <h3>Address: GS Subash</h3>
      </div>
    );
  }

}

export default UserClass;