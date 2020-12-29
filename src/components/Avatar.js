import { Link } from "react-router-dom";
import { BASE_URL } from '../base/remote';
export default function Avatar ({ avatar }) {
  return <Link to='/me'>
    <div className='avatar d-inline-block align-top' style={{ backgroundImage: `url('${BASE_URL}${avatar}')` }}>
    </div>
  </Link>;
}