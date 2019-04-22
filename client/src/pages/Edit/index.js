import React, { Component , Fragment} from 'react';
import {withRouter} from "react-router-dom";
import api from "../../requester";
import validateResponse from "../../utils/validateResponse";
import Input from "../../components/Input";
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

class Edit extends Component{

    state = {
        login: this.props.login,
        first_name: this.props.first_name,
        last_name: this.props.last_name,
    }
    handleFieldChange = ({ name, value }) => this.setState({ [name]: value });
    editUser = async (e) => {
       e.preventDefault();
       const { setUser } = this.props;
       // Отправить запрос на редактирование полей
       // const response = await api.post('/users/me', this.state);
   }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="edit-page">
                            <h2>Профиль</h2>
                            <form onSubmit={this.editUser}>
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
                                <Button variant="primary" type="submit">
                                    Сохранить
                                </Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default withRouter(Edit);