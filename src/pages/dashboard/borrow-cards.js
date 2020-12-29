import React, { useContext, useState, useEffect } from 'react';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { remote } from '../../base/remote';
import { Table, Form, InputGroup, Button } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

const bookKeysMapping = {
  "PM_STT": '#',
  "TDG_MA": 'Độc giả',
  "PM_NGAYMUON": 'Ngày y.c mượn',
  "DS_MA": 'Đầu sách',
  "CN_MA": 'Quản thư',
  "DXN_MA": 'Mã xác nhận',
  "CTM_NGAYMUON": 'Ngày cho mượn',
  "CTM_NGAYTRA": 'Hạn trả'
};

export default function BorrowCardDashboard() {
  const { onRequest } = useContext(NetworkContext);
  // const { auth } = useContext(AuthContext);
  const filterInputRef = React.createRef();
  const [items, setItems] = useState([]);

  useEffect(() => {
    onRequest(
      remote.get('/member-cards/details'), 
      (data) => {
        console.log(data);
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }, []);

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

  const ItemsMapping = () => {
    return items.map((item, idx) => {
      // if (items[idx + 1] && items[idx].PM_STT === items[idx+1].PM_STT)  {
      //   return Object.entries(item).map(el => {
      //     return <td>{el[1]}</td>;
      //   });
      // }
      return <tr key={idx}>
        {Object.values(item).map(el => {
          return <td>{el}</td>;
        })}
      </tr>
    })
  };

  return <>
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
      <tr>
        { items && items.length > 0
          ? Object.keys(items[0]).map(key => {
            return <th>{bookKeysMapping[key]}</th>;
          })
          : null
        }
      </tr>
    </thead>
    <tbody>
      <ItemsMapping />
    </tbody>
  </Table>
  </>
}
