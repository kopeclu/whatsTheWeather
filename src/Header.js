const Header = ({city, setCity}) => {

/*
  TODO:
  -Zajistit aby se promenna city prepsala jen jednou, ne po kazde zmene
  -Napsane reseni nefunguje (fix)
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.value);
    console.log(city);

    setCity('');
    document.getElementById('cityInput').reset();
  }

  return (
    <div className="header">
      <form id="cityInput" onSubmit={handleSubmit}>
        <input type='text' placeholder='Find a city' />
        <button>
          Find
        </button>
      </form>
    </div>
  );
}
 
export default Header;