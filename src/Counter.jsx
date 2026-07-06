import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "./slice/cartslice";

const Counter = () => {
  const cartItems = useSelector((state)=>state.cart.items)
const dispatch=useDispatch()
  const total = cartItems.reduce(
    (sum, item) => sum + item.price ,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-5 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />

                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-gray-600">Description: {item.description}</p>
                  <button onClick={()=>dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-bold">
                  ₹{item.price }
                </p>
              </div>
               <button onClick={()=>dispatch(clearCart(item))} className="mt-6 w-30 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
        clear
        </button>
            </div>
            
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
             
          <h2 className="text-2xl font-bold">Total</h2>
          <p className="text-2xl font-bold text-green-600">₹{total}</p>
        </div>

        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Counter;