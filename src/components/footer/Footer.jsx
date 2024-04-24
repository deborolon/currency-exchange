function Footer() {
  const date = `${new Date().toDateString()}, ${new Date().toLocaleTimeString()}`
    return (
      <div className="footer">
        <p>US Dollar to Euro conversion — Last updated {date}</p>
      </div>
    );
  }
  
  export default Footer;