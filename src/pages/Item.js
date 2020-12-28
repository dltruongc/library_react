import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import React, {useContext, useEffect, useState} from "react";
import {BASE_URL, remote} from "../base/remote";
import {Link} from "react-router-dom";
import { Button } from 'react-bootstrap';
import { NetworkContext } from "../hooks/NetwokProvider";

export default function Item ({ match }) {

  const [book, setBook] = useState();
  const { setLoading, handleShow, onRequest } = useContext(NetworkContext);

  useEffect(() => {
    setLoading(true);
    
    onRequest(remote.get('/books/details/' + match.params.id),
    (data) => {
      setBook(data);
    });
  }, []);

  const LeftItem = () => <div key={book.S_MA} className='col-4'>
      <div className='card'>
        <div className='card-image'>
          <img src={BASE_URL +book?.S_HINHANH} alt={book?.S_TIEUDE} />
        </div>
        <div className='card-body'>
          <div className='card-title'>
            {book?.S_TIEUDE}
          </div>
          {book?.S_MOTA}
          <div className='card-buttons'>
            <Button variant='primary'>Borrow</Button>
          </div>
        </div>
      </div>
    </div>;

  const NoBook = () => <div>Không tìm thấy sách</div>;

  const RightItem = () => {
    return <div className='col col-8'>
      <h3>{book?.S_TIEUDE}</h3>
      <div>IBNS: {book?.S_MA}</div>
      <div>Xuất bản: {book?.S_LANXUATBAN}</div>
      <div>Số trang: {book?.S_SOTRANG}</div>
      <div>Mô tả: {book?.S_MOTA ?? 'Chưa có mô tả.'}</div>
      <div>Loại Sách: {
        book?.LS_TEN
          ? <Link to={'/books?type='+book.LS_MA}>{book?.LS_TEN}</Link>
          : book?.LS_TEN
      }</div>
      <div>Tác giả: {book.TG_TEN ? book.TG_TEN.join(', '): null}</div>
      <div>Chủ đề: {book?.CDS_TEN}</div>
      <div>Năm xuất bản: {book?.NXB}</div>
      <div>Từ khoá: {book?.S_TUKHOA}</div>
    </div>
  }

  return (<div>
    <header >
      <MainNav/>
    </header>
    <section className='section trending-section mt-4'>
      <div className='wrapper w-1140'>
        <div className='row'>
          <div className='col'>
            <div className="section-title">
              {book?.S_TIEUDE ?? 'Không tìm thấy sách'}
            </div>
          </div>
        </div>
        <div className='row m-4'>
          { book 
            ? <>
                <LeftItem />
                <RightItem />
              </>: <NoBook />}
        </div>
      </div>
    </section>
    <Footer/>
  </div>);
}