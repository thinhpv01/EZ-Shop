// import './App.css';
import Footer from 'components/Footer';
import CartFeature2 from 'features/Cart2';
import CounterFeature2 from 'features/Counter2';
import ProductFeature from 'features/Product';
import ProductFeature2 from 'features/Productt';
import { Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import NotFound from './components/NotFound';
import AlbumFeature from './features/Album';
import CartFeature from './features/Cart';
import CounterFeature from './features/Counter';
import TodoFeature from './features/Todo';

function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Redirect from="/home" to="/" exact />
                <Redirect from="/post-list/:postId" to="/post/:postId" />
                <Route path="/" component={CounterFeature} exact />
                <Route path="/counter" component={CounterFeature2} />
                <Route path="/todos" component={TodoFeature} />
                <Route path="/albums" component={AlbumFeature} />
                <Route path="/products" component={ProductFeature} />
                <Route path="/productst" component={ProductFeature2} />
                <Route path="/cart" component={CartFeature} />
                <Route path="/cartt" component={CartFeature2} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </div>
    );
}

export default App;
