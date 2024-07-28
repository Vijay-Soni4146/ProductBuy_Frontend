import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { useFilterContext } from "../context/filter_context";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../helpers/FormatPrice";
import { Button } from "../styles/Button";
import {
  updateFilterText,
  applyFilterProducts,
  clearFilter
} from "../store/reducers/filters";
import { useEffect } from "react";

const FilterSection = () => {
  // const {
  //   filters: { text, category, color, price, maxPrice, minPrice },
  //   updateFilterValue,
  //   all_products,
  //   clearFilters,
  // } = useFilterContext();

  const { text, category, company,colors,price,maxPrice,minPrice } = useSelector(
    (state) => state.filters.filters
  );
  const { allProducts } = useSelector((state) => state.filters);
  console.log(allProducts);
  const dispatch = useDispatch();

  // get the unique values of each property
  // const getUniqueData = (data, attr) => {
  //   let newVal = data.map((curElem) => {
  //     return curElem[attr];
  //   });

  //   if (attr === "colors") {
  //     // return (newVal = ["All", ...new Set([].concat(...newVal))]);
  //     newVal = newVal.flat();
  //   }

  //   return (newVal = ["all", ...new Set(newVal)]);
  // };

  const filterText = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    return dispatch(updateFilterText({ name, value }));
  };

  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    });
    // newVal = ["all", ...new Set(newVal)];
    // console.log(newVal);

    if (property === "colors") {
      return (newVal = ["all", ...new Set([].concat(...newVal))]);
      // return newVal = newVal.flat();
    } else {
      return (newVal = ["all", ...new Set(newVal)]);
    }
  };

  const clearFilters = () => {
    return dispatch(clearFilter());
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      dispatch(applyFilterProducts());
    }
  }, [text, category, company,colors,price]);

  // we need to have the individual data of each in an array format
  const categoryData = getUniqueData(allProducts, "category");
  const companyData = getUniqueData(allProducts, "company");
  const colorsData = getUniqueData(allProducts, "colors");
  // console.log(
  //   "🚀 ~ file: FilterSection.js ~ line 23 ~ FilterSection ~ companyData",
  //   colorsData
  // );

  return (
    <>
      <Wrapper>
        <div className="filter-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="text"
              placeholder="Search"
              value={text}
              onChange={filterText}
            />
          </form>
        </div>

        <div className="filter-category">
          <h3>Category</h3>
          <div>
            {categoryData.map((curElem, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  name="category"
                  value={curElem}
                  className={curElem === category ? "active" : ""}
                  onClick={filterText}
                >
                  {curElem}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter-company">
          <h3>Company</h3>

          <form action="#">
            <select
              name="company"
              id="company"
              className="filter-company--select"
              onClick={filterText}
            >
              {companyData.map((curElem, index) => {
                return (
                  <option key={index} value={curElem} name="company">
                    {curElem}
                  </option>
                );
              })}
            </select>
          </form>
        </div>

        <div className="filter-colors colors">
          <h3>Colors</h3>

          <div className="filter-color-style">
            {colorsData.map((curColor, index) => {
              if (curColor === "all") {
                return (
                  <button
                    key={index}
                    type="button"
                    value={curColor}
                    name="colors"
                    className="color-all--style"
                    onClick={filterText}
                  >
                    all
                  </button>
                );
              }
              return (
                <button
                  key={index}
                  type="button"
                  value={curColor}
                  name="colors"
                  style={{ backgroundColor: curColor }}
                  className={
                    colors === curColor ? "btnStyle active" : "btnStyle"
                  }
                  onClick={filterText}
                >
                  {colors === curColor ? (
                    <FaCheck className="checkStyle" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="filter_price">
          <h3>Price</h3>
          <p>
            <FormatPrice price={price} />
          </p>
          <input
            type="range"
            name="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={filterText}
          />
        </div>

        <div className="filter-clear">
          <Button className="btn" onClick={clearFilters}>
          Clear Filters
        </Button>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h3 {
    padding: 2rem 0;
    font-size: bold;
  }

  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }

  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;

      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }

      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }

  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }

  .filter-color-style {
    display: flex;
    justify-content: center;
  }

  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .active {
    opacity: 1;
  }

  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }

  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }

  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
