import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import logo from '../assets/icon.png';
import landing from '../assets/landing.png';
import { remote, setToken } from '../base/remote';
import { NetworkContext } from '../hooks/NetworkProvider';
import { AuthContext } from '../hooks/AuthProvider';


export default function Login () {

  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [validationError, setValidationsError] = useState({});
  const [responseError, setResponseError] = useState(null);
  const { showNotify, onRequest } = useContext(NetworkContext);
  const { auth, onAuth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onRequest(remote.post('/auth/signin', formValues, {
      headers: {'Content-Type': 'application/json'}
    }), (data) => {
      onAuth({
        name: data.fullName,
        token: data.token,
        avatar: data.avatar
      });
      
    }, (e) => {
      let errorObj = {};
      if (e.response.data.errors) {
        e.response.data.errors.forEach(error => {
          errorObj[error.param] = error.param + ' không hợp lệ';
        });
        setValidationsError(errorObj);
      } else {
        setValidationsError({});
      }
      if (e.response.data.message) {
        setResponseError(e.response.data.message);
      } else {
        setResponseError(null);
      }

    });
  }

  const handleChanges = (e) => {
    const newVal = { [e.target.name]: e.target.value };
    const obj = Object.assign({}, formValues, newVal);
    setFormValues(obj);
  }

  return <div>
    { auth.token ? <Redirect to='/me' />: null}
    <div className="row h-100vh">
      <div className="col col-md-8 h-100">
        <img className='h-100' src={landing} alt="ITLib"/>
        <div className="bottom-left p-4 custom-img-overlay">
          <h1>Đăng nhập</h1>
          <div>Tham gia cùng chúng tôi để trải nghiệm dịch vụ thư viện trực tuyến tốt nhất cho bạn</div>
        </div>
      </div>
      <div className="col col-md-4 bg-white d-flex pt-lg-2 flex-column justify-content-around align-items-center">
        <img className='mh-200 ' src={logo} alt="ITLib"/>
        <Form className='mt-2 w-100' onSubmit={handleSubmit}>
          <h2 className='text-center'>Đăng nhập</h2>
          {responseError ? <Alert variant='danger'>{responseError}</Alert>: null}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tên tài khoản</Form.Label>
            {validationError.username ? <Alert variant='danger'>{validationError.username}</Alert>: null}
            <Form.Control
              type="text" 
              name='username'
              placeholder="Tên đăng nhập" 
              value={formValues.username} 
              onChange={handleChanges}
            />
            
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Mật khẩu</Form.Label>
            {validationError.password ? <Alert variant='danger'>{validationError.password}</Alert>: null}
            <Form.Control
              type="password" 
              name='password'
              placeholder="Mật khẩu" 
              value={formValues.password} 
              onChange={handleChanges}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <div>
            Chưa có tài khoản?{' '}
            <Link to='../signup'>Tạo tài khoản mới</Link></div> 
          </Form.Group>
          <Button size="lg" block  variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  </div>;
}
