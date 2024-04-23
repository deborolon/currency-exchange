import TitleBanner from './TitleBanner';

function Header() {
  return (
    <div className="nav-header">
      <div className="nav"><p className='title'>Currency exchange</p></div>
      <TitleBanner title="100 EUR to USD - Convert Euros to US Dollars"/>
    </div>
  );
}

export default Header;