import { useContext, useState, useEffect } from 'react';
import { NetworkContext } from '../../hooks/NetworkProvider';
import { remote } from '../../base/remote';
import {Table} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const bookKeysMapping = {
  S_MA: "Mã sách",
  S_TIEUDE: "Tựa sách",
  COPIES: "Số lượng",
};

export default function BookCopyDashboard () {
  const { onRequest } = useContext(NetworkContext);
  // const { auth } = useContext(AuthContext);

  const [copies, setCopies] = useState([]);

  useEffect(() => {
    onRequest(
      remote.get('/books/count/all'), 
      (data) => setCopies(data), 
      (error) => { console.error('[DashboardItem.BookCopy]: ', error)}
    );
  }, []);

  const CopiesMapping = () => {
    return copies.map(x => {
      return <tr>
        {Object.entries(x).map((a) => {
          if (a[0] === 'S_MA') {
            return <Link to={'/books/details/'+a[1]}>{a[1]}</Link>
          }
          return <td>{a[1]}</td>
        })}
      </tr>
    });
  }
  
  return <Table striped bordered hover size="sm">
    <thead>
      <tr>
        { copies && copies.length > 0
          ? Object.keys(copies[0]).map(key => <th>{bookKeysMapping[key]}</th>)
          : null
        }
      </tr>
    </thead>
    <tbody>
      {copies ? <CopiesMapping /> : null}
    </tbody>
  </Table>
}
