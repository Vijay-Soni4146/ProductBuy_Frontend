import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./styles/Container";
import MyImage from "./components/MyImage";
import AddToCart from "./components/AddToCart";
import PageNavigation from "./components/PageNavigation";
import FormatPrice from "./helpers/FormatPrice";
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";

import { getProduct } from "./store/actions/products";

const SingleProduct = () => {

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  const { product } = useSelector((state) => state.products.singleProduct);
  console.log(product);
  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log(id);

  //  useEffect(() => {
  //    getSingleProduct(`${API}/${id}`);
  //  }, []);

  // console.log(singleProduct);

  //  if (isSingleLoading) {
  //    return <div className="page_loading">Loading.....</div>;
  //  }

  return (
    <Wrapper>
      {product ? (
        <>
          <PageNavigation title={product.name} />
          <Container className="container">
            <div className="grid grid-two-column">
              {/* product Images  */}
              <div className="product_images">
                <MyImage imgs={product.image} />
              </div>

              {/* product dAta  */}
              <div className="product-data">
                <h2>{name}</h2>
                <p>({product.reviews} customer reviews)</p>

                <p className="product-data-price">
                  MRP:
                  <del>
                    <FormatPrice price={product.price + 250000} />
                  </del>
                </p>
                <p className="product-data-price product-data-real-price">
                  Deal of the Day: <FormatPrice price={product.price} />
                </p>
                <p>{product.description}</p>
                <div className="product-data-warranty">
                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty-icon" />
                    <p>Free Delivery</p>
                  </div>

                  <div className="product-warranty-data">
                    <TbReplace className="warranty-icon" />
                    <p>30 Days Replacement</p>
                  </div>

                  <div className="product-warranty-data">
                    <TbTruckDelivery className="warranty-icon" />
                    <p>Vijay Delivered </p>
                  </div>

                  <div className="product-warranty-data">
                    <MdSecurity className="warranty-icon" />
                    <p>2 Year Warranty </p>
                  </div>
                </div>

                <div className="product-data-info">
                  <p>
                    Available :
                    <span>
                      {product.stock > 0 ? " In Stock" : " Not Available"}
                    </span>
                  </p>
                  <p>
                    ID : <span> {product._id} </span>
                  </p>
                  <p>
                    Brand :<span> {product.company} </span>
                  </p>
                </div>
                <hr />
                {product.stock > 0 && <AddToCart product={product} />}
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    padding: 9rem 0;
  }
  .product-data {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;

    .product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  }

  .product-images {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    margin: 0;
    padding-left: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }
`;

export default SingleProduct;
