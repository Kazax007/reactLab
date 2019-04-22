import React, { Component , Fragment} from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import 'normalize.css';
import './styles/index.scss';
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Me from "./pages/Me";
import Edit from "./pages/Edit";

class App extends Component {
    setUser = (user) => this.setState({user});
    render() {
        return (
            <Router>
                <Fragment>
                    <Route exact path="/" render={() => <Redirect to="/me"/>}/>
                    <Route
                        path="/login"
                        render={() => <Login setUser={this.setUser} {...this.state}/>}
                    />
                    <Route
                        path="/registration"
                        render={() => <Registration setUser={this.setUser} {...this.state}/>}
                    />
                    <Route
                        path="/me"
                        render={() => <Me setUser={this.setUser} {...this.state}/>}
                    />
                    <Route
                        path="/edit"
                        render={() => <Edit setUser={this.setUser} {...this.state}/>}
                    />
                </Fragment>
            </Router>
        )
    }
}


export default App;
