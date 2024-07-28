// import { useFilterContext } from "../context/filter_context";
import { useSelector } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  // const { filter_products, grid_view } = useFilterContext();
  
  const { filterProducts,gridView } = useSelector((state) => state.filters);

  if (gridView === true) {
    return <GridView products={filterProducts} />;
  }

  if (gridView === false) {
    return <ListView products={filterProducts} />;
  }
};

export default ProductList;
