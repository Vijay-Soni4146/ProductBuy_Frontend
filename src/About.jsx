import HeroSection from "./components/HeroSection";

const About = () => {
  const data = {
    name: "SimpleBuy Ecommerce",
  };

  return (
    <>
      <HeroSection myData={data} />
    </>
  );
};

export default About;
