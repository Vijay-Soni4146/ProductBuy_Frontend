import { createSlice } from "@reduxjs/toolkit";
import { setProducts } from "../actions/filters";

export const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filterProducts: [],
    allProducts: [],
    loading: false,
    gridView: true,
    sortingValue: "lowest",
    filters: {
      text: "",
      category: "all",
      company: "all",
      colors: "all",
      maxPrice: 0,
      price: 0,
      minPrice: 0,
    },
  },
  reducers: {
    toggleGridView(state) {
      state.gridView = true;
    },
    toggleListView(state) {
      state.gridView = false;
    },
    setSortValue: (state, action) => {
      state.sortingValue = action.payload;
    },
    sortingProduct: (state) => {
      let newSortData;
      let tempSortProduct = [...state.filterProducts];

      if (state.sortingValue === "a-z") {
        newSortData = tempSortProduct.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (state.sortingValue === "z-a") {
        newSortData = tempSortProduct.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (state.sortingValue === "lowest") {
        const sortingProduct = (a, b) => {
          return a.price - b.price;
        };
        newSortData = tempSortProduct.sort(sortingProduct);
      } else if (state.sortingValue === "highest") {
        const sortingProduct = (a, b) => {
          return b.price - a.price;
        };
        newSortData = tempSortProduct.sort(sortingProduct);
      }
      return {
        ...state,
        filterProducts: newSortData,
      };
    },
    updateFilterText: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    },
    applyFilterProducts: (state) => {
      let { allProducts } = state;
      let tempFilterProduct = [...allProducts];

      const { text, category, company, colors, price } = state.filters;

      if (text) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.name.toLowerCase().includes(text);
        });
      }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.category === category;
        });
      }

      if (company !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.company === company;
        });
      }
      if (colors !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.colors.includes(colors);
        });
      }
      if (price) {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem.price <= price;
        });
      }

      return {
        ...state,
        filterProducts: tempFilterProduct,
      };
    },
    clearFilter: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          colors: "all",
          maxPrice: 0,
          price: state.filters.maxPrice,
          minPrice: 0,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(setProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.filterProducts = action.payload.data;
        state.allProducts = action.payload.data;
        state.filters.price = action.payload.maxPrice;
        state.filters.maxPrice = action.payload.maxPrice;
      })
      .addCase(setProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  toggleGridView,
  toggleListView,
  setSortValue,
  sortingProduct,
  updateFilterText,
  applyFilterProducts,
  clearFilter,
} = filtersSlice.actions;
export default filtersSlice.reducer;
