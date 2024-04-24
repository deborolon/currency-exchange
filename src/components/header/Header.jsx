import TitleNav from './TitleNav';
import TitleBanner from './TitleBanner';

function Header() {
  return (
    <div className="header">
      <TitleNav title="Currency exchange"/>
      <TitleBanner title="100 USD to EUR - Convert US Dollars to Euros"/>
    </div>
  );
}

export default Header;