
import Header1 from './Header1';
import Axios from '@/helper/axios';

const Header = ({ scroll, handleLogin, handleMobileMenu, handleRegister, handleSidebar, data }: any) => {
  return (
    <div>
        <Header1
            data={data}
            scroll={scroll}
            handleLogin={handleLogin}
            handleMobileMenu={handleMobileMenu}
            handleRegister={handleRegister}
            handleSidebar={handleSidebar}
        />
    </div>
  );
};

export default Header;
