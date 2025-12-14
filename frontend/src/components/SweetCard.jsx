import API from "../services/api";

export default function SweetCard({ sweet, refresh }) {
  const buy = async () => {
    await API.post(`/sweets/${sweet.id}/purchase`, { quantity: 1 });
    refresh();
  };

  return (
    <div className="card">
      <h3>{sweet.name}</h3>
      <p>{sweet.category}</p>
      <p>₹{sweet.price}</p>
      <p>Stock: {sweet.quantity}</p>
      <button disabled={sweet.quantity === 0} onClick={buy}>
        Purchase
      </button>
    </div>
  );
}
