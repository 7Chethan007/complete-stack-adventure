CREATE DATABASE IF NOT EXISTS SimpleStore;
USE SimpleStore;

CREATE TABLE Sales (
    SalesID INT AUTO_INCREMENT PRIMARY KEY,
    Product VARCHAR(50),
    Category VARCHAR(50),
    Amount DECIMAL(10, 2),
    SaleDate DATE
);

INSERT INTO Sales (Product, Category, Amount, SaleDate) VALUES
('Pen', 'Stationary', 25.00, '2025-03-01'),
('Notebook', 'Stationary', 50.00, '2025-03-01'),
('Mouse', 'Electronics', 500.00, '2025-03-02'),
('Keyboard', 'Electronics', 700.00, '2025-03-02'),
('Charger', 'Electronics', 300.00, '2025-03-03'),
('Bag', 'Accessories', 1000.00, '2025-03-04');

Select count(*) from sales;

Select sum(Amount) from sales;

Select avg(Amount) from sales;

select min(Amount), max(Amount) from sales;

select Category, sum(Amount)
from sales
group by Category
having sum(Amount) > 1000;