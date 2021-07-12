import './App.css';
import Navbar from './Navbar/Navbar.js'
import Home from './HomePage/Home.js'
import Contact from './ContactPage/Contact.js'
import AddPost from './Post/AddPost.js'
import Reac from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
            <Route path="/:recipe_id" component={AddPost} />
          </Switch>
        </main>
        <Navbar />
      </Route>
    </BrowserRouter>
  );

}

export default App;
