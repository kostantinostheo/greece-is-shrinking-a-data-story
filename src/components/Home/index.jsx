import Hero from "../Hero";
import Prologue from "../Prologue";
import TurningPoint from "../TurningPoint";
import GeoChartGreece from "../GeoChartGreece"
import AgeingPop from '../AgeingPop'
import LifeExpand from '../LifeExpand'
import Mothers from '../Mothers'
import AbortionsInGreece from '../Abortions'
import Housing from '../Housing'
import LineChartFiltered from '../LineChartFiltered'
import Epilogue from '../Epilogue'
import ProgressBar from '../ProgressBar'
import ChapterNav from '../ChapterNav'
import ScrollToTopButton from "../ScrollToTopButton";

// The story, in reading order. Each chapter hands over to the next one.
function Home() {
  return (
    <>
      <ProgressBar />
      <ChapterNav />
      <Hero />
      <Prologue />
      <TurningPoint />
      <GeoChartGreece />
      <AgeingPop />
      <LifeExpand />
      <Mothers />
      <AbortionsInGreece />
      <Housing />
      <LineChartFiltered />
      <Epilogue />
      <ScrollToTopButton />
    </>
  );
}

export default Home;
