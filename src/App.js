import "./App.css";
import ContainerComponent from "./Components/MainPageComps/ContainerComponent";
import { Authenticator } from "@aws-amplify/ui-react";
function App() {
  return (
    <div className="App">
      <Authenticator.Provider>
        <ContainerComponent />
      </Authenticator.Provider>
    </div>
  );
}

export default App;
