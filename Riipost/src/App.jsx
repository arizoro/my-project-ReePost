import Body from "./components/content/Body";
import Navbar from './components/utils/Navbar';
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import Layout from "./pages/Layout";
import RequiredAuth from "./middleware/RequiredAuth";
import PostBox from "./components/utils/PostBox";
import DetailPost from './components/content/DetailPost';
import NotFound from "./NotFound";
import CreateProfile from "./pages/CreateProfile";
import AuthUser from "./middleware/AuthUser";


const App = () => {
  
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="daftar" element={<Daftar />} />

          <Route element={<RequiredAuth />}>
            <Route element={<AuthUser/>} >
              <Route  path="/" element={<Body/>}  />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<PostBox />} />
              <Route path="/posts/:id" element={<DetailPost />} />
            </Route>
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
