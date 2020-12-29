import {useState, useContext, useEffect } from 'react';
import { remote } from '../../base/remote';
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

  if (books[0].length === 0 && books[1].length === 0) {
    return <div>
      <h5>Sách được mượn nhiều nhất: Chưa có dữ liệu</h5>
      <h5>Sách được yêu cầu nhưng không thẻ cho mượn: Chưa có dữ liệu</h5>
    </div>;
  } else {
    return <div>
    <div>
      <h3>wSách được mượn nhiều nhất: </h3>
      <Table>
        <thead>
          <tr>
            {Object.keys(books[0]).map(k => <th>{keyMapping[k]}</th>)}
          </tr>
        </thead>
        <tbody>
          {books[0].length ? books[0].map(book => {
            return <tr>
              {Object.entries(book).map(el => el[1])}
            </tr>
          }): null }
        </tbody>
      </Table>
    </div>
  </div>;
  }
}
