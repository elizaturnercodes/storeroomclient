/* eslint-disable react/prop-types */
import OrderButton from '../components/OrderButton';
import ReceivedButton from '../components/ReceivedButton';
import CancelButton from '../components/CancelButton';

export default function Product({ product, onOrder, onReceive, onCancel }) {
  return (
    <>
      <li className="mb-12">
        <img className="aspect-square object-cover rounded mb-3" src={`/images/${product.imageUrl}`} alt={product.productName} width="300" />
        <h2 className="font-bold">{product.productName}</h2>
        <p>SKU: {product.productSKU}</p>
        <p>Price: ${product.productPrice}</p>
        <p>In Store: {product.inStore}</p>
        <p>Order from Supplier: {product.onlineOrder}</p>
        <p>On Order: {product.orderedQuantity}</p>
        <div className="flex gap-3 my-3">
          <OrderButton productId={product._id} onlineOrder={product.onlineOrder} onOrder={onOrder} />
          <ReceivedButton productId={product._id} orderedQuantity={product.orderedQuantity} onReceive={onReceive} />
          <CancelButton productId={product._id} orderedQuantity={product.orderedQuantity} onCancel={onCancel} />
        </div>
      </li>
    </>
  );
}
