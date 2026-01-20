CREATE DATABASE IF NOT EXISTS RetailStore;
USE RetailStore;

-- Create Customers Table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(100)
);

-- Create Orders Table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    Product VARCHAR(100),
    Amount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Insert data into Customers Table
INSERT INTO Customers VALUES
(1, 'Rahul Sharma'),
(2, 'Anjali Mehta'),
(3, 'Amit Verma');

-- Insert data into Orders Table
INSERT INTO Orders VALUES
(101, 'Laptop', 50000.00, 2),
(102, 'Mouse', 500.00, 1),
(103, 'Keyboard', 700.00, 1);



select Customers.CustomerName, Orders.Product, Orders.Amount
FROM Customers
left join Orders ON Customers.CustomerID = Orders.CustomerID;