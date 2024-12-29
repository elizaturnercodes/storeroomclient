/* eslint-disable react/prop-types */
export default function ReceivedButton({ productId, orderedQuantity, onReceive }) {
  async function receiveItem() {
    try {
      const response = await fetch(`https://storeroomserver.vercel.app/api/products/receive/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderedQuantity: 1,
          inStore: 1,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        onReceive(data.data);
        alert('Order Received');
      } else {
        console.error('Receive failed:', data.message);
        alert('Receive failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return (
    <button
      className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={receiveItem}
      disabled={orderedQuantity === 0}
    >
      Receive Order
    </button>
  );
}
