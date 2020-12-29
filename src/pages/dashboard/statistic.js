import {useState, useContext, useEffect } from 'react';
import { remote, BASE_URL } from '../../base/remote';
import { Table } from "react-bootstrap";
import axios from 'axios';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { AuthContext } from '../../hooks/AuthProvider';

const keyMapping = {
  SL: "Số lượng",
  S_MA: "Mã sách",
  S_TIEUDE: "Tiêu đề",
  S_HINHANH: "Ảnh minh hoạ",	
}

export default function StatisticDashboard () {
  // return <h1>Comming soon...</h1>;

  const [books, setBooks] = useState([[{}] , [{}]]);
  const { onRequest,onMultiRequests } = useContext(NetworkContext);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    const config = {
      headers: {'Authorization': `Bearer ${auth.token}`}
    }
    // get borrowed books
    let remoteGet = remote.get('/admin/statistic/borrowed', config);
    // get not borrowed books
    let remoteGet2 = remote.get('/admin/statistic/not-borrowed', config);
    onMultiRequests(
      axios.all([remoteGet, remoteGet2]),
      data => {
        setBooks(data);
      },
      error => {
        console.error(error);
      }
    );
  }, []);

  const cellImgStyle = { maxHeight: 120, display: 'inline-block' };

  const RenderTable = ({ items, title}) => {
    console.log({items, title})
    return <div>
      <h3>{title}: </h3>
      <Table>
        <thead>
          <tr>
            {Object.keys(items[0]).map(k => <th>{keyMapping[k]}</th>)}
          </tr>
        </thead>
        <tbody>
          {items.length ? items.map(item => {
            return <tr>
              {Object.entries(item).map(el => {
                if (el[0] === 'S_HINHANH') {
                  return <td><img style={cellImgStyle} src={BASE_URL + el[1] } alt=''/></td>
                }
                return <td>{el[1]}</td>
              })}
            </tr>
          }): null }
        </tbody>
      </Table>
    </div>
  }

  return <div>
    { books[0].length !== 0 
      ? <RenderTable items={books[0]} title='Sách được mượn nhiều nhất'/>
      : <h3>Sách được mượn nhiều nhất: Chưa có dữ liệu</h3>}
    { books[1].length !== 0 
      ? <RenderTable items={books[1]} title='Sách được yêu cầu nhưng không thể cho mượn'/>
      : <h3>Sách được yêu cầu nhưng không thể cho mượn: Chưa có dữ liệu</h3> }
  </div>;
}
