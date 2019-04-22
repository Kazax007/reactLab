import React, { Component , Fragment} from 'react';
import { Redirect, Link, NavLink, withRouter} from "react-router-dom";
// import './main.scss';
import Input from "../../components/Input";
import api from "../../requester";
import validateResponse from "../../utils/validateResponse";

class Login extends Component {
    state = {
        login: "",
        password: ""
    };
    componentDidMount(){
        this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        const {history} = this.props;
        var response;
        try{
            response = await api.get('/users/me');
        }
        catch (err){
            alert(err);
        }
        //alert(response);
        validateResponse(response);
        if (response.data.status == 401){
            //history.push("/login");
            return;
        }
        else{
            //setUser(response.data.user);
            history.push("/me");
        }
    };

    handleFieldChange = ({name,value}) => this.setState({[name] : value});
    login = async (e) => {
        e.preventDefault();
        const {setUser, history} = this.props;
        const response = await api.post('/users/login', {login: this.state.login, password: this.state.password});
        validateResponse(response);
        console.log(response);
        setUser(response.data.user);
        history.push("/me");
        //Запросы к серверу делаются таким образом
        //const response = await api.post('/users/login', {login: login, password: password});

        //Функция setUser установит пользователя полученного в состояние App

        // Редирект выполяется вызовом history.push("/me");

        //Функция validateResponse проверит ответ и выдаст alert в случае ошибки
    };
    render() {
        return (
            <div className="login-page">
                <form onSubmit={this.login}>
                    <h1>Логин</h1>
                    <Input
                        onChange={this.handleFieldChange}
                        name = "login"
                        placeholder="Логин"
                        value={this.state.login}
                    />
                    <Input
                        onChange={this.handleFieldChange}
                        name = "password"
                        placeholder="Пароль"
                        type = "password"
                        value={this.state.password}
                    />
                    <button>Войти</button>
                </form>
            </div>
        )
    }
}
// function getCookie(name) {
//     var matches = document.cookie.match(new RegExp(
//       "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//     ));
//     return matches ? decodeURIComponent(matches[1]) : undefined;
// }

export default withRouter(Login);
