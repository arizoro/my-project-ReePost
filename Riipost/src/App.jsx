import Body from "./Body";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import Layout from "./pages/Layout";
import RequiredAuth from "./middleware/RequiredAuth";
import useAuth from "./hooks/UseAuth";
import PostBox from "./PostBox";
import CreateProfile from "./CreateProfile";
import DetailPost from "./DetailPost";
import NotFound from "./NotFound";

const App = () => {
  const { token } = useAuth();

  return (
    <main>
      {token ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="daftar" element={<Daftar />} />

          <Route element={<RequiredAuth />}>
            <Route path="/" element={<Body />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<PostBox />} />
            <Route path="/posts/:id" element={<DetailPost />} />
            <Route path="/create" element={<CreateProfile />} />
          </Route>
          <Route path="/*" element={<NotFound/>}  />
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
