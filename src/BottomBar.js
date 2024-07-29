const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <div className="bottom-left">
        <div>
          Created with: <a href="https://www.npmjs.com/package/react">React 18.3.1</a>
        </div>
        <div>
          Source API: <a href="https://openweathermap.org/">OpenWeather</a>
        </div>
        <div>
          Author: <a href="https://github.com/kopeclu">Kopecny L.</a>
        </div>
      </div>
      <div className="bottom-right">
        <div>
          This project is a non-commercial and completely free to use. It has been developed as part of the author's portfolio to showcase their skills and expertise in web development and data visualization.
        </div>
      </div>
    </div>
  );
}
 
export default BottomBar;