<?php
// Connessione al database tramite il file db.php
require 'db.php';

// Eseguiamo una query per ottenere tutti gli ordini
$query = "SELECT 
    orders.id AS order_id,
    orders.total AS total,
    orders.created_at,
    GROUP_CONCAT(
        CONCAT(
            products.name, ' (Quantità: ', order_items.quantity, ')'
        )
        SEPARATOR ' | '
    ) AS summary
FROM 
    orders
JOIN 
    order_items ON orders.id = order_items.order_id
JOIN 
    products ON order_items.product_id = products.id
GROUP BY 
    orders.id, orders.total, orders.created_at
ORDER BY 
    orders.created_at DESC;
";
$result = $conn->query($query);

// Recuperiamo i risultati
$ordini = $result->fetchAll(PDO::FETCH_ASSOC);

// Impostiamo l'header per il contenuto JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Restituiamo i risultati in formato JSON
echo json_encode($ordini);
