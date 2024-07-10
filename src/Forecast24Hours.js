import Element24Hours from "./Element24Hours";

const Forecast24Hours = ({futureData}) => {

  const next24Hours = futureData.list.slice(0, 8);
  const timezone = futureData.city.timezone;

  return (
    <div className="forecast24">
      {next24Hours.map((el, index) => (
        <Element24Hours key={index} data={el} timezone={timezone} />
      ))}
    </div>
  );
}
 
export default Forecast24Hours;