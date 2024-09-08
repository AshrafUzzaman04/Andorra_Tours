import Header1 from './Header1';
import Axios from '@/helper/axios';
const getHeaderData = async () => {
	const res = await Axios.get('/header');
	return res?.data?.data || [];
}

const Header = async ({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar }: any) => {
  const data = await getHeaderData();
  return (
    <Header1 data={data} />
  );
};

export default Header;

