import { useContext, useState, useEffect } from "react";
import { NetworkContext } from "../hooks/NetworkProvider";
import { remote } from '../base/remote';
import { AuthContext } from "../hooks/AuthProvider";
import { Redirect } from "react-router-dom";
import {Col, Container, Row, Spinner} from 'react-bootstrap';
import {BASE_URL} from "../base/remote";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";

const GENDER = ['Female', 'Male'];

export default function Profile () {
  const {showNotify, onRequest} = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);

  const [user, setUser] = useState();
  console.log(user);
  useEffect(() => {
    console.log('call API!!');
    onRequest(remote.get('/me', {
      headers: { 'Authorization': 'Bearer ' + auth.token }
    }), (data) => {
      setUser(data);
      console.log(user);
    }, (error) => {
      // console.error(error);
      showNotify('Bạn chưa đăng nhập')
    });
  }, []);
  if(!auth.token) {
    return (<Redirect to='/login'/>);
  }
  if(!user){
    return (<Spinner animation="border" />)
  }
  return (<>
    <MainNav />
    <Container className="pt-lg-5 pb-lg-5 profile">
      <Row>
        <Col lg={4}>
          <div className="avatar-profile" style={{backgroundImage: `url('${BASE_URL}${user.CN_ANHDAIDIEN}')`}}/>
        </Col>
        <Col lg={8}>
          <div className="info-profile">
            <h3 style={{color: '#0062cc', marginBottom: 30}}>{user.CN_TEN} <span style={{fontSize: 14, color: '#333'}}>({user.CN_TENTAIKHOAN})</span></h3>
            <h5 style={{color: '#495057'}}>
              About:
            </h5>
            <ul className="list-profile">
              <li>

                UserId: <span>{user.CN_MA}</span>
              </li>
              <li>
                Email: <span><a href={`mailto: ${user.CN_EMAIL}`}>{user.CN_EMAIL}</a></span>
              </li>
              <li>
                Username: <span>{user.CN_TENTAIKHOAN}</span>
              </li>
              <li>
                Phone: <span><a href={`tel:${user.CN_SDT}`}>{user.CN_SDT}</a></span>
              </li>
              <li>
                Gender: <span>{GENDER[user.CN_NAM]}</span>
              </li>
              <li>
                Address: <span>{user.CN_DIACHI}</span>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>

    <Footer />
    </>);
}
