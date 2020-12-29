import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import React, {useContext, useEffect, useState} from "react";
import {BASE_URL, remote} from "../base/remote";
import {Link} from "react-router-dom";
import { Form, Button, InputGroup } from 'react-bootstrap';
import {AiOutlineSearch} from 'react-icons/ai';
import { NetworkContext } from "../hooks/NetworkProvider";

export default function Category () {
  
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);


  const { showNotify, onRequest } = useContext(NetworkContext);

  useEffect(() => {
    const getBooks = remote.get('/books');
    onRequest(getBooks, onData, onError);
  }, []);


  useEffect(() => {
    const getCategories = remote.get('/categories');
    onRequest(getCategories, (categories) => {setCategories(categories.map(c => c.CDS_TEN))}, onError);
  }, []);

  const filterBooksByCategory = (e) => {
    console.log('he lo')
    e.preventDefault();

    const getBooks = remote.get('/books?category=' + e.target.value);
    onRequest(getBooks, (data) => {
      setBooks(data);
    }, onError);
  }

  const onData = (data) => {
    if (data.length === 0) {
      showNotify('Không có kết quả phù hợp');
    } else setBooks(data);
  }

  const onError = (error) => {
    console.error(error);
  }


  const Cards = books.map((item) => (
    <div key={item.S_MA} className='col-3 mt-3 pb-2'>
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
            <Button variant='primary'>Borrow</Button>
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

  const NoBook = () => <div>Không tìm thấy sách</div>;

  return (<div>
      <header >
        <MainNav/>
      </header>
      <section className='section trending-section mt-4'>
        <div className='wrapper w-1140'>
          <div className='row'>
            <div className='col'>
              <div className="section-title">Tìm theo chủ đề</div>
            </div>
              <div className="col">
                <Form.Group controlId="formGridState">
                  <Form.Control as="select" defaultValue="Chọn..." name='categoryInput' onChange={filterBooksByCategory}>
                    <option selected disabled={true}>Chọn chủ đề</option>
                    {categories?.map(c => <option value={c}>{c}</option>)}
                  </Form.Control>
                </Form.Group>
              </div>
          </div>
          <div className='row mt-4'>{Cards}</div>
        </div>
      </section>
    <Footer/>
  </div>);
}