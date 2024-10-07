import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Parcels from "./pages/Parcels";
import Parcel from "./pages/UpdateParcel";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import Login from "./pages/Login";
import NewParcel from "./pages/NewParcel";
import NewUser from "./pages/NewUser";
import MyParcels from "./pages/MyParcels";
import MyParcel from "./pages/MyParcels";
import UserHome from "./pages/UserHome";
import AllParcels from "./pages/AllParcels";
import ParcelDetails from "./pages/ParcelDetails";
import { useSelector } from "react-redux";
import UpdateParcel from "./pages/UpdateParcel";
import { PrivateRoute } from "./routes/PrivateRoute";
import { AdminRoute } from "./routes/AdminRoute";

function App() {
  const user = useSelector((state) => state.user);
  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div className="flex">
          <div className="w-[20%]">
            <Menu />
          </div>
          <div className="w-[80%]">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },

        {
          path: "/getallparcels",
          element: (
            <AdminRoute>
              <AllParcels />
            </AdminRoute>
          ),
        },
        {
          path: "/updateparcels/:id",
          element: (
            <AdminRoute>
              <UpdateParcel />
            </AdminRoute>
          ),
        },

        {
          path: "/newparcel",
          element: (
            <AdminRoute>
              <NewParcel />
            </AdminRoute>
          ),
        },

        {
          path: "/users",
          element: (
            <AdminRoute>
              <Users />
            </AdminRoute>
          ),
        },
        {
          path: "/newuser",
          element: (
            <AdminRoute>
              <NewUser />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/userhome", element: <UserHome /> },
    {
      path: "/myparcels",
      element: (
        <PrivateRoute>
          <MyParcels />
        </PrivateRoute>
      ),
    },
    {
      path: "/parcel/:parcelId",
      element: (
        <PrivateRoute>
          <MyParcel />
        </PrivateRoute>
      ),
    },
    {
      path: "/allparcels",
      element: (
        <PrivateRoute>
          <Parcels />
        </PrivateRoute>
      ),
    },
    {
      path: "/parceldetails/:parcelId",
      element: (
        <PrivateRoute>
          <ParcelDetails />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
