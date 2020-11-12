import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Divider } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../redux/actions";
import { cartActions } from "../../redux/actions";

import { Container } from "react-bootstrap";
import { routeActions } from "../../redux/actions/route.actions"
import NavBarRo from "../../components/NavBars/NavBarRo"
import NavBarJoinUs from "../../components/NavBars/NavBarJoinUs"

const LoginPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let [formData, setFormData] = useState({});

    // handle form submission--------- 
    const [form] = Form.useForm();
    const onFinish = (values) => {
        setFormData(values);
        const { email, password } = values;
        dispatch(authActions.login(email, password));
    };
    const onReset = () => { // Reset cai form
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
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };
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
        dispatch(cartActions.getCart());
    }, [dispatch, history, redirectTo]);
    //end handle form submit-----

    return (
        <Container fluid className="no_padding">
            <NavBarRo />
            <NavBarJoinUs />
            <h1 className="login">Log in</h1>
            <Form form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item small
                    name="email"
                    label="Email"
                    rules={[{ required: true, },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, },]}
                >
                    <Input.Password
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />}// lam lai lai form
                    />
                </Form.Item>
                <div className="login">
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <p> or, <Link to="/register">Sign up</Link> if you haven't registered yet.</p>

                </div>
                <Divider dashed />

            </Form>
        </Container>
    );
};

export default LoginPage;
