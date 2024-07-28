import styled from "styled-components";
import { BsFillGridFill, BsList } from "react-icons/bs";
// import { useFilterContext } from "../context/filter_context";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleGridView,
  toggleListView,
  setSortValue,
  sortingProduct,
} from "../store/reducers/filters";

const Sort = () => {
  // const { filter_products, grid_view, setGridView, setListView, sorting } =
  //   useFilterContext();
  
  const dispatch = useDispatch();
  const { filterProducts, gridView, sortingValue } = useSelector(
    (state) => state.filters
  );

  const setGridView = () => {
    dispatch(toggleGridView())
  }

  const setListView = () => {
    dispatch(toggleListView())
  }

  const sorting = (e) => {
    let userSortValue = e.target.value;
    dispatch(setSortValue(userSortValue));
    dispatch(sortingProduct());
  }

  return (
    <>
      {filterProducts ? (
        <Wrapper className="sort-section">
          {/* 1st column  */}
          <div className="sorting-list--grid">
            <button
              className={gridView ? "active sort-btn" : "sort-btn"}
              onClick={setGridView}
            >
              <BsFillGridFill className="icon" />
            </button>

            <button
              className={!gridView ? "active sort-btn" : " sort-btn"}
              onClick={setListView}
            >
              <BsList className="icon" />
            </button>
          </div>
          {/* 2nd column  */}
          <div className="product-data">
            <p>{`${filterProducts.length} Product Available`}</p>
          </div>

          {/* 3rd column  */}
          <div className="sort-selection">
            <form action="#">
              <label htmlFor="sort"></label>
              <select
                name="sort"
                id="sort"
                className="sort-selection--style"
                onChange={sorting}
              >
                <option value="lowest">Price(lowest)</option>
                <option value="#" disabled></option>
                <option value="highest">Price(highest)</option>
                <option value="#" disabled></option>
                <option value="a-z">Price(a-z)</option>
                <option value="#" disabled></option>
                <option value="z-a">Price(z-a)</option>
              </select>
            </form>
          </div>
        </Wrapper>
      ) : null}
    </>
  );
};

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;

  .sorting-list--grid {
    display: flex;
    gap: 2rem;

    .sort-btn {
      padding: 0.8rem 1rem;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }

    .icon {
      font-size: 1.6rem;
    }
    .active {
      background-color: ${({ theme }) => theme.colors.black};
      color: #fff;
    }
  }

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;

    .sort-select--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;

export default Sort;
