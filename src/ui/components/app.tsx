/* eslint-disable prettier/prettier */
import React from "react";
import Login from "./login/login";

import "assets/scss/_app.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Login/>
    </div>
  );
};

export default App;
