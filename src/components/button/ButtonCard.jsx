const ButtonCard = ({ onClick }) => {
    return (
      <button onClick={onClick} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <img src={"../../assets/Button.png"} alt="Imagen del botón" />
      </button>
    );
  }
  
  export default ButtonCard;