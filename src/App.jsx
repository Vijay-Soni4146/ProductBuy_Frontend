import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import About from "./About";
import Home from "./Home";
import Products from "./Products";
import Contact from "./Contact";
import SingleProduct from "./SingleProduct";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";
import { GlobalStyle } from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getProducts } from "./store/actions/products";
import Login from "./components/Login";
import Order from "./components/Order";
import PrivateRoute from "./PrivateRoute";
import { showToast } from "./helpers/ShowToast";
import { setGlobalAuth } from "./store/reducers/users";
import { clearNotifications } from "./store/reducers/notifications";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "./Auth";

const App = () => {
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    const auth = getAuth();
    dispatch(setGlobalAuth(!!auth));
  }, []);

  useEffect(() => {
    let { global } = notifications;
    if (notifications && global.error) {
      const msg = global.msg ? global.msg : "Error";
      showToast("ERROR", msg);
      dispatch(clearNotifications());
    }
    if (notifications && global.success) {
      const msg = global.msg ? global.msg : "Good!";
      showToast("SUCCESS", msg);
      dispatch(clearNotifications());
    }
  }, [notifications]);

  const isAuthenticated = PrivateRoute();

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/order" element={<Order />} /> */}
          <Route
            path="/order"
            element={isAuthenticated ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
