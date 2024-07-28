import { useEffect } from "react";
import { useDispatch } from "react-redux";
import FeatureProduct from "./components/FeatureProducts";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

// import { getProducts } from "./store/actions/products";
import { setProducts } from "./store/actions/filters";

const Home = () => {
  // console.log(products);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //     dispatch(getProducts());
  // },[])
  

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setProducts());
  }, []);

  const data = {
    name: "SimpleBuy store",
  };

  return (
    <>
      <HeroSection myData={data} />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
