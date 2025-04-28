<?php
// Connessione al database tramite il file db.php
require 'db.php';

// Eseguiamo una query per ottenere tutti i prodotti
$query = "SELECT * FROM order_items";
$result = $conn->query($query);

// Recuperiamo i risultati
$ordini = $result->fetchAll(PDO::FETCH_ASSOC);

// Impostiamo l'header per il contenuto JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Restituiamo i risultati in formato JSON
echo json_encode($ordini);
