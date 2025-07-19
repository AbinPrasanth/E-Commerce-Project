import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 sm:p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-gray-50 border p-4 rounded-md shadow-md space-y-4 sm:space-y-0"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="text-sm font-semibold">{item.productName}</h2>
                    <p className="text-xs text-gray-500">₹{item.price}</p>
                    <div className="text-xs text-gray-500">{item.category}</div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-700">Size:{item.size}</p>
                </div>


                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-center space-x-2">
                  <button
                    onClick={() => decreaseQuantity(item.cartItemId)}
                    className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.cartItemId)}
                    className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                <div className="w-full sm:w-auto flex justify-end">
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="px-4 py-2 rounded border hover:border-gray-500 bg-black text-white
          hover:bg-white hover:text-black transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-8">
              <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
              <div className="flex flex-wrap gap-4 mt-4">
                <button
                  onClick={() => navigate('/checkout')}
                  className="px-6 py-2 rounded border hover:border-gray-500 bg-black text-white
          hover:bg-white hover:text-black transition-all duration-200 "
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;