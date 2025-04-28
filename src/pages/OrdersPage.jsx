import React, { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // funzione per recuperare gli ordini dal backend
  const fetchOrders = () => {
    fetch(`${backendUrl}get-orders.php`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  // al caricamento della pagina recupera gli ordini
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h1 className="mb-4 text-primary-emphasis fw-bold text-center">
        Lista degli ordini
      </h1>
      {/* Card per i sommari degli ordini */}
      <div className="row g-4">
        {orders.map((order) => (
          <div className="col-12 col-md-6 col-lg-4" key={order.order_id}>
            <div className="card h-100 shadow-lg rounded-3 border-0">
              <div className="card-body d-flex justify-content-between h-100 flex-column text-center">
                <div>
                  <h5 className="card-title mb-2 text-uppercase text-muted fw-semibold">
                    Ordine n. {order.order_id}
                  </h5>
                </div>
                <div className="card-text-wrapper d-flex align-items-center flex-grow-1 overflow-auto ">
                  <p className=" text-muted">{order.summary}</p>
                </div>
                {order.total > 0 && (
                  <h5 className="card-title mb-2 text-uppercase text-primary fw-semibold">
                    Subtotale € {order.total.toFixed(2)}
                  </h5>
                )}
                <h5 className="card-title mb-2 text-uppercase text-success fw-semibold">
                  Totale €
                  {order.total > 100
                    ? (order.total * 0.9).toFixed(2)
                    : order.total.toFixed(2)}
                </h5>
                <div>
                  <p className="card-text text-muted">
                    <b>Ordinato il:</b> {order.created_at}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
