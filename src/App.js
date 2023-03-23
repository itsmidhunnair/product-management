import {BrowserRouter as Router} from 'react-router-dom'
import RouterComp from './component/RouterComp';
import Navbar from './component/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <RouterComp/>
      </div>
    </Router>
  );
}

export default App;
