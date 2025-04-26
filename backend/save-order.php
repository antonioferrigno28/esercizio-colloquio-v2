<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php'; // Connessione al database tramite PDO

// Ricevi i dati dalla richiesta
$data = json_decode(file_get_contents("php://input"), true);

// Verifica che i dati siano validi
if (!$data) {
    echo json_encode(["success" => false, "error" => "Dati JSON non validi"]);
    exit;
}

// Estrai i dati
$cart = $data['cart'] ?? null;
$total = $data['total'] ?? null;

// Verifica che i dati necessari siano presenti
if (!$cart || !$total) {
    echo json_encode(["success" => false, "error" => "Campi mancanti"]);
    exit;
}

// Inserisci l'ordine nella tabella orders
$sql = "INSERT INTO orders (total) VALUES ($total)";
$conn->query($sql);
$order_id = $conn->lastInsertId(); // Ottieni l'ID dell'ordine appena inserito

// Inserisci i prodotti nella tabella order_items
foreach ($cart as $item) {
    $product_id = $item['id'];
    $quantity = $item['quantity'];

    // Salva il prodotto nel database
    $sql = "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($order_id, $product_id, $quantity)";
    $conn->query($sql);

    // Aggiorna la quantità nel catalogo
    $sql = "UPDATE products SET quantity = quantity - $quantity WHERE id = $product_id";
    $conn->query($sql);
}

// Rispondi con successo
echo json_encode(["success" => true]);
