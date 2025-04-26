<?php
$host = 'localhost';
$dbname = 'esercizio';
$user = 'root';
$pass = '';

// Creiamo una connessione PDO al database
$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

// Impostiamo il comportamento di errore per l'eccezione
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
