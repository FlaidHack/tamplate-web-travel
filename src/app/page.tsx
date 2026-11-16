import Hero from "../components/Hero";
import Popular from "../components/Popular";
import Stats from "../components/Stats";
import Feature from "../components/Feature";
import Explore from "../components/Explore";
import Adventure from "../components/Adventure";
import Testimonials from "../components/Testimonials";
import Banner from "../components/Banner";

export default function Home() {
  return (
    <main>
      <Hero />
      <Popular />
      <Stats />
      <Feature />
      <Explore />
      <Adventure />
      <Testimonials />
      <Banner />
    </main>
  );
}
