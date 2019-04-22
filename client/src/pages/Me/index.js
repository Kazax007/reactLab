import React, { Component , Fragment} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../requester";
import validateResponse from "../../utils/validateResponse";
import { Form, Container, Row, Col, Button, Table } from 'react-bootstrap';

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
        //alert(response);
        validateResponse(response);
        if (response.data.status == 401){
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

    edit = async (e) => {
        e.preventDefault();
        const {history} = this.props;
        history.push("/edit");
    };

    render(){
        const {user = {}} = this.props;
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <Table>
                            <thead>
                                <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Login</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>{user.first_name}</th>
                                    <th>{user.last_name}</th>
                                    <th>{user.login}</th>
                                </tr>
                            </tbody>
                        </Table>
                        <Button variant="info" type="submit" onClick={this.edit}>
                                    Редактировать
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Me);