import { useContext, useState, useEffect } from 'react';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { remote } from '../../base/remote';
import {Table} from 'react-bootstrap';
import {AuthContext} from '../../hooks/AuthProvider';

const keysMapping = {
  CN_TEN: 'Tên',
  CN_SDT: 'SDT',
  CN_EMAIL: 'Email',
  CN_NAM: 'Nam',
  CN_DIACHI: 'Địa chỉ',
  CN_TENTAIKHOAN: 'Username',
  DG_MA: '#',
  CN_ANHDAIDIEN: 'Ảnh đại diện',
  TDG_MA: 'Thẻ độc giả'
};
export default function MemberDashboard () {
  const { onRequest } = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    onRequest(
      remote.get('/admin/member', {
        headers: {'Authorization': 'Bearer ' + auth.token}
      }), 
      (data) => {
        console.log(data);
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }, []);

  const ItemsMapping = () => {
    return items.map((item, idx) => {
      delete item.CN_MATKHAU;
      delete item.CN_SALT;
      return <tr key={idx}>
        {Object.entries(item).map(el => {
          if (el[0] !== 'CN_SALT' || el[0] !== 'CN_MATKHAU') 
            return <td>{el[1]}</td>;
        })}
      </tr>
    })
  };
  
  return <Table striped bordered hover size="sm">
    <thead>
      <tr>
        { items && items.length > 0
          ? Object.keys(items[0]).map(key => {
              delete items[0].CN_MATKHAU;
              delete items[0].CN_SALT;
            return <th>{keysMapping[key]}</th>})
          : null
        }
      </tr>
    </thead>
    <tbody>
      <ItemsMapping />
    </tbody>
  </Table>
}