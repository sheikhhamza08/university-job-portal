import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Browse from "./components/Browse";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import JobDescription from "./components/JobDescription";
import Profile from "./components/Profile";

const appRouter = createBrowserRouter([
  // for student role
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },

  // for admin role
  {
    path: "/admin/companies",
    element: (
        <Companies />
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
