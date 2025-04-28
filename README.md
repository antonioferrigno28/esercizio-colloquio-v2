# Esercizio Colloquio – Guida all’installazione

Questa repository contiene il frontend sviluppato con Vite + React e un piccolo backend PHP/MySQL da eseguire in locale tramite XAMPP.

Prerequisiti

- Node.js ≥ 18.x
- XAMPP - 8.x (PHP 7 + MySQL 8)

## Clona il progetto

git clone https://github.com/antonioferrigno28/esercizio-colloquio-v2.git

## Configura il backend (XAMPP)

- Installa XAMPP ed avvia Apache + MySQL.

- Copia i file backend/db.php, backend/get-products.php, backend/get-orders.php e backend/save-order.php in una cartella di tua scelta all’interno di htdocs/ ad esempio: C:\xampp\htdocs\esercizio-colloquio\

- Importa il database MySQL dal file db.sql che trovi nella cartella backend/

- Crea un file .env

- Segui gli step contenuti nel file .env.example

- Aggiorna le credenziali nel file db.php se necessario:

#### Nota: assicurati che la cartella scelta corrisponda all’URL che imposterai nella variabile VITE_BACKEND_URL.

# Installa le dipendenze frontend

- npm install

#### Le dipendenze principali includono:

- bootstrap

- react-router-dom

#### Se hai bisogno di reinstallarle da zero, i comandi originali usati in fase di scaffolding sono:

- npm create vite@latest
- npm install
- npm i bootstrap
- npm i react-router-dom

# Avvia l’applicazione in sviluppo

#### npm run dev
