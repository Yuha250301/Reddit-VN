/* eslint-disable prettier/prettier */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./main/main"
import "assets/scss/_app.scss";
import { RecoilRoot } from "recoil";


class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <RecoilRoot>
        <BrowserRouter>
          <div className="app">
            <Main />
          </div>
        </BrowserRouter>
      </RecoilRoot>
    );
  }
}

export default App;
