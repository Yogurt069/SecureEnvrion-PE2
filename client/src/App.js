import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import JoinRoom from "./component/JoinRoom"
import ChatRoom from "./component/ChatRoom"
import CreateRoom from "./component/CreateRoom"


function App(){
    return(
        <Router>
            <Switch>
                <Route exact path ="/" component = {Home} />
                <Route path ="/join" component = {JoinRoom} />
                <Route path ="/create" component = {CreateRoom} />
                <Route path ="/chat" component = {ChatRoom} />
            </Switch>
        </Router>
    )
}

export default App;