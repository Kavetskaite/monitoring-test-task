import { BrowserRouter as Switch, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Monitoring } from "./pages";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Routes>
          <Route path="/" element={<Monitoring />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Switch>
    </Provider>
  );
}

export default App;
