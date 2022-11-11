import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";

import LandPage from "./pages/LandPage";
import SinglePost from "./pages/SinglePost";
import Blog from "./pages/Blog";
import IndexDashboard from "./dashboard/IndexDashboard";

import DashboardApp from "./dashboard/pages/DashboardApp";
import User from "./dashboard/pages/User";
import DashBlog from "./dashboard/pages/Blog";
import Privileges from "./dashboard/pages/Privileges";
import DashboardLayout from "./dashboard/layouts/dashboard";
import NotFound from "./dashboard/pages/Page404";
import Unauthorized from "./dashboard/pages/Unauthorized";
import { HelmetProvider } from "react-helmet-async";
import ServicePage from "./pages/ServicePage";
import ContactUsPage from "./pages/ContactUsPage";
import Categories from "./dashboard/pages/Categories";
import Tags from "./dashboard/pages/Tags";
import RequireAuth from "./dashboard/components/RequireAuth";

function App() {
  return (
    <div className="Pagecontainer">
      <HelmetProvider>
        <Routes>
          <Route exact path="/" element={<LandPage />} />
          <Route exact path="/contact-us" element={<ContactUsPage />} />

          <Route exact path="/post/:slug" element={<SinglePost />} />
          <Route
            exact
            path="/service/:servicetSlug"
            element={<ServicePage />}
          />
          <Route exact path="/blog" element={<Blog />} />

          <Route path="/login" element={<IndexDashboard />} />

          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route path="app" element={<DashboardApp />} />

            <Route element={<RequireAuth allowedRoles={[8]} />}>
              <Route path="user" element={<User />} />
            </Route>
            {/* <Route element={<RequireAuth allowedRoles={[13]} />}> */}
            <Route path="blog" element={<DashBlog />} />
            {/* </Route> */}
            <Route element={<RequireAuth allowedRoles={[3]} />}>
              <Route path="roles" element={<Privileges />} />
            </Route>
            {/* <Route element={<RequireAuth allowedRoles={[17]} />}> */}
            <Route path="categories" element={<Categories />} />
            {/* </Route> */}
            {/* <Route element={<RequireAuth allowedRoles={[9]} />}> */}
            <Route path="tags" element={<Tags />} />
            {/* </Route> */}
          </Route>

          {/* Catch All */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

export default App;
