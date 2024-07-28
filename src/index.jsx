import ReactDOM from 'react-dom/client'
import App from './App'
// import  {AppProvider}  from './context/productContext';
// import { CartProvider } from "./context/cart_context";

import { Provider } from "react-redux";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
