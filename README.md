# nodejs-shop

## Overview

This is a small demo e-commerce app built with **Express** (server + routing), **EJS** (views), and **Sequelize** (MySQL persistence).

It supports:

- Browsing products (list + details)
- Adding/removing products in a cart
- Creating orders from the cart
- Admin CRUD for products

## Requirements

- Node.js
- A running **MySQL** (or MySQL-compatible, e.g. MariaDB) server

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create the MySQL database used by the app.

   In `util/database.js`, the Sequelize instance connects to a database named `node`, so create it:

   ```sql
   CREATE DATABASE node;
   ```

3. Configure MySQL credentials

   Edit `util/database.js`:
   - database name
   - username/password
   - host (currently `127.0.0.1`)

4. Start the server:

   ```
   npm start
   ```

   The server calls `sequelize.sync()` and ensures user/cart initialization (it creates `User` id `1` if missing, then creates a cart).

## MySQL / MariaDB Setup Notes

### Starting MySQL (WSL / Ubuntu)

If you're running this on **WSL** (Windows Subsystem for Linux), MySQL does not start automatically — there's no systemd by default, so you need to start it manually each session:

```bash
sudo service mysql start
sudo service mysql status
```

### Connecting to check the database

```bash
mysql -u root -p
```

```sql
USE node;
SHOW TABLES;
SELECT * FROM Users;
SELECT * FROM Carts;
```

You should see tables matching the Sequelize models (`Users`, `Carts`, `Products`, `CartItems`, `Orders`, `OrderItems`), and one seeded `User`/`Cart` row (id `1`) after the app's first successful run.

## Main Routes

### Shop

- `GET /` - Shop index
- `GET /products` - Product list
- `GET /products/:productId` - Product detail
- `GET /cart` - View cart
- `POST /cart` - Add a product to cart (`productId` in the form body)
- `POST /cart-delete-item` - Remove a product from cart (`productId` in the form body)
- `POST /create-order` - Create an order from the current cart
- `GET /orders` - View orders

### Admin

- `GET /admin/add-product` - Add product form
- `POST /admin/add-product` - Create product
- `GET /admin/products` - Admin product list
- `GET /admin/edit-product/:productId?edit=true` - Edit product form
- `POST /admin/edit-product` - Update product
- `POST /admin/delete-product` - Delete product

## Data Model (Sequelize)

- `User` has **one** `Cart`
- `Cart` and `Product` are connected via `CartItem` (stores `quantity`)
- `Order` and `Product` are connected via `OrderItem` (stores `quantity`)

## Static Assets

The app serves static files from `public/`:

- CSS: `public/css/*` (including `main.css`, `product.css`, `forms.css`)
- JS: `public/js/main.js`
