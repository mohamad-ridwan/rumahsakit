import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Article from './pages/article/Article';
import BlogArticle from './pages/blogarticle/BlogArticle';
import { useEffect } from 'react';
import WrappContextProvider from './services/context/WrappContext';

function App() {

  return (
    <div className="App">

      <WrappContextProvider>
        <BrowserRouter>
          <Navbar />

          <Switch>
            <Route path='/articles/read/:id'>
              <BlogArticle />
            </Route>

            <Route path='/articles'>
              <Article />
            </Route>

            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </WrappContextProvider>
    </div>
  );
}

export default App;
