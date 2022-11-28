import "./App.css";
import { useState } from "react";
import { Provider } from "./Context";
import { Subscriber, Topic } from "./components";

// Ex: Topics: [Cricket, Football, Hockey…] Subscribers [S1, S2, S3,…]

const initialState = {
  topics: ["Cricket", "Football", "Hockey"],
  subscribers: ["S1", "S2", "S3"],
};

function App() {
  const [state, setState] = useState(initialState);

  return (
    <Provider value={{ state, setState }}>
      <div className="container">
        <div className="subscriber_container">
          <Subscriber />
        </div>
        <div className="topic_container">
          <Topic />
        </div>
      </div>
    </Provider>
  );
}

export default App;
