import './App.css';
import Navbar from './Navbar/Navbar.js'
import Home from './HomePage/Home.js'
import Contact from './ContactPage/Contact.js'
import React, { useState, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './Authentication/AuthPage';
import UserProvider, { UserContext } from './context/UserContext';
import { NewRecipe } from './NewRecipe/NewRecipe';
import Logout from './context/Logout';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "./components/Snackbar/Snackbar.js";
import ProfilePage from './ProfilePage/ProfilePage';
import "./assets/css/style.css";
import RecipePage from './RecipePage/RecipePage';
import { EditRecipe } from './EditRecipe/EditRecipe';
import RecipeSuggestions from './RecipeSuggestions/RecipeSuggestions';

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );

}

const AppRouter = () => {
  const user = useContext(UserContext);

  const [notif, setNotif] = useState({ open: false, message: "", color: "info" });
  return (

    <BrowserRouter>

      <Route>

        <main>

          <Snackbar
            place="tr"
            color={notif.color}
            icon={AddAlert}
            message={notif.message}
            open={notif.open}
            closeNotification={() => setNotif({ open: false, message: "" })}
            close
          />

          {
            user != null ?
              (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/contact" >
                    <Contact setNotif={setNotif} />
                  </Route>

                  <Route path="/logout">
                    <Logout setNotif={setNotif} />
                  </Route>

                  <Route exact path="/profile/:uid" >
                    <ProfilePage setNotif={setNotif} />
                  </Route>

                  <Route exact path="/recipe/:id" >
                    <RecipePage setNotif={setNotif} />
                  </Route>

                  <Route exact path="/new">
                    <NewRecipe setNotif={setNotif} />
                  </Route>

                  <Route exact path="/edit/:id" >
                    <EditRecipe setNotif={setNotif} />
                  </Route>

                  <Route exact path="/recipes">
                    <RecipeSuggestions setNotif={setNotif} />
                  </Route>
                </Switch>
              )
              :
              (
                <Switch>
                  <Route exact path="/" component={Home} />

                  <Route path="/contact" >
                    <Contact setNotif={setNotif} />
                  </Route>

                  <Route exact path="/profile/:uid" >
                    <ProfilePage setNotif={setNotif} />
                  </Route>

                  <Route exact path="/recipe/:id" >
                    <RecipePage setNotif={setNotif} />
                  </Route>

                  <Route path="/auth" >
                    <Auth setNotif={setNotif} />
                  </Route>
                  
                  <Route exact path="/recipes">
                    <RecipeSuggestions setNotif={setNotif} />
                  </Route>
                </Switch>
              )

          }
        </main>
      </Route>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
