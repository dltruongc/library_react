import {
  AiFillFacebook,
  AiFillGithub,
  AiFillMail,
  AiFillTwitterCircle,
} from 'react-icons/ai';

export default function Footer() {
  return (
    <footer>
      <div className='w-1140'>
        <div className='row'>
          <div className='col-lg-5 mb-lg-0 mb-sm-4 mb-2'>
            <h3>Tổng quan</h3>
            <h4>Đỗ Lam Trường</h4>
            <p>Sinh viên Đại học Cần Thơ</p>
            <p>
              Địa chỉ: Khu II, đường 3/2, P. Xuân Khánh, Q. Ninh Kiều, TP. Cần
              Thơ
            </p>
            <p>Niên khoá: 2017 - 2021</p>
            <p>MSSV: B1704648</p>
            <p>Email: dltruong.c@gmail.com</p>
          </div>
          <div className='col-lg-3 col-sm-6'>
            <h3>Bản quyền</h3>
            <p>Học phần: Niên luận ngành HTTT</p>
            <p>Giảng viên hướng dẫn: TS. Trương Quốc Định</p>
            <p>Niên khoá: Học kì 2 - 2020</p>
          </div>
          <div className='col-lg-4 col-sm-6'>
            <div>
              <h3>Liên kết</h3>
              <div className="d-flex">
                <div className="mr-2">
                  <a href='https://github.com/dltruonc'>
                    <AiFillGithub fontSize='2rem' />
                  </a>
                </div>
                <div className="mr-2">
                  <a href='https://facebook.com/dltruong.neyva'>
                    <AiFillFacebook fontSize='2rem' />
                  </a>
                </div>
                <div className="mr-2">
                  <a href='mailto: dltruong.c@gmail.com'>
                    <AiFillMail fontSize='2rem' />
                  </a>
                </div>
                <div className="mr-2">
                  <a href='https://twitter.com/LamTrng37435104'>
                    <AiFillTwitterCircle fontSize='2rem' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
