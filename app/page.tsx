import TopBar from "./TopBar";
import SmoothScroll from "./SmoothScroll";
import Hero from "./Hero";
import DepartureBoard from "./DepartureBoard";
import MarqueeBand from "./MarqueeBand";
import FlightPath from "./FlightPath";
import BoardingChecklist from "./BoardingChecklist";
import PassportVisas from "./PassportVisas";
import ToursGallery from "./ToursGallery";
import IntentPicker from "./IntentPicker";
import FinalCta from "./FinalCta";
import Footer from "./Footer";
import WhatsAppSticky from "./WhatsAppSticky";

// One page, one flight: boarding -> departures -> route -> checklist ->
// passport stamps -> corridor rail -> ticket counter -> the final pass.
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <main id="main">
        <TopBar />
        <Hero />
        <DepartureBoard />
        <MarqueeBand />
        <FlightPath />
        <BoardingChecklist />
        <PassportVisas />
        <ToursGallery />
        <IntentPicker />
        <FinalCta />
        <Footer />
      </main>
      <WhatsAppSticky />
    </>
  );
}
