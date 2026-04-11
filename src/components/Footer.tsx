const Footer = () => {
  return (
    <footer className="w-full mt-10 bg-white/30 backdrop-blur-md border-t border-white/40 text-gray-800 px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row justify-between items-center md:items-start gap-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      
      <div className="flex flex-col items-center md:items-start gap-2 text-sm md:text-base">
        <div>
          Created with:{" "}
          <a 
            href="https://www.npmjs.com/package/react" 
            className="font-semibold text-black-600"
          >
            React 18.3.1
          </a>
        </div>
        <div>
          Source API:{" "}
          <a 
            href="https://openweathermap.org/" 
            className="font-semibold text-black-600"
          >
            OpenWeather
          </a>
        </div>
        <div>
          Author:{" "}
          <a 
            href="https://github.com/kopeclu" 
            className="font-semibold text-black-600"
          >
            Kopecny L.
          </a>
        </div>
      </div>

      <div className="max-w-sm md:max-w-md text-center md:text-right text-xs md:text-sm text-gray-600 leading-relaxed">
        This project is non-commercial and completely free to use. It has been developed as part of the author's portfolio to showcase their skills and expertise in web development and data visualization.
      </div>
      
    </footer>
  );
}
 
export default Footer;