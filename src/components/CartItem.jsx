import FormatPrice from "../helpers/FormatPrice";
import CartAmountToggle from "./CartAmountToggle";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeItem,setIncrease,setDecrease } from "../store/reducers/carts";

const CartItem = ({ id, name, image, color, price, amount}) => {
  // const { removeItem, setDecrease, setIncrement } = useCartContext();


   const dispatch =  useDispatch();

  const handleSetDecrease = (id) => {
    // amount > 1 ? setAmounts(amount - 1) : setAmounts(1);
    dispatch(setDecrease(id))
  };

  const handleSetIncrease = (id) => {
    // amount < max ? setAmounts(amount + 1) : setAmounts(max);
    dispatch(setIncrease(id))
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  };

  return (
    <div className="cart_heading grid grid-five-column">
      <div className="cart-image--name">
        <div>
          <figure>
            <img src={image} alt={id} />
          </figure>
        </div>
        <div>
          <p>{name}</p>
          <div className="color-div">
            <p>color:</p>
            <p
              className="color-style"
              style={{ backgroundColor: color, color: color }}
            ></p>
          </div>
        </div>
      </div>
      {/* price   */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price} />
        </p>
      </div>

      {/* Quantity  */}
      <CartAmountToggle
        amount={amount}
        setDecrease={() => handleSetDecrease(id)}
        setIncrease={() => handleSetIncrease(id)}
      />

      {/* //Subtotal */}
      <div className="cart-hide">
        <p>
          <FormatPrice price={price * amount} />
        </p>
      </div>

      <div>
        <FaTrash className="remove_icon"
          onClick={() => handleRemoveItem(id)} 
          />
      </div>
    </div>
  );
};

export default CartItem;
