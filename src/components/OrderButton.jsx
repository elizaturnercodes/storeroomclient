/* eslint-disable react/prop-types */
export default function OrderButton({ productId, onlineOrder, onOrder }) {
  async function orderItem() {
    try {
      const response = await fetch(`http://localhost:3000/api/products/order/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          onlineOrder: -1,
          orderedQuantity: 1,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        onOrder(data.data);
        alert('Item Ordered');
      } else {
        console.error('Order failed:', data.message);
        alert('Order failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return (
    <button
      className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={orderItem}
      disabled={onlineOrder === 0}
    >
      Order
    </button>
  );
}
