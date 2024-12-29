/* eslint-disable react/prop-types */
export default function CancelButton({ productId, orderedQuantity, onCancel }) {
  async function cancelItem() {
    try {
      const response = await fetch(`http://localhost:3000/api/products/cancel/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderedQuantity: 1,
          onlineOrder: 1,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        onCancel(data.data);
        alert('Order from Supplier Cancelled');
      } else {
        console.error('Cancel failed:', data.message);
        alert('Cancel failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  }

  return (
    <button
      className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      onClick={cancelItem}
      disabled={orderedQuantity === 0}
    >
      Cancel
    </button>
  );
}
