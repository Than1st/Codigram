import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Sidebar} from "./components/Sidebar";
import {Posts} from "./components/Posts";
import {DetailPosts} from "./components/DetailPosts";
import {PostPosts} from "./components/PostPosts";
import {ContactUs} from "./components/ContactUs";
import {Login} from "./components/Login";
import {Register} from "./components/Register";
import {Profile} from "./components/Profile";
import {About} from "./components/About";
import {SearchPosts} from "./components/SearchPosts";
import {EditPosts} from "./components/EditPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidebar />}>
            <Route index element={<Posts />}/>
            <Route path='/posts/:id' element={<DetailPosts />}/>
            <Route path='/post' element={<PostPosts />}/>
            <Route path='/edit/:id' element={<EditPosts />}/>
            <Route path='/search' element={<SearchPosts />}/>
            <Route path='/contact-us' element={<ContactUs />}/>
            <Route path='/about/:id' element={<About />}/>
            <Route path='/profile' element={<Profile />}/>
        </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
