import Landing from './Landing';
import Footer from '../components/Footer';
import {useContext, useEffect, useState} from "react";
import { remote, BASE_URL } from '../base/remote';
import { Link  } from "react-router-dom";
import { Button, Alert } from 'react-bootstrap';
import { NetworkContext } from '../hooks/NetworkProvider';
import { CartContext } from '../hooks/CartProvider';

export default function Home() {
  const { showNotify, setLoading } = useContext(NetworkContext);
  const { addItem } = useContext(CartContext);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);


  let getBooks = () => {
    remote.get('/books')
    .then(response => {
      setBooks(response.data);
    }).catch((error) => {
      showNotify('Kết nối thất bại');
    }).finally(() => { setLoading(false); });
  }

  const Cards = books.map((item) => (
    <div key={item.S_MA} className='col-lg-3 col-md-4 col-sm-6 mt-3 pb-2'>
      <div className='card'>
        <div className='card-image'>
          <img src={BASE_URL +item?.S_HINHANH} alt={item?.S_TIEUDE} />
        </div>
        <div className='card-body'>
          <div className='card-title'>
            {item?.S_TIEUDE}
          </div>
          {item.description}
          <div className='card-buttons'>
            <Button variant='primary' onClick={() => addItem(item)}>Add</Button>
            <Link to={`/books/${item.S_MA}`}>
              <Button variant='outline-primary'>
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ));

  const membersData = [
    {
      id: 1,
      name: 'Đỗ Lam Trường',
      age: 21,
      avatar: 'https://i.pravatar.cc',
    },
    {
      id: 2,
      name: 'Nguyễn Ngọc Lam Tường',
      age: 21,
      avatar: 'https://i.pravatar.cc',
    },
    {
      id: 3,
      name: 'Lê Thị Chí Thiện',
      age: 21,
      avatar: 'https://i.pravatar.cc',
    },
  ];

  const Members = membersData.map((mem, id) => (
      <div className="col col-4">
        <div className='circle-avatar' key={id}>

        <div
          className='avatar'
          style={{ background: 'url(' + mem.avatar + ')' }}
        ></div>
        <div className='avatar-name'>{mem.name}</div>
      </div>
    </div>
  ));

  return (
    <div>
      <Landing />
      <section className='section trending-section mt-4'>
        <div className='wrapper w-1140'>
          <div className='row'>
              <div className='col'>
                <div className="section-title">
                  Trending books
                </div>
              </div>
          </div>
          <div className='row mt-4'>
            {Cards}
          </div>
        </div>
      </section>

      <section className='section author-section mt-4'>
        <div className='wrapper w-1140'>
          <div className='row'>
            <div className='col'>
              <div className="section-title">
                Top members
              </div>
            </div>
          </div>
          <div className='row mt-4'>
            {Members}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
