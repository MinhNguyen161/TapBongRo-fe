import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Divider, InputNumber, Row, Col, Select } from "antd";
import { routeActions } from "../../redux/actions/route.actions"
import NavBarRo from "../../components/NavBars/NavBarRo"
import NavBarJoinUs from "../../components/NavBars/NavBarJoinUs"
import { useSelector } from "react-redux";
import {
    EyeTwoTone,
    EyeInvisibleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { userActions } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
const { Option } = Select;
const RegisterPage = () => {


    const history = useHistory();
    const dispatch = useDispatch();
    let [avatarUrl, setAvatarUrl] = useState("");
    let [formData, setFormData] = useState({});

    // handle form submission---------
    const [form] = Form.useForm();
    // ANCHOR fix the ONfinish api call
    const onFinish = (values) => {
        setFormData(values);
        const { name, email, password, age, height, weight } = values;
        const reasons = values.reasons
        dispatch(
            userActions.register(name, email, password, age, height, weight, reasons)
        );
    };
    const onReset = () => {
        form.resetFields();
    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    //end handle form submit-----
    const redirectTo = useSelector((state) => state.route.redirectTo);
    useEffect(() => {
        if (redirectTo) {
            if (redirectTo === "__GO_BACK__") {
                history.goBack();
                dispatch(routeActions.removeRedirectTo());
            } else {
                history.push(redirectTo);
                dispatch(routeActions.removeRedirectTo());
            }
        }
    }, [dispatch, history, redirectTo]);


    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <h1 className="register">Sign up</h1>
            {/* // add {...layout} */}
            <Container>
                <Form form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Username"
                        rules={[{ required: true, },]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email' },]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Cant make this required */}
                    <Row>
                        <Col className="register_input">
                            <Form.Item
                                label="Age"
                                rules={[{ required: true, },]}
                            >
                                <Form.Item label="age" name="age" noStyle>
                                    <InputNumber min={1} max={100} />
                                </Form.Item>
                            </Form.Item>
                        </Col>
                        <span></span>
                        <Col className="register_input">
                            <Form.Item label="Height"
                                rules={[{ required: true, },]}
                            >
                                <Form.Item label="height" name="height" noStyle>
                                    <InputNumber min={1} max={1000} />
                                </Form.Item>
                                <span>&nbsp; cm</span>

                            </Form.Item>
                        </Col>
                        <span></span>

                        <Col className="register_input">
                            <Form.Item label="Weight">
                                <Form.Item label="weight" name="weight" noStyle>
                                    <InputNumber min={1} max={300} />
                                </Form.Item>

                                <span> &nbsp; kg</span>

                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, },]}
                    >
                        <Input.Password
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
                        />

                    </Form.Item>
                    <Form.Item
                        name="reasons"
                        label="Why are you here: "
                        rules={[
                            {
                                required: true,
                                message: 'Please indicate why you sign up!',
                                type: 'array',
                            },
                        ]}
                    >
                        <Select mode="multiple" placeholder="Please tell us where you are here!">
                            <Option value="Buy Merchandise">Buy Merchandise</Option>
                            <Option value="Read Blogs">Read Blogs</Option>
                            <Option value="Find 1-1 Training">Find 1-1 Training</Option>
                        </Select>
                    </Form.Item>

                    <div className="login">
                        <Button type="primary" htmlType="submit">
                            Sign up
                    </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset form
                    </Button>
                        <p>or, <Link to="/login">Log in</Link> if you have already registered.</p>
                    </div>
                    <Divider dashed />
                </Form>
            </Container>
        </Container>
    );
};

export default RegisterPage;
