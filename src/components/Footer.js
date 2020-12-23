import {
  AiFillFacebook,
  AiFillGithub,
  AiFillGoogleCircle,
  AiFillGooglePlusCircle,
  AiFillLinkedin,
  AiFillMail,
  AiFillTwitterCircle,
} from 'react-icons/ai';

export default function Footer() {
  return (
    <footer>
      <div className='w-1140'>
        <div className='row'>
          <div className='col-6'>
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
          <div className='col-3'>
            <div className='d-flex flex-column align-items-center'>
              <h3>Liên kết</h3>
              <div>
                <a href='https://github.com/dltruongc'>
                  <AiFillGithub fontSize='3rem' />
                </a>
              </div>
              <div>
                <a href='https://facebook.com/dltruong.neyva'>
                  <AiFillFacebook fontSize='3rem' />
                </a>
              </div>
              <div>
                <a href='mailto: dltruong.c@gmail.com'>
                  <AiFillMail fontSize='3rem' />
                </a>
              </div>
              <div>
                <a href='https://twitter.com/LamTrng37435104'>
                  <AiFillTwitterCircle fontSize='3rem' />
                </a>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <h3>Bản quyền</h3>
            <p>Học phần: Niên luận ngành HTTT</p>
            <p>Giảng viên hướng dẫn: TS. Trương Quốc Định</p>
            <p>Niên khoá: Học kì 2 - 2020</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
