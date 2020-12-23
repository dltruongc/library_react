import Landing from './Landing';
import Footer from '../components/Footer';

export default function Home() {
  const data = [
    {
      id: 1,
      title: 'Title Item 1',
      description: 'Description 1',
      image: 'https://picsum.photos/320/400.jpg?random=11',
    },
    {
      id: 2,
      title: 'Title Item 2',
      description: 'Description 2',
      image: 'https://picsum.photos/320/400.jpg?random=12',
    },
    {
      id: 3,
      title: 'Title Item 3',
      description: 'Description 3',
      image: 'https://picsum.photos/320/400.jpg?random=13',
    },
    {
      id: 4,
      title: 'Title Item 4',
      description: 'Description 4',
      image: 'https://picsum.photos/320/400.jpg?random=14',
    },
    {
      id: 5,
      title: 'Title Item 5',
      description: 'Description 5',
      image: 'https://picsum.photos/320/400.jpg?random=15',
    },
    {
      id: 6,
      title: 'Title Item 6',
      description: 'Description 6',
      image: 'https://picsum.photos/320/400.jpg?random=16',
    },
    {
      id: 7,
      title: 'Title Item 7',
      description: 'Description 7',
      image: 'https://picsum.photos/320/400.jpg?random=17',
    },
    {
      id: 8,
      title: 'Title Item 8',
      description: 'Description 8',
      image: 'https://picsum.photos/320/400.jpg?random=18',
    },
    {
      id: 9,
      title: 'Title Item 9',
      description: 'Description 9',
      image: 'https://picsum.photos/320/400.jpg?random=19',
    },
    {
      id: 10,
      title: 'Title Item 10',
      description: 'Description 10',
      image: 'https://picsum.photos/320/400.jpg?random=20',
    },
    {
      id: 11,
      title: 'Title Item 11',
      description: 'Description 11',
      image: 'https://picsum.photos/320/400.jpg?random=21',
    },
  ];

  const Cards = data.map((item) => (
    <div key={item.id} className='col-3 card'>
      <div className='card-image'>
        <img src={item.image} alt='' />
      </div>
      <div className='card-body'>
        <div className='card-title'>{item.title}</div>
        {item.description}
        <div className='card-buttons'>
          <a href='#' className='btn btn-full'>
            Borrow
          </a>
          <a href={`books/${item.id}`} className='btn btn-ghost'>
            Details
          </a>
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
    <div className='circle-avatar' key={id}>
      <div
        className='avatar'
        style={{ background: 'url(' + mem.avatar + ')' }}
      ></div>
      <div className='avatar-name'>{mem.name}</div>
    </div>
  ));

  return (
    <div>
      <Landing />

      <section className='section trending-section mt-4'>
        <div className='wrapper w-1140'>
          <div className='row'>
            <div className='relative'>
              <div className='section-title'>Trending books</div>
            </div>
          </div>
          <div className='row mt-1'>{Cards}</div>
        </div>
      </section>

      <section className='section author-section mt-4'>
        <div className='wrapper w-1140'>
          <div className='row'>
            <div className='relative'>
              <div className='section-title'>Top members</div>
            </div>
            <div className='row mt-1 '>
              <div className='avatar-box'>{Members}</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
