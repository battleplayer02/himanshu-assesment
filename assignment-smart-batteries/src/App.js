import './App.css';
import { RecoilRoot } from "recoil";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './compoments/SignIn';
import SignUp from './compoments/SignUp';
import Dashboard from './compoments/Dashboard';
import Dashboard2 from './compoments/Dashboard2';
import Dashboard3 from './compoments/Dashboard3';
import Dashboard4 from './compoments/Dashboard4';
import { createTheme } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[900],
    },
    secondary: {
      // This is green.A700 as hex.
      main: blue[900],
    },

  },
});
function App() {


  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Router>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/dashboard2">
              <Dashboard2 />
            </Route>
            <Route path="/dashboard3">
              <Dashboard3 />
            </Route>
            <Route path="/dashboard4">
              <Dashboard4 />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <SignUp />
            </Route>
          </Switch>
        </Router>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
