import { useContext, useState, useEffect } from "react";
import { NetworkContext } from "../hooks/NetworkProvider";
import { remote } from '../base/remote';
import { AuthContext } from "../hooks/AuthProvider";
import { Redirect } from "react-router-dom";

export default function Profile () {
  const {showNotify, onRequest} = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);

  const [user, setUser] = useState();

  useEffect(() => {
    console.log('call API!!');
    onRequest(remote.get('/me', {
      headers: { 'Authorization': 'Bearer ' + auth.token }
    }), (data) => {
      setUser(data);
    }, (error) => {
      // console.error(error);
      showNotify('Bạn chưa đăng nhập')
    });
  }, []);

  return (<>
    { auth.token ? JSON.stringify(user): <Redirect to='/login'/>}
  </>);
}