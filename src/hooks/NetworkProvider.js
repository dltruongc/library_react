import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { css } from "@emotion/core";
import { RingLoader } from "react-spinners";
import { Redirect } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import axios from 'axios';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const NetworkContext = React.createContext({
  setLoading: () => {}, 
  handleShow: () => {}, 
  closeNotify: () => {},
  onRequest: (promise, onSuccess = (s) => {}, onError = (e) => {}) => {},
  onMultiRequests: (promises, onSuccess = (s) => {}, onError = (e) => {}) => {}
});

export default function NetworkProvider ({ children }) {
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const [expired, setExpired]   = useState(false);
  const { logout }              = useContext(AuthContext);

  const showNotify = (error) => { setError(error)};
  const closeNotify = () => { setError(null)};

  const onRequest = (promise, onData = (s) => {}, onError = (e) => {}) => {
    setLoading(true);
    promise
      .then(res => {
        if (res.status === 204) {
          showNotify('Không có dữ liệu');
        }
        console.log(res);
        onData(res.data);
      })
      .catch(error => {
        if (error?.response) {
          if (error?.response.data.expiredAt) {
            showNotify('Phiên đăng nhập đã hết hạn');
            logout();
          }
          if(error.response.data.message) {
            showNotify(error.response.data.message);
          }
          onError(error);
        }
      })
      .finally(() => {setLoading(false)});
  };
  
  const onMultiRequests = (promises, onData = (s) => {}, onErrors = (e) => {}) => {
    let errorsMsg = [];
    setLoading(true);
    promises
      .then(axios.spread((...responses) => {
        onData(responses.map(res => res.data));
      }))
      .catch(errors => {
        if (errors && errors.length) {
          errors.forEach(error => {
            if(error.response.data.message) {
              errorsMsg.push(error.response.data.message);
            }
          })
          showNotify(errorsMsg.response.data.message);
        }
        onErrors(errors);
      })
      .finally(() => {setLoading(false)});
  };
  
  function showModal() {
    let show = error != null;

    if (show) {
      return <div>
        <Modal
          show={show}
          onHide={closeNotify}
          backdrop="static"
          keyboard={true}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={closeNotify}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    }
  }

  return <NetworkContext.Provider value={{ setLoading, showNotify, closeNotify, onRequest, onMultiRequests }}>
    <div>
      { loading 
        ? <div className="loader">
            <RingLoader 
              css={override}
              size={120}
              color={"#123abc"}
              loading={loading}
            />
          </div> 
        : null
      }
      {showModal()}
      { expired ? <Redirect to='/login' /> : null }
      {children}
    </div>
  </NetworkContext.Provider>;
}
