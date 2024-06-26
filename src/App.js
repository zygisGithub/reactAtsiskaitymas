import './App.css';
import useStore from "./store/store";
import {Route} from "react-router-dom";
import {Routes} from "react-router-dom";
import {BrowserRouter} from "react-router-dom";
import Toolbar from "./components/toolbar";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import YourPosts from "./pages/yourPosts";
import Favorites from "./pages/favorites";
import SinglePost from "./pages/singlePost";
import UserPosts from "./pages/userPosts";
function App() {


  return (
    <div className="App">
        <BrowserRouter>

            <Toolbar/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route path='/yourposts' element={<YourPosts/>}/>
                <Route path='/singlepost/:username/:id' element={<SinglePost/>}/>
                <Route path='/userposts/:username' element={<UserPosts/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
