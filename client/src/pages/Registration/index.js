import React, { Component , Fragment} from 'react';
import { Redirect, Link, NavLink} from "react-router-dom";
// import './main.scss';
import Input from "../../components/Input";
import api from "../../requester";
import validateResponse from "../../utils/validateResponse";
import {withRouter} from "react-router-dom";
import { Form, Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class Registration extends Component {
    state = {
        login: "",
        password: "",
        first_name: "",
        last_name: ""
    };
    handleFieldChange = ({name,value}) => this.setState({[name] : value});
    registration = async (e) => {
        e.preventDefault();
        const {setUser,history} = this.props;

        const response = await api.post('/users', {login: this.state.login, password: this.state.password, first_name: this.state.first_name, last_name: this.state.last_name});
        validateResponse(response);
        console.log(response);
        setUser(response.data.user);
        history.push("/me");
        //Запросы к серверу делаются таким образом

        //const response = await api.post('/users', {login: state.login, password: state.password});

        //Функция setUser установит пользователя полученного в состояние App

        // Редирект выполяется вызовом history.push("/me");

        //Функция validateResponse проверит ответ и выдаст alert в случае ошибки
    };
    render() {
        return (
            <div className="registration-page">
                        <h2>Регистрация</h2>
                        <form onSubmit={this.registration}>
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Input
                                onChange={this.handleFieldChange}
                                name = "first_name"
                                placeholder="Name"
                                value={this.state.first_name}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Input
                                onChange={this.handleFieldChange}
                                name = "last_name"
                                placeholder="Last Name"
                                value={this.state.last_name}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicLogin">
                                <Form.Label>Login</Form.Label>
                                <Input
                                onChange={this.handleFieldChange}
                                name = "login"
                                placeholder="Login"
                                value={this.state.login}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Input
                                onChange={this.handleFieldChange}
                                name = "password"
                                placeholder="Пароль"
                                type = "password"
                                value={this.state.password}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
            </div>
        )
    }
    // render() {
    //     return (
    //         <div className="registration-page">
    //             <h2>Регистрация</h2>
    //             <form onSubmit={this.registration}>
    //                 <Input
    //                     onChange={this.handleFieldChange}
    //                     name = "first_name"
    //                     placeholder="Имя"
    //                     value={this.state.first_name}
    //                 />
    //                 <Input
    //                     onChange={this.handleFieldChange}
    //                     name = "last_name"
    //                     placeholder="Фамилия"
    //                     value={this.state.last_name}
    //                 />
    //                 <Input
    //                     onChange={this.handleFieldChange}
    //                     name = "login"
    //                     placeholder="Логин"
    //                     value={this.state.login}
    //                 />
    //                 <Input
    //                     onChange={this.handleFieldChange}
    //                     name = "password"
    //                     placeholder="Пароль"
    //                     type = "password"
    //                     value={this.state.password}
    //                 />
    //                 <button>Регистрация</button>
    //             </form>
    //         </div>
    //     )
    // }
}


export default withRouter(Registration);
