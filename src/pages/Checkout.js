import { useContext, useState } from 'react';
import CartProvider, { CartContext } from '../hooks/CartProvider';
import { BASE_URL, remote } from '../base/remote';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';
import { Form, Button, InputGroup, Modal, Table } from 'react-bootstrap';
import { AiOutlineDeleteRow } from 'react-icons/ai';
import { NetworkContext } from '../hooks/NetworkProvider';
import { AuthContext } from '../hooks/AuthProvider';
import { Redirect } from 'react-router-dom';

export default function Checkout () {
  const cellImgStyle = {maxHeight: 120, display: 'inline-block'};
  const { items, decrease, itemCount, addItem, removeItem, increase,  clearCart, checkout } = useContext(CartContext);
  const { onRequest } = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(auth);

  const onBorrow = () => {
    handleClose();

    onRequest(remote.post('/cart/checkout', { book_ids: items.map(i => i.S_MA)}, {
      headers: { 
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'application/json'
      }
      }), (data) => {
      clearCart();
      <Redirect to='/books' />
    });
  };

  const MyModal = () => (
    <Modal
      show={show}
      onHide={onBorrow}
      backdrop="static"
      size='md'
      centered
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận mượn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Sau khi hoàn tất phiếu mượn hãy liên hệ với quản thư để hoàn tất thủ tục và nhận sách
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onBorrow}>Đồng ý</Button>
        <Button variant="outline-primary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return <>
    <MyModal />
    <MainNav />
    <section className="section">
      <Table responsive="lg" bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã loại</th>
            <th>NXB</th>
            <th>Chủ đề</th>
            <th>Tựa sách</th>
            <th>Tái bản</th>
            <th>Số trang</th>
            <th>Ảnh</th>
            <th>Số lượng</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => <tr key={item.S_MA}>
            <td>{ item.S_MA }</td>
            <td>{ item.LS_MA }</td>
            <td>{ item.NXB }</td>
            <td>{ item.CDS_TEN }</td>
            <td>{ item.S_TIEUDE }</td>
            <td>{ item.S_LANXUATBAN }</td>
            <td>{ item.S_SOTRANG }</td>
            <td><img style={cellImgStyle} src={BASE_URL + item.S_HINHANH } alt=''/></td>
            <td>
              <InputGroup sm="1">
                {/* <Button variant='outline-primary' onClick={() => decrease(item.S_MA)}>-</Button> */}
                <Form.Control className='col-md-3' disabled type='text' value={ item.quantity } />
                {/* <Button variant='outline-primary' onClick={() => increase(item.S_MA)}>+</Button> */}
              </InputGroup>
            </td>
            <td><Button variant='danger' onClick={() => removeItem(item.S_MA) }><AiOutlineDeleteRow style={{ fontSize: '150%', verticalAlign: 'middle' }}/> Xoá</Button></td>
          </tr>)}
        </tbody>
      </Table>
      <div className="row justify-content-end" >
        <div className="col">
          <h3>
          Tổng số sách: {itemCount}
          </h3>
        </div>
        <div className="col col-md-3">
          <Button variant='primary' block onClick={handleShow}>Mượn sách</Button></div>
        </div>
    </section>
    <Footer />
  </>;

}