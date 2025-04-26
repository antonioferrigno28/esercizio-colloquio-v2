import React from "react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isDiscounted, setDiscounted] = useState(false);
  const [orderData, setOrderData] = useState({ cart: [], total: 0 });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // FASE DI CARICAMENTO

  const reloadProducts = () => {
    //Chiamata fetch per caricare i prodotti dal server
    fetch(`${backendUrl}get-products.php`)
      .then((response) => response.json())
      //Parse JSON e aggiungi la proprietà initialQuantity
      //per tenere traccia della quantità iniziale
      .then((data) => {
        const productsWithInitialQuantity = data.map((product) => ({
          ...product,
          initialQuantity: product.quantity,
        }));
        //Setta i prodotti nello stato
        setProducts(productsWithInitialQuantity);
      })
      .catch((err) => console.error("Errore nel caricamento prodotti:", err));
  };

  //Carica i prodotti all'avvio dell'app
  useEffect(() => {
    //richiama la funzione per caricare i prodotti
    reloadProducts();
  }, []);

  //CALCOLO DEL TOTALE

  const calculateTotal = (cart) => {
    return cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  };

  //CALCOLO DEL TOTALE CON SCONTO
  const getTotalWithDiscount = () => {
    //Richiama la funzione per calcolare il totale e lo salva in una variabile
    let total = calculateTotal(cart);
    //se il totale è maggiore di 100, applica lo sconto del 10%
    if (isDiscounted) {
      total *= 0.9;
    }
    //Restituisce il totale formattato con 2 decimali
    return total.toFixed(2);
  };

  //All'aggiornamento del carrello, calcola il totale e controlla se applicare lo sconto
  //e salva i dati dell'ordine, carrello e totale
  useEffect(() => {
    const total = calculateTotal(cart);
    if (total > 100) {
      setDiscounted(true);
    } else {
      setDiscounted(false);
    }
    setOrderData({ cart, total });
  }, [cart]);

  //FUNZIONE PER AGGIUNGERE PRODOTTI AL CARRELLO CHE PRENDE IN INPUT UN PRODOTTO E UNA QUANTITÀ
  const addToCart = (product, quantity) => {
    //Controlla se il prodotto è già presente nel carrello comparando gli ID
    //item.id si riferisce all'id del prodotto nel carrello mentre product.id è l'id del prodotto da aggiungere
    const existing = cart.find((item) => item.id === product.id);

    //Aggiorna lo stato del carrello
    setCart((prev) => {
      //se il prodotto è già presente nel carrello, fa una copia dell'oggetto e aggiorna la quantità
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? //quantità del prodotto nel carrello + quantità del prodotto da aggiungere
              { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        //se il prodotto non è presente nel carrello, aggiungilo
        return [...prev, { ...product, quantity }];
      }
    });

    //Aggiorna la quantità del prodotto nella lista dei prodotti
    setProducts((prev) =>
      //Trova il prodotto dalla lista dei prodotti e aggiorna la quantità sottraendo la quantità aggiunta al carrello
      prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity - quantity }
          : item
      )
    );
  };

  //FUNZIONE PER RIMUOVERE UN PRODOTTO DAL CARRELLO CHE PRENDE IN INPUT L'ID DEL PRODOTTO
  const removeFromCart = (itemToRemoveId) => {
    //Salva in una variabile il prodotto da rimuovere
    const itemToRemove = cart.find((item) => item.id === itemToRemoveId);

    //Aggiorna lo stato dei prodotti nel catalogo
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        //Controlla se l'id del prodotto è uguale all'id del prodotto da rimuovere
        //Se è uguale, aggiorna la quantità del prodotto nel catalogo
        product.id === itemToRemoveId
          ? { ...product, quantity: product.quantity + itemToRemove.quantity }
          : product
      )
    );

    //Aggiorna lo stato del carrello rimuovendo il prodotto
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== itemToRemoveId)
    );
  };

  //FUNZIONE PER EFFETTUARE L'ORDINE CHE PRENDE IN INPUT I DATI DELL'ORDINE
  const handleOrder = () => {
    fetch(`${backendUrl}save-order.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //Invia i dati dell'ordine al server in formato JSON
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        //Controlla se la risposta del server è positiva
        //Se è positiva, mostra un messaggio di successo, resetta lo stato dello sconto e svuota il carrello e ricarica i prodotti con la qunatità aggiornata
        //Se è negativa, mostra un messaggio di errore

        if (data.success) {
          setCart([]);
          reloadProducts();
          setDiscounted(false);
          // Dopo l'invio dell'ordine, apri la modale di conferma finale
          setShowSuccessMessage(true);
          setTimeout(() => setShowSuccessMessage(false), 5000);
        } else {
          //altrimenti mostra un messaggio di errore
          setShowErrorModal(true);
        }
      });
  };

  return (
    <>
      {showSuccessMessage && (
        <div
          className="alert alert-success py-5 text-center fw-semibold rounded-0"
          role="alert"
        >
          Il tuo ordine è stato effettuato con successo! Grazie per aver
          acquistato.
        </div>
      )}

      <div className="container py-2">
        <h1 className="mb-3 text-primary-emphasis fw-bold ">
          Catalogo Prodotti
        </h1>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card product-card h-100 border-0 shadow-sm">
                <div className="product-img-wrapper">
                  <img
                    src={
                      product.image ||
                      "https://www.horizonplant.com/wp-content/uploads/2017/05/placeholder-400x400.png"
                    }
                    alt={product.name}
                    className="card-img-top product-img"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{product.name}</h5>
                  <p className="card-text fs-6 text-dark fw-bold">
                    €{Number(product.price).toFixed(2)}
                  </p>
                  <span
                    className={
                      "badge bg-light mb-3 border " +
                      (product.quantity <= 0 ? "text-danger" : "text-dark")
                    }
                  >
                    {product.quantity > 0
                      ? product.quantity
                      : "Non disponibile"}
                  </span>
                  <button
                    className={
                      "btn mt-auto fw-semibold " +
                      (product.quantity <= 0
                        ? "btn-danger text-white"
                        : "btn-warning text-dark")
                    }
                    disabled={product.quantity === 0}
                    onClick={() => addToCart(product, 1)}
                  >
                    🛒 Aggiungi al carrello
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="mt-5 mb-3 text-primary-emphasis fw-bold border-bottom pb-2">
          Carrello
        </h1>
        <div className="row">
          {cart.map((product) => (
            <div key={product.id} className="col-12 mb-3">
              <div className="d-flex border rounded shadow-sm p-3 align-items-center gap-3 flex-wrap">
                <img
                  src={
                    product.image ||
                    "https://www.horizonplant.com/wp-content/uploads/2017/05/placeholder-400x400.png"
                  }
                  alt={product.name}
                  className="img-thumbnail cart-img"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <div className="flex-grow-1">
                  <h5 className="mb-1 fw-semibold">{product.name}</h5>
                  <p className="mb-1 text-muted small">
                    Disponibilità immediata
                  </p>
                  <div className="d-flex align-items-center gap-3 flex-wrap">
                    <span className="fw-bold text-dark fs-6">
                      €{Number(product.price).toFixed(2)}
                    </span>
                    <div className="input-group input-group-sm w-auto">
                      <span className="input-group-text">Qty</span>
                      <input
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        min={1}
                        max={product.initialQuantity}
                        onChange={(e) =>
                          addToCart(
                            product,
                            parseInt(e.target.value) - product.quantity
                          )
                        }
                      />
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => removeFromCart(product.id)}
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>

                <div className="text-end">
                  <p className="text-muted fst-italic mb-1">
                    Prezzo al pezzo: €{product.price}
                  </p>
                  <p className="fw-semibold mb-0">
                    Subtotale: €{(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-1">
          Totale ordine {isDiscounted ? "con il 10% di sconto" : ""}:{" "}
          <span className={"text-success"}>€{getTotalWithDiscount()}</span>
        </h3>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-success btn-animation btn-green fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#orderModal"
            disabled={cart.length === 0}
          >
            Conferma Ordine
          </button>
          <button
            className="btn btn-danger btn-animation btn-red fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#clearCartModal"
            disabled={cart.length === 0}
          >
            Svuota carrello
          </button>
        </div>

        {/* Modale di conferma ordine */}
        <div
          className="modal fade"
          id="orderModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold" id="orderModalLabel">
                  Conferma Ordine
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Sei sicuro di voler confermare l'ordine?</p>
                <p className="fw-semibold">
                  Totale{isDiscounted ? " con il 10% di sconto" : ""}: €
                  {getTotalWithDiscount()}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary btn-animation btn-grey fw-semibold"
                  data-bs-dismiss="modal"
                >
                  Annulla
                </button>
                <button
                  className="btn btn-success btn-animation btn-green fw-semibold"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleOrder(); // Esegui la funzione di invio ordine
                  }}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modale di conferma svuotamento carrello */}

        <div
          className="modal fade"
          id="clearCartModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">
                  Conferma Svuotamento Carrello
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Sei sicuro di voler svuotare il carrello?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary btn-animation btn-grey fw-semibold"
                  data-bs-dismiss="modal"
                >
                  Annulla
                </button>
                <button
                  className="btn btn-danger btn-animation btn-red fw-semibold"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setCart([]);
                    reloadProducts();
                    setDiscounted(false);
                  }}
                >
                  Svuota
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modale di errore ordine */}

        {showErrorModal && (
          <div
            className="modal fade"
            id="errorModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-semibold">
                    Errore nell'Ordine
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>C'è stato un errore nell'invio dell'ordine al server</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-danger btn-animation btn-red fw-semibold"
                    data-bs-dismiss="modal"
                  >
                    Capisco
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
