import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import { ApiDetails } from "./components/Details";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route, createSearchParams } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { authMachine } from "./xstate/authMachine";
import { useActor, useInterpret } from "@xstate/react";
import { DashboardWrapper } from "./components/DashboardWrapper";
import { ApiUsers } from "./components/Users";
import { APINew } from "./components/APINew";
import Protected from "./components/Protected";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./components/Profile";
import { UserNew } from "./components/UserNew";

export const GlobalStateContext = createContext({});

function App() {
  const authService = useInterpret(authMachine);

  useEffect(() => {
    authService.onTransition((state) => console.log(state.value));
  }, [authService]);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      <div className='App w-full h-full scroll-smooth font-sans'>
        <ToastContainer />
        <Home />
      </div>
    </GlobalStateContext.Provider>
  );
}

const Home = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.authService);

  if (["checkLogin", "loading"].some(state.matches)) {
    return <>Loading</>;
  } else if (state.matches("loggedIn")) {
    return (
      <>
        <Routes>
          <Route
            path='/'
            element={
              <DashboardWrapper>
                <Dashboard />
              </DashboardWrapper>
            }
          />
          <Route path='api'>
            <Route
              path=':apiId/:apiName/*'
              index
              element={<ApiUsers />}></Route>
            <Route path='new' element={<APINew />} />
          </Route>
          <Route path='/user/new' element={<UserNew />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </>
    );
  } else {
    return <LandingPage />;
  }
};

export default App;
