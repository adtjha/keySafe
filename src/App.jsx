import { createContext, useContext, useEffect } from "react";
import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/landingPage";
import { authMachine } from "./xstate/authMachine";
import { useActor, useInterpret } from "@xstate/react";
import { DashboardWrapper } from "./components/DashboardWrapper";
import { Users } from "./pages/api/users";
import { New } from "./pages/api/new";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./pages/profile";
import { UserNew } from "./pages/api/user/new";

export const GlobalStateContext = createContext({});

const App = () => {
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
};

const Home = () => {
  const globalServices = useContext(GlobalStateContext);
  const [state] = useActor(globalServices.authService);

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
            <Route path=':id/:name/*' index element={<Users />}></Route>
            <Route path='new' element={<New />} />
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
