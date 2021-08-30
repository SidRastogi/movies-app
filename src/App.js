import Movies from './containers/Movies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/:genre'>
          <Movies />
        </Route>
        <Route path='/'>
          <Movies />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
