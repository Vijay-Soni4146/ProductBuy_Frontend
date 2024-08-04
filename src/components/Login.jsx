import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser, signInUser } from "../store/actions/users";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistered, setIsRegistered] = useState(false);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    const container = document.querySelector(".custom-container");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const signInBtn = document.querySelector("#sign-in-btn");

    const handleSignUpClick = () => {
      container.classList.add("sign-up-mode");
    };

    const handleSignInClick = () => {
      container.classList.remove("sign-up-mode");
    };

    signUpBtn.addEventListener("click", handleSignUpClick);
    signInBtn.addEventListener("click", handleSignInClick);

    return () => {
      signUpBtn.removeEventListener("click", handleSignUpClick);
      signInBtn.removeEventListener("click", handleSignInClick);
    };
  }, []);

  useEffect(() => {
    if (users && users.auth) {
      navigate("/");
    }
  }, [users, navigate]);

  useEffect(() => {
    if (isRegistered) {
      const container = document.querySelector(".custom-container");
      container.classList.remove("sign-up-mode");
      setIsRegistered(false);
    }
  }, [isRegistered]);

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter the email.")
        .email("Please enter a valid email"),
      password: Yup.string().required("Please enter the password."),
    }),
    onSubmit: (values) => {
      // console.log(values);
      dispatch(signInUser(values));
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please enter the email.")
        .email("Please enter a valid email"),
      password: Yup.string().required("Please enter the password."),
      name: Yup.string().required("Please enter your name."),
    }),
    onSubmit: (values) => {
      // console.log(values);
      dispatch(registerUser(values));
      setIsRegistered(true);
    },
  });

  return (
    <Wrapper>
      <div className="custom-container">
        <div className="forms-container">
          <div className="signin-signup">
            <Form className="sign-in-form" onSubmit={loginFormik.handleSubmit}>
              <h2 className="title">Sign in</h2>
              <div
                className="input-field"
                style={{
                  borderColor:
                    loginFormik.touched.email && loginFormik.errors.email
                      ? "red"
                      : "initial",
                  borderWidth:
                    loginFormik.touched.email && loginFormik.errors.email
                      ? "1px"
                      : "initial",
                  borderStyle:
                    loginFormik.touched.email && loginFormik.errors.email
                      ? "solid"
                      : "none",
                }}
              >
                <i className="fas fa-user"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...loginFormik.getFieldProps("email")}
                />
              </div>
              <div
                className="input-field"
                style={{
                  borderColor:
                    loginFormik.touched.password && loginFormik.errors.password
                      ? "red"
                      : "initial",
                  borderWidth:
                    loginFormik.touched.password && loginFormik.errors.password
                      ? "1px"
                      : "initial",
                  borderStyle:
                    loginFormik.touched.password && loginFormik.errors.password
                      ? "solid"
                      : "none",
                }}
              >
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...loginFormik.getFieldProps("password")}
                />
              </div>
              <button type="submit" className="btn solid">
                {users.loading ? (
                  <span>Please wait...</span>
                ) : (
                  <span>Login</span>
                )}
              </button>
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </Form>
            <Form
              className="sign-up-form"
              onSubmit={registerFormik.handleSubmit}
            >
              <h2 className="title">Sign up</h2>
              <div
                className="input-field"
                style={{
                  borderColor:
                    registerFormik.touched.name && registerFormik.errors.name
                      ? "red"
                      : "initial",
                  borderWidth:
                    registerFormik.touched.name && registerFormik.errors.name
                      ? "1px"
                      : "initial",
                  borderStyle:
                    registerFormik.touched.name && registerFormik.errors.name
                      ? "solid"
                      : "none",
                }}
              >
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Username"
                  name="name"
                  {...registerFormik.getFieldProps("name")}
                />
              </div>
              <div
                className="input-field"
                style={{
                  borderColor:
                    registerFormik.touched.email && registerFormik.errors.email
                      ? "red"
                      : "initial",
                  borderWidth:
                    registerFormik.touched.email && registerFormik.errors.email
                      ? "1px"
                      : "initial",
                  borderStyle:
                    registerFormik.touched.email && registerFormik.errors.email
                      ? "solid"
                      : "none",
                }}
              >
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  {...registerFormik.getFieldProps("email")}
                />
              </div>
              <div
                className="input-field"
                style={{
                  borderColor:
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                      ? "red"
                      : "initial",
                  borderWidth:
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                      ? "1px"
                      : "initial",
                  borderStyle:
                    registerFormik.touched.password &&
                    registerFormik.errors.password
                      ? "solid"
                      : "none",
                }}
              >
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  {...registerFormik.getFieldProps("password")}
                />
              </div>
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </Form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New to our community ?</h3>
              <p>
                Discover a world of possibilities! Join us and explore a vibrant
                community where ideas flourish and connections thrive.
              </p>
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img
              src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
              className="image"
              alt=""
            />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of Our Valued Members</h3>
              <p>
                Thank you for being part of our community. Your presence
                enriches our shared experiences. Let's continue this journey
                together!
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img
              src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
              className="image"
              alt=""
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .custom-container {
    position: relative;
    width: 100%;
    background-color: #fff;
    min-height: 100vh;
    overflow: hidden;
  }

  .forms-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .signin-signup {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 75%;
    width: 50%;
    transition: 1s 0.7s ease-in-out;
    display: grid;
    grid-template-columns: 1fr;
    z-index: 5;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0rem 5rem;
    transition: all 0.2s 0.7s;
    overflow: hidden;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  form.sign-up-form {
    opacity: 0;
    z-index: 1;
  }

  form.sign-in-form {
    z-index: 2;
  }

  .title {
    font-size: 2.2rem;
    color: #444;
    margin-bottom: 10px;
  }

  .input-field {
    max-width: 380px;
    width: 100%;
    background-color: #f0f0f0;
    margin: 10px 0;
    height: 55px;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 0 0.4rem;
    position: relative;
  }

  .input-field i {
    text-align: center;
    line-height: 55px;
    color: #acacac;
    transition: 0.5s;
    font-size: 2rem;
  }

  .input-field input {
    background: none;
    outline: none;
    border: none;
    line-height: 1;
    font-weight: 600;
    font-size: 1.1rem;
    color: #333;
  }

  .input-field input::placeholder {
    color: #aaa;
    font-weight: 500;
  }

  .social-text {
    padding: 0.7rem 0;
    font-size: 1rem;
  }

  .social-media {
    display: flex;
    justify-content: center;
  }

  .social-icon {
    height: 46px;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.45rem;
    color: #333;
    border-radius: 50%;
    border: 1px solid #333;
    text-decoration: none;
    font-size: 1.1rem;
    transition: 0.3s;
  }

  .social-icon:hover {
    color: rgb(98, 84, 243);
    border-color: rgb(98, 84, 243);
  }

  .btn {
    width: 150px;
    background-color: rgb(98, 84, 243);
    border: none;
    outline: none;
    height: 49px;
    border-radius: 4px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 600;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.5s;
  }

  .btn:hover {
    background-color: rgba(98, 84, 243, 0.8);
  }

  .panels-container {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .custom-container:before {
    content: "";
    position: absolute;
    height: 2000px;
    width: 2000px;
    top: -10%;
    right: 38%;
    transform: translateY(-50%);
    background-image: linear-gradient(
      -45deg,
      rgb(98, 84, 243) 0%,
      rgb(131, 111, 243) 100%
    );
    transition: 1.8s ease-in-out;
    border-radius: 50%;
    z-index: 6;
  }

  .image {
    width: 100%;
    transition: transform 1.1s ease-in-out;
    transition-delay: 0.4s;
  }

  .panel {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    text-align: center;
    z-index: 6;
  }

  .left-panel {
    pointer-events: all;
    padding: 3rem 17% 2rem 12%;
  }

  .right-panel {
    pointer-events: none;
    padding: 3rem 12% 2rem 17%;
  }

  .panel .content {
    color: #fff;
    transition: transform 0.9s ease-in-out;
    transition-delay: 0.6s;
  }

  .panel h3 {
    font-weight: 600;
    line-height: 1;
    font-size: 1.5rem;
  }

  .panel p {
    font-size: 1.2rem;
    padding: 0.7rem 0;
    color: white;
  }

  .btn.transparent {
    margin: 0;
    background: none;
    border: 2px solid #fff;
    width: 130px;
    height: 41px;
    font-weight: 600;
    font-size: 1.5rem;
  }

  .right-panel .image,
  .right-panel .content {
    transform: translateX(800px);
  }

  /* ANIMATION */

  .custom-container.sign-up-mode:before {
    transform: translate(100%, -50%);
    right: 60%;
  }

  .custom-container.sign-up-mode .left-panel .image,
  .custom-container.sign-up-mode .left-panel .content {
    transform: translateX(-800px);
  }

  .custom-container.sign-up-mode .signin-signup {
    left: 25%;
  }

  .custom-container.sign-up-mode form.sign-up-form {
    opacity: 1;
    z-index: 2;
  }

  .custom-container.sign-up-mode form.sign-in-form {
    opacity: 0;
    z-index: 1;
  }

  .custom-container.sign-up-mode .right-panel .image,
  .custom-container.sign-up-mode .right-panel .content {
    transform: translateX(0%);
  }

  .custom-container.sign-up-mode .left-panel {
    pointer-events: none;
  }

  .custom-container.sign-up-mode .right-panel {
    pointer-events: all;
  }

  @media (max-width: 870px) {
    .custom-container {
      min-height: 800px;
      height: 100vh;
    }
    .signin-signup {
      width: 100%;
      top: 95%;
      transform: translate(-50%, -100%);
      transition: 1s 0.8s ease-in-out;
    }

    .signin-signup,
    .custom-container.sign-up-mode .signin-signup {
      left: 50%;
    }

    .panels-container {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 2fr 1fr;
    }

    .panel {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      padding: 2.5rem 8%;
      grid-column: 1 / 2;
    }

    .right-panel {
      grid-row: 3 / 4;
    }

    .left-panel {
      grid-row: 1 / 2;
    }

    .image {
      width: 200px;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.6s;
    }

    .panel .content {
      padding-right: 15%;
      transition: transform 0.9s ease-in-out;
      transition-delay: 0.8s;
    }

    .panel h3 {
      font-size: 1.2rem;
    }

    .panel p {
      font-size: 0.7rem;
      padding: 0.5rem 0;
    }

    .btn.transparent {
      width: 110px;
      height: 35px;
      font-size: 0.7rem;
    }

    .custom-container:before {
      width: 1500px;
      height: 1500px;
      transform: translateX(-50%);
      left: 30%;
      bottom: 68%;
      right: initial;
      top: initial;
      transition: 2s ease-in-out;
    }

    .custom-container.sign-up-mode:before {
      transform: translate(-50%, 100%);
      bottom: 32%;
      right: initial;
    }

    .custom-container.sign-up-mode .left-panel .image,
    .custom-container.sign-up-mode .left-panel .content {
      transform: translateY(-300px);
    }

    .custom-container.sign-up-mode .right-panel .image,
    .custom-container.sign-up-mode .right-panel .content {
      transform: translateY(0px);
    }

    .right-panel .image,
    .right-panel .content {
      transform: translateY(300px);
    }

    .custom-container.sign-up-mode .signin-signup {
      top: 5%;
      transform: translate(-50%, 0);
    }
  }

  @media (max-width: 570px) {
    form {
      padding: 0 1.5rem;
    }

    .image {
      display: none;
    }
    .panel .content {
      padding: 0.5rem 1rem;
    }
    .custom-container {
      padding: 1.5rem;
    }

    .custom-container:before {
      bottom: 72%;
      left: 50%;
    }

    .custom-container.sign-up-mode:before {
      bottom: 28%;
      left: 50%;
    }
  }
`;

export default Login;
