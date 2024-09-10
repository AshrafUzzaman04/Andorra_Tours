import { unstable_noStore as noStore } from 'next/cache';
import Header1 from './Header1';
import Axios from '@/helper/axios';
const getHeaderData = async () => {
	const res = await Axios.get('/header');
	return res?.data?.data || [];
}

const Header = async () => {
  noStore();
  const data = await getHeaderData();
  return (
    <Header1 data={data} />
  );
};

export default Header;

