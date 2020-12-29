import { useContext, useState, useEffect } from 'react';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { remote } from '../../base/remote';
import {Table} from 'react-bootstrap';

const bookKeysMapping = {
  S_MA: "#",
  LS_MA: "Mã loại",
  NXB: "NXB",
  CDS_TEN: "Chủ đề",
  S_TIEUDE: "Tựa sách",
  S_LANXUATBAN: "Tái bản",
  S_SOTRANG: "Số trang",
  S_TUKHOA: "Từ khoá",
  S_MOTA: "Mô tả"
};

export default function BookDashboard () {
  const { onRequest } = useContext(NetworkContext);
  // const { auth } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    onRequest(
      remote.get('/books'), 
      (data) => {
        console.log(data);
        setItems(data);
      }, 
      (error) => { console.error('[DashboardItem.get]: ', error)}
    );
  }, []);

  const ItemsMapping = () => {
    return items.map((item, idx) => {
      return <tr key={idx}>
        {Object.entries(item).map(el => {
          if (el[0] !== 'S_HINHANH') return <td>{el[1]}</td>;
        })}
      </tr>
    })
  };
  
  return <Table striped bordered hover size="sm">
    <thead>
      <tr>
        { items && items.length > 0
          ? Object.keys(items[0]).map(key => <th>{bookKeysMapping[key]}</th>)
          : null
        }
      </tr>
    </thead>
    <tbody>
      <ItemsMapping />
    </tbody>
  </Table>
}
