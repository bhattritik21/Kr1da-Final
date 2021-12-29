import './App.css';
import Footer from './components/Footer/Footer';
import React, { useState ,createContext,useReducer} from 'react'
import NavBar from './components/NavBar/NavBar';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import News from './components/News/News'
import Live from './components/Live/Live'
import Profile from './components/Profile/Profile'
import Stats from './components/Stats/Stats'
import Alert  from './components/Alert';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import {reducer,initialState} from './reducers/userReducer'
import Settings from './components/Profile/Settings';
import Feed from './components/Feed/Feed';


const UserContext = createContext()

const App = ()=> {
  const [state,dispatch]=useReducer(reducer,initialState)
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
 
  
    return (
      
      <>
      <UserContext.Provider value={{state,dispatch}}>
        <Router>
        <NavBar/>
        <Alert alert={alert} />
        <Switch>
          <Route exact path="/"><Home/></Route> 
          <Route exact path="/contact"><Contact showAlert={showAlert}/></Route> 
          <Route exact path="/profile"><Profile/></Route> 
          <Route exact path="/news"><News/></Route> 
          <Route exact path="/live"><Live/></Route> 
          <Route exact path="/stats"><Stats/></Route> 
          <Route exact path="/settings"><Settings/></Route> 
          <Route exact path="/feed"><Feed/></Route> 
          <Route exact path="/login"><Login showAlert={showAlert}/></Route> 
          <Route exact path="/signup"><SignUp showAlert={showAlert}/></Route> 
        </Switch>
        <Footer/>
        </Router>
        </UserContext.Provider>
      </>
    )
 
}

export default App;
export {UserContext}