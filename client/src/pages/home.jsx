import React from "react";
import {useHistory} from "react-router-dom";

function Home(){
    const history = useHistory();
    return(
        <div className="main-container">
  <div className="home-card">

    <h1>Anonymous Chat Room</h1>
    <p className="subtitle">
      Secure • Temporary • Encrypted
    </p>

    <div className="btn-group">
      <button onClick={() => history.push("/join")}>
        Join Room
      </button>

      <button onClick={() => history.push("/create")}>
        Create Room
      </button>
    </div>

  </div>
</div>
    )
}

export default Home;