import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Authentication/layout'
import Login from './Authentication/login'
import Signup from './Authentication/Signup'
import Layout_two from './Redirects/layout';
import PrivateRoute from './PrivateRoute/privateRoute';
import Dashboard from './Dashboard/dashboard';
import Friends from './Dashboard/friends';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<Layout/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/layout" element={<Layout_two/>} />
          <Route path="/" element={<PrivateRoute/>}>
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/friends" element={<Friends/>}/>
          </Route>
      </Routes>
    </>
  )
}

export default App
