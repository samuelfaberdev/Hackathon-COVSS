import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, Flip } from "react-toastify";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import CastleDetails from "./pages/CastleDetails";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import axios from "axios";
import "./App.css";
import Loading from "./components/Loading";

function App() {
  const castleLink = [];
  const [indexCastle, setIndexCastle] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [castleList, setCastleList] = useState([]);
  const [castleTableDetails, setCastleTableDetails] = useState([]);

  if (!isLoading) {
    const castleTable = [];
    for (let i = 0; i <= 7; i++) {
      let randomCastle = 0;
      do {
        randomCastle =
          castleList[Math.floor(Math.random() * 110)].properties.xid;
      } while (castleTable.includes(randomCastle));
      castleTable.push(randomCastle);
      castleLink.push(
        `https://api.opentripmap.com/0.1/en/places/xid/${randomCastle}?apikey=5ae2e3f221c38a28845f05b6f85b1a4179864a9e8c9917017478344e`
      );
    }
  }

  useEffect(() => {
    axios
      .get(
        "https://api.opentripmap.com/0.1/en/places/radius?radius=500000&lon=2&lat=48&name=chateau&rate=1h&apikey=5ae2e3f221c38a28845f05b6f85b1a4179864a9e8c9917017478344e"
      )
      .then((response) => {
        setCastleList(response.data.features);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .all(castleLink.map((link) => axios.get(link)))
      .then((response) => {
        setCastleTableDetails(response);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading2(false));
  }, [isLoading]);

  if (isLoading || isLoading2) return <Loading />;

  return (
    <Router>
      <div className="bg-tertiary min-h-screen flex flex-col justify-between items-center">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                castleTableDetails={castleTableDetails}
                setIndexCastle={setIndexCastle}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route
            path="/castledetails"
            element={<CastleDetails castle={castleTableDetails[indexCastle]} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer transition={Flip} />
    </Router>
  );
}

export default App;
