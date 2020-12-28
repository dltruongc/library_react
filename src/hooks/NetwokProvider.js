import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { css } from "@emotion/core";
import {RingLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export const NetworkContext = React.createContext({
  setLoading: () => {}, 
  handleShow: () => {}, 
  closeNotify: () => {},
  onRequest: (promise, onSuccess = (s) => {}, onError = (e) => {}) => {}
});

export default function NetworkProvider ({ children }) {
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  const showNotify = (error) => { setError(error)};
  const closeNotify = () => { setError(null)};
  
  const onRequest = (promise, onData = (s) => {}, onError = (e) => {}) => {
    setLoading(true);
    promise
      .then(res => {
        if (res.status === 204) {
          showNotify('Không có dữ liệu');
        }
        onData(res.data);
      })
      .catch(error => {
        showNotify(error.message);
        onError(error);
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

  return <NetworkContext.Provider value={{ setLoading, showNotify, closeNotify, onRequest }}>
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
      {children}
    </div>
  </NetworkContext.Provider>;
}
