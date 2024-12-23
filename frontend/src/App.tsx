import { Navbar } from './components/Navbar';
import { Policies } from './features/Policies';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './index.css';
import { PoliciesDetail } from './features/PoliciesDetail';

const App = () => (
  <div>
    <Router>
      <Navbar />
      <div className="w-full p-8">
        <Switch>
          <Route path="/detail/:id">
            <PoliciesDetail />
          </Route>
          <Route path="/">
            <Policies />
          </Route>
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
