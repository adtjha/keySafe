import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import "./App.css";
import { ApiDetails } from "./components/ApiDetails";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { authMachine } from "./xstate/authMachine";
import { useActor, useInterpret } from "@xstate/react";
import { DashboardWrapper } from "./components/DashboardWrapper";
import { ApiUsers } from "./components/APIUsers";
import { APINew } from "./components/APINew";
import Protected from "./components/Protected";

export const GlobalStateContext = createContext({});

function App() {
  const authService = useInterpret(authMachine);

  useEffect(() => {
    authService.onTransition((state) => console.log(state.context));
  }, [authService]);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      <div className='App h-screen'>
        <Home />
      </div>
    </GlobalStateContext.Provider>
  );
}

const Home = () => {
  const [isLogin, setIsLogin] = useState();
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  useEffect(() => {
    setIsLogin(state.matches("loggedIn"));
  }, [state]);

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            isLogin ? (
              <DashboardWrapper>
                <Dashboard />
              </DashboardWrapper>
            ) : (
              <LandingPage />
            )
          }
        />
        <Route
          path='/api'
          element={
            <Protected isLoggedIn={isLogin}>
              <ApiUsers />
            </Protected>
          }
        />
        <Route
          path='/api/:key'
          element={
            <Protected isLoggedIn={isLogin}>
              <ApiDetails />
            </Protected>
          }
        />
        <Route
          path='/api/new'
          element={
            <Protected isLoggedIn={isLogin}>
              <APINew />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default App;
