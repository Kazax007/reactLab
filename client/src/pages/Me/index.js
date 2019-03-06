import React, { Component , Fragment} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../requester";
import validateResponse from "../../utils/validateResponse";

class Me extends Component {
    componentDidMount() {
        this.fetchUserProfile();
    }

    fetchUserProfile = async () => {
        const {setUser, history} = this.props;
        var response;
        try{
            response = await api.get('/users/me');
        }
        catch (err){
            alert(err);
        }
        alert(response);
        validateResponse(response);
        if (response.code == 401){
            history.push("/login");
        }
        else{
            setUser(response.data.user);
        }
        // вызова метода GET /users/me
        // в случае успешной обработки вызвать setUser
        // в случае получения Http status 401 перенаправить  пользователя на login
        // использовать await + try/catch или .then((response, err) => {})
    };

    render(){
        const {user = {}} = this.props;
        return (
            <div className="me">
                <div className="me__profile">
                    <p>Ваше имя: {user.first_name} {user.last_name}</p>
                    <p>Ваш логин: {user.login}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(Me);