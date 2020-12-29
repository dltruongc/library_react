import React, { useContext, useState, useEffect } from 'react';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { remote } from '../../base/remote';
import { Table, Form, InputGroup, Button, Modal } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { AuthContext } from '../../hooks/AuthProvider';

export default function BorrowCardDashboard() {
  const { onRequest } = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);
  const filterInputRef = React.createRef();
  const [items, setItems] = useState([]);
  const [confirm, setConfirm] = useState({ DS_MA: null, PM_STT: null });

  useEffect(() => {
    onRequest(
      remote.get('/member-cards/details'), 
      (data) => {
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }, []);

  const questData = () => {
    onRequest(
      remote.get('/member-cards/details'), 
      (data) => {
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }

  const filterById = () => {
    const value = filterInputRef.current.value ;
    onRequest(
      remote.get('/member-cards/details/' + value), 
      (data) => {
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }

  const MyModal = ({ DS_MA, PM_STT }) => (
    <Modal
      show={confirm.PM_STT !== null && confirm.DS_MA !== null}
      backdrop="static"
      size='md'
      centered
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Xác nhận cho mượn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn thực hiện hành động này không?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onConfirmBorrow(confirm)}>Chấp nhận</Button>
        <Button variant="outline-primary" onClick={() => setConfirm({ DS_MA: null, PM_STT: null })}>
          Huỷ
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const onConfirmBorrow = ({ DS_MA, PM_STT }) => {
    let sendObj = {borrow_card_id: confirm.PM_STT, copy_book_id: confirm.DS_MA};
    onRequest(
      remote.post('/admin/staff/confirmation', sendObj , {
        headers: { 
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        }
      }), 
      (data) => {
        questData();
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );

    setConfirm({ DS_MA: null, PM_STT: null });
  }

  const ItemsMapping = () => {
    return items.map((item, idx) => {
      // if (items[idx + 1] && items[idx].PM_STT === items[idx+1].PM_STT)  {
      //   return Object.entries(item).map(el => {
      //     return <td>{el[1]}</td>;
      //   });
      // }				
      return <tr key={idx}>
        <td>{item.PM_STT}</td>
        <td>{item.TDG_MA}</td>
        <td>{item.DS_MA}</td>
        <td>{item.CN_MA}</td>
        <td>{item.DXN_MA}</td>
        <td>{item.CTM_NGAYMUON}</td>
        <td>{item.CTM_NGAYTRA}</td>
        <td>
          <Button variant='info' block onClick={() => setConfirm({ DS_MA: item.DS_MA, PM_STT: item.PM_STT })}>Cho mượn</Button>
        </td>
      </tr>
    })
  };

  return <>
  <MyModal />
  <div className=" my-2 row justify-content-end">
    <div className="col col-md-3">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control 
        type="text" 
        name='cardId'
        placeholder="..." 
        defaultValue=''
        ref={filterInputRef}
        />
      </InputGroup>
    </div>
    <div className="col col-sm-1">
      <Button block variant="primary" onClick={filterById}>
        <AiOutlineSearch />
        </Button>
    </div>
  </div>
  <Table striped bordered hover size="sm">
    <thead>
        { items && items.length > 0
          ?
          <tr>
            <th>#</th>
            <th>Độc giả</th>
            <th>Đầu sách</th>
            <th>Quản thư</th>
            <th>Mã xác nhận</th>
            <th>Ngày cho mượn</th>
            <th>Ngày trả</th>
            <th>Hành động</th>
          </tr>
          :null
        }
    </thead>
    <tbody>
      <ItemsMapping />
    </tbody>
  </Table>
  </>
}
