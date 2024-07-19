import './HeroSection.css';
import Button from "./Button";

const HeroSection = () => {
  //TODO: add gradient
  return <section className="hero">
    <div className="hero-content">
      <h2>Краткое описание компании</h2>
      <Button>Узнать больше</Button>
    </div>
  </section>
}

export default HeroSection;