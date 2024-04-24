import TitleNav from './TitleNav';
import TitleBanner from './TitleBanner';

function Header() {
  return (
    <div className="header">
      <TitleNav title="Currency exchange"/>
      <TitleBanner title="100 EUR to USD - Convert Euros to US Dollars"/>
    </div>
  );
}

export default Header;