import Header from "../components/Header"
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import Legend from "../utils/Legend";
import { BASE_MAP_URL, getMapOverlayUrl, HOME_INFO_CARDS } from "../constants";

const Home = () => {

  const { BaseLayer, Overlay } = LayersControl;
  const apiKey = import.meta.env.VITE_APP_KEY;

  return (
    <div className="flex flex-col min-h-screen bg-[#DCF0FF]">
      <Header />
      
      <main className="grow w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 flex flex-col gap-10">
        <section className="p-6 md:p-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
            Weather App
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 text-sm md:text-base">
            Accurate, real-time weather tracking. Before you start searching, here are two quick tips:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {HOME_INFO_CARDS.map(card => (
              <div key={card.header} className="bg-white/30 rounded-2xl p-5 border border-white/40 shadow-sm">
                <h3 className="font-semibold text-lg text-black-600 mb-2">
                  {card.header}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.text}
                </p>
              </div>
            ))}

          </div>
        </section>
      </main>

      <section className="flex justify-center p-4 md:p-8 overflow-hidden relative z-0">
        <MapContainer
          center={[50.1, 14.2]}
          zoom={5}
        >
          <LayersControl position="topright">
            <BaseLayer checked name="Base Map">
              <TileLayer url={BASE_MAP_URL} />
            </BaseLayer>
            <Overlay checked name="Temperature">
              <TileLayer
                url={getMapOverlayUrl(apiKey)}
                opacity={1}
                zIndex={1000}
              />
            </Overlay>
          </LayersControl>
          <Legend />
        </MapContainer>
      </section>
    </div>
  );
}
 
export default Home;