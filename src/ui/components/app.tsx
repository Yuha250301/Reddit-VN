/* eslint-disable prettier/prettier */
import React from "react";
import Translate from "./translate/translate";
import Login from "./login/login"

import "assets/scss/_app.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <Translate/>
    </div>
  );
};

export default App;
