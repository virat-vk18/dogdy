import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/custom.scss";
import Home from "./Pages/home/Home";
import { Route, Routes } from "react-router-dom";
import ConnectWallet from "./Pages/walletApi/ConnectWallet";
import Faq from "./Pages/faq/Faq";
import PrivacyPolicy from "./Pages/CMS/privacypolicy/PrivacyPolicy";
import TermsCondition from "./Pages/CMS/terms&conditions/TermsCondition.jsx";
import Breeding from "./Pages/breeding/Breeding";
import BreedingDog from "./Pages/breeding/BreedingDog";
import DogDetails from "./Pages/dogDetails/DogDetails";
import MarketLayout from "./Pages/Market/MarketLayout";
import MarketPlace from "./Pages/Market/MarketPlace";
import MarketPlaceDetails from "./Pages/Market/MarketPlaceDetails";
import MyStable from "./Pages/Market/MyStable";
import Specification from "./Pages/specification/Specification";
import { ToastContainer } from "react-toastify";
import SellNft from "./Pages/createNft/SellNft";
import StudFarmNft from "./Pages/createNft/StudFarmNft";
import BreedingDiv from "./Pages/breeding/BreedingDiv";
import PrivateRouter from "./Pages/privateRouter/PrivateRouter";
import AboutUs from "./Pages/CMS/aboutUS/AboutUs.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Connect Wallet */}
        <Route path="/connect-wallet" element={<ConnectWallet />} />

        {/* SELL CREATION NFT */}
        <Route path="/sellcreation" element={<PrivateRouter />}>
          <Route path="/sellcreation" element={<SellNft />} />
        </Route>

        {/* STUD CREATION NFT */}
        <Route path="/studcreation" element={<PrivateRouter />}>
          <Route path="/studcreation" element={<StudFarmNft />} />
        </Route>

        {/* FAQ Page */}
        <Route path="/faq" element={<Faq />} />

        {/* Privacy Page */}
        <Route path="/privacy" element={<PrivacyPolicy />} />

        {/* Terms Page */}
        <Route path="/terms" element={<TermsCondition />} />
        {/* About Us */}
        <Route path="/aboutus" element={<AboutUs />} />

        {/* Breeding Pages */}
        {/* STUD FARM TABLE START */}
        <Route path="/breeding" element={<PrivateRouter />}>
          <Route path="/breeding" element={<Breeding />} />
        </Route>
        {/* STUD FARM TABLE END */}

        {/* BREEDING DIV */}
        <Route path="/breeding/:id" element={<PrivateRouter />}>
          <Route path="/breeding/:id" element={<BreedingDiv />} />
        </Route>

        {/* BREEDING MAIN */}
        <Route path="/breeding-dog/:id" element={<PrivateRouter />}>
          <Route path="/breeding-dog/:id" element={<BreedingDog />} />
        </Route>

        {/* SHOWING DOG DETAILS FOR BREEDING */}
        <Route path="/dog-details/:id" element={<PrivateRouter />}>
          <Route path="/dog-details/:id" element={<DogDetails />} />
        </Route>

        {/* Buy , Sell  & Marketplace page */}
        <Route path="/" element={<MarketLayout />}>
          {/* MARKET FOR SELL NFT */}
          <Route path="/market-place" element={<PrivateRouter />}>
            <Route path="/market-place" element={<MarketPlace />} />
          </Route>

          {/* INDIVIDUAL MARKET PLACE DETAILS */}
          <Route
            path="/market-place-details/:id"
            element={<MarketPlaceDetails />}
          />

          {/* <Route path="/market-place-details-sell" element={<PrivateRouter />}>
            <Route
              path="/market-place-details-sell"
              element={<MarketPlaceDetails2 />}
            /> 
          
          </Route> */}

          {/* MY STABLE OR PROFILE */}
          <Route path="/my-stable" element={<PrivateRouter />}>
            <Route path="/my-stable" element={<MyStable />} />
          </Route>

          {/* DOG SPECIFICATION */}
          <Route path="/specification/:id" element={<PrivateRouter />}>
            <Route path="/specification/:id" element={<Specification />} />
          </Route>

          {/* ROUTING PAGES END */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
