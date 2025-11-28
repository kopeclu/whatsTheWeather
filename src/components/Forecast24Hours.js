import ForecasBox from "./ForecasBox";
const Forecast24Hours = ({futureData, metric}) => {

  const next24Hours = futureData.list.slice(0, 8);
  const timezone = futureData.city.timezone;

  return (
    <div className="forecast24">
      {next24Hours.map((el, index) => (
        <ForecasBox key={index} data={el} timezone={timezone} metric={metric} />
      ))}
    </div>
  );
}
 
export default Forecast24Hours;