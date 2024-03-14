import React from "react";
import Body from "./components/content/Body";
import Navbar from "./components/utils/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import Layout from "./pages/Layout";
import RequiredAuth from "./middleware/RequiredAuth";
import DetailPost from "./components/content/DetailPost";
import NotFound from "./NotFound";
import CreateProfile from "./pages/CreateProfile";
import UpdatePost from "./pages/UpdatePost";
import Loading from "./components/utils/Loading";
import { Suspense } from "react";
import { lazy } from "react";

const DetailLazy = lazy(() => import("./components/content/DetailPost"));

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="daftar" element={<Daftar />} />

          <Route element={<RequiredAuth />}>
            <Route path="/" element={<Body />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/update/:id" element={<UpdatePost />} />
            <Route
              path="/posts/:id"
              element={
                <Suspense fallback={<Loading />}>
                  <DetailLazy />
                </Suspense>
              }
            />
            <Route path="/create" element={<CreateProfile />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;

{
  /* <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/login" element={ <Login onUser={handleUser} /> } />
          <Route path="/" element={ <Body/> } />
          <Route path="/profile" element={ <Profile/> } />
          <Route path="/daftar" element={ <Daftar/> } />
      </Routes>
    </BrowserRouter> */
}
