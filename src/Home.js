import Card from "./Card";
import Header from "./Header"

const Home = () => {
  const europeCities = ['London', 'Barcelona', 'Paris', 'Madrid', 'Berlin', 'Prague', 'Rome', 'Zagreb', 'Wien', 'Split'];

  const americaCities = ['New York', 'Los Angeles', 'Washington DC', 'Las Vegas', 'San Francisco', 'Ottawa', 'Rio de Janeiro'];

  const asiaCities = ['Tokyo', 'Beijing', 'Hong Kong', 'New Dilli'];

  const getRandomInt = (range) => {
    return Math.floor(Math.random() * range);
  }

  const chosenCities = [europeCities[getRandomInt(europeCities.length)],americaCities[getRandomInt(americaCities.length)], asiaCities[getRandomInt(asiaCities.length)]];

  return (
    <>
      <Header />
      <div className="card-list">
        {chosenCities.map((city, index) => (
          <Card city={city} key={index} />
        ))}
      </div>
    </>
  );
}
 
export default Home;