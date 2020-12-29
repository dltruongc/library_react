import React, { useState, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/icon.png';
import landing from '../assets/landing.png';
import { NetworkContext } from '../hooks/NetworkProvider';

export default function Signup () {

  const {setLoading, handleShow, closeNotify, onRequest} = useContext(NetworkContext);

  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    address: '',
    username: '',
    password: '',
    avatar: ''
  });

  useEffect(() => {});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }



  return <div>
    <div className="row h-100vh">
      <div className="col col-md-8">
        <div className="">
          <img className='' src={landing} alt="ITLib"/>
        </div>
        <div className="bottom-left p-4 custom-img-overlay">
          <h1>Đăng ký tài khoản</h1>
          <div>Tham gia cùng chúng tôi để trải nghiệm dịch vụ thư viện trực tuyến tốt nhất cho bạn</div>
        </div>
      </div>
      <div className="col col-md-4 bg-white h-100 overflow-scroll">
        <div className="d-flex pt-lg-2 flex-column justify-content-around align-items-center">
          <img className='mh-200 ' src={logo} alt="ITLib"/>
          <Form className='mt-2 mb-4 w-100' onSubmit={handleSubmit}>
            <h2 className='text-center'>Tạo tài khoản mới</h2>
            <Form.Group controlId='formFullName'>
              <Form.Label>Họ tên</Form.Label>
              <Form.Control type="text" value={formValues.name} placeholder="Họ và tên" name='CN_TEN' />
            </Form.Group>
            <Form.Group controlId='formPhone'>
              <Form.Label>Điện thoại</Form.Label>
              <Form.Control type="text" value={formValues.phone} placeholder="Số điện thoại" name='CN_SDT' />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={formValues.email} placeholder="Email" name='CN_EMAIL' />
            </Form.Group>
            <Form.Group controlId='formBasicGender'>
              <Form.Check 
                type='checkbox'
                label='Giới tính nam'
                defaultChecked={true}
                name='gender'
                value={formValues.gender}
              />
            </Form.Group>
            <Form.Group controlId='formBasicAddress'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" value={formValues.address} placeholder="Địa chỉ" name='CN_DIACHI' />
            </Form.Group>
            <Form.Group controlId='formBasicUsername'>
              <Form.Label>Tên tài khoản</Form.Label>
              <Form.Control type="text" value={formValues.username} placeholder="Tên tài khoản" name='CN_TENTAIKHOAN' />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" value={formValues.password} placeholder="Mật khẩu" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.File 
                id="avatar"
                label="Chọn ảnh đại diện"
                data-browse="Chọn từ tệp"
                custom
                value={formValues.avatar}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <div>
              Đã có tài khoản?{' '}
              <Link to='../login'>Đăng nhập</Link></div> 
            </Form.Group>
            <Button size="lg" block  variant="primary" type="submit">
              Tạo ngay
            </Button>
          </Form>
        </div>
      </div>
    </div>
  </div>;
}