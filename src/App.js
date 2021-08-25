// import './App.css';
import ProductFeature from 'features/Product';
import { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';
import CartFeature from './features/Cart';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" exact/>
        <Redirect from="/post-list/:postId" to="/post/:postId" />
        <Route path="/" component={CounterFeature} exact/>
        <Route path="/todos" component={TodoFeature}/>
        <Route path="/albums" component={AlbumFeature}/>  
        <Route path="/products" component={ProductFeature}/>  
        <Route path="/cart" component={CartFeature}/> 
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
