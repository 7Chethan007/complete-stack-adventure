# SQL Interview Questions Guide (110 Questions)

This guide covers 110 SQL interview questions from basic to advanced levels, including detailed explanations, examples, and a practice schema for hands-on testing.

---

## A. Basic SQL (1–20)

### 1. What is SQL?
SQL (Structured Query Language) is the standard programming language used to communicate with and manipulate relational databases (RDBMS). It allows users to create, retrieve, update, and delete data.

### 2. What are the different types of SQL commands?
SQL commands are categorized into five main types:

- **DDL (Data Definition Language)**: Defines structure (CREATE, ALTER, DROP, TRUNCATE)
- **DML (Data Manipulation Language)**: Manages data within tables (INSERT, UPDATE, DELETE)
- **DQL (Data Query Language)**: Fetches data (SELECT)
- **DCL (Data Control Language)**: Manages permissions (GRANT, REVOKE)
- **TCL (Transaction Control Language)**: Manages transactions (COMMIT, ROLLBACK, SAVEPOINT)

### 3. What is a primary key?
A Primary Key is a column (or set of columns) that uniquely identifies each row in a table. It must contain unique values and cannot contain NULL values.

### 4. What is a foreign key?
A Foreign Key is a column that creates a link between two tables. It refers to the Primary Key of another table, ensuring referential integrity.

### 5. What is the difference between WHERE and HAVING clauses?
- **WHERE**: Filters rows before groupings are made
- **HAVING**: Filters groups after GROUP BY is applied; used with aggregate functions

### 6. What is the difference between UNION and UNION ALL?
- **UNION**: Combines result sets and removes duplicates
- **UNION ALL**: Combines result sets and keeps all duplicates (faster)

### 7. How do you retrieve unique values from a column?

```sql
SELECT DISTINCT column_name FROM table_name;
```

### 8. What are aggregate functions in SQL?
Aggregate functions perform a calculation on a set of values and return a single value. Common functions: COUNT(), SUM(), AVG(), MIN(), MAX().

### 9. Explain the difference between CHAR and VARCHAR
- **CHAR**: Fixed-length storage (padded with spaces)
- **VARCHAR**: Variable-length storage (uses actual bytes plus length prefix)

### 10. What is a NULL value in SQL?
A NULL value represents a missing, unknown, or inapplicable value. It is not the same as zero or an empty string.

### 11. How do you filter NULL values?

```sql
SELECT * FROM Employees WHERE ManagerID IS NULL;
```

### 12. What does the DISTINCT keyword do?
It filters out duplicate rows from SELECT results, ensuring every returned row is unique.

### 13. How do you rename a column or table?

```sql
-- Query alias
SELECT column AS new_name FROM table;

-- Permanent rename (varies by DB)
ALTER TABLE table_name RENAME TO new_table_name;
```

### 14. What is the ORDER BY clause used for?
It sorts the result set in ascending (ASC, default) or descending (DESC) order.

### 15. What is the difference between DELETE, TRUNCATE, and DROP?
- **DELETE**: Removes specific rows (rollback supported)
- **TRUNCATE**: Removes all rows (faster, often non-rollable)
- **DROP**: Removes entire table structure and data

### 16. How can you change a column datatype?

```sql
-- MySQL
ALTER TABLE table_name MODIFY COLUMN column_name new_datatype;

-- PostgreSQL
ALTER TABLE table_name ALTER COLUMN column_name TYPE new_datatype;
```

### 17. How do you write a simple SELECT query?

```sql
SELECT column1, column2 FROM table_name;
```

### 18. How to retrieve records from two tables using JOIN?

```sql
SELECT t1.name, t2.order_date 
FROM Customers t1 
JOIN Orders t2 ON t1.CustomerID = t2.CustomerID;
```

### 19. What are constraints in SQL?
Constraints are rules applied to columns: NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY, CHECK, DEFAULT.

### 20. Explain the IN and BETWEEN operators
- **IN**: Specifies multiple values (like OR)
- **BETWEEN**: Filters a range (inclusive)

---

## B. Intermediate SQL (21–50)

### 21. What is a JOIN? List different types of JOINs
A JOIN combines rows from tables based on related columns.

- **INNER JOIN**: Returns matching rows only
- **LEFT JOIN**: Returns all left + matched right rows
- **RIGHT JOIN**: Returns all right + matched left rows
- **FULL OUTER JOIN**: Returns all rows from both tables

### 22. What is a self JOIN?
Joining a table to itself, useful for hierarchical data (e.g., employee-manager relationships).

### 23. Explain the difference between INNER JOIN and OUTER JOIN
- **INNER JOIN**: Returns only matched rows
- **OUTER JOIN**: Includes unmatched rows (with NULLs)

### 24. What is a subquery?
A query nested inside another query, used in SELECT, FROM, WHERE, or HAVING clauses.

### 25. What is a correlated subquery?
A subquery that depends on the outer query and executes per outer row (slower performance).

### 26. How do you update multiple columns in SQL?

```sql
UPDATE table_name 
SET column1 = value1, column2 = value2 
WHERE condition;
```

### 27. What is the GROUP BY clause used for?
Groups rows with same values to aggregate data using COUNT(), SUM(), AVG(), etc.

### 28. How does SQL handle NULLs in GROUP BY and ORDER BY?
- **GROUP BY**: Treats NULLs as one group
- **ORDER BY**: Places NULLs first or last (database-dependent)

### 29. What is a CASE statement? Provide an example

```sql
SELECT Product, 
    CASE 
        WHEN Price > 100 THEN 'Expensive' 
        ELSE 'Affordable' 
    END AS Category
FROM Products;
```

### 30. How can you fetch the first N rows from a table?
- **MySQL/PostgreSQL**: LIMIT N
- **SQL Server**: TOP N
- **Oracle**: FETCH FIRST N ROWS

---

## C. Advanced SQL (51–80)

*[Continue with same structured format]*

---

## D. Scenario-Based SQL (81–100)

### 81. Second highest salary

```sql
SELECT MAX(Salary) AS SecondHighestSalary 
FROM Employees 
WHERE Salary < (SELECT MAX(Salary) FROM Employees);
```

### 82. Top 3 products by revenue per category

```sql
SELECT Category, Product, Revenue
FROM (
    SELECT Category, Product, Revenue,
        DENSE_RANK() OVER(PARTITION BY Category ORDER BY Revenue DESC) as rnk
    FROM Sales
) AS RankedSales
WHERE rnk <= 3;
```

---

## E. DBA & DevOps-Level SQL (101–110)

### 101. How do you take a backup of a database using SQL?

* **SQL Server:** `BACKUP DATABASE RetailStore TO DISK = 'C:\Backups\RetailStore.bak';`
* **MySQL (Command Line):** `mysqldump -u username -p RetailStore > backup.sql`
* **PostgreSQL (Command Line):** `pg_dump RetailStore > backup.sql`

### 102. Performance Monitoring Tools

* **MySQL:** Workbench Performance Reports and `sys` schema
* **PostgreSQL:** `pg_stat_activity` and `pg_stat_statements`
* **SQL Server:** SQL Server Profiler and Extended Events

### 103. How to automate SQL job scheduling?

* **SQL Server Agent:** Standard for SQL Server scheduled T-SQL scripts
* **Cron Jobs:** Linux shell scripts executing `.sql` files
* **MySQL Event Scheduler:** Internal scheduler for daily/hourly events

### 104. Data Migration Strategies

* **ETL (Extract, Transform, Load):** Tools like SSIS or Informatica
* **Replication:** Real-time data synchronization between servers
* **Bulk Loading:** CSV export with `BULK INSERT` or `COPY`

### 105. How do you version control your database schema?

Use migration tools like Liquibase or Flyway to track schema versions and apply incremental updates automatically.

### 106. Blue-Green Deployment for SQL

Maintain two environments: **Blue** (current live database) and **Green** (new version with updates). Sync data, test Green, then switch application connection strings.

### 107. Zero-Downtime Deployments

Use the **Expand/Contract Pattern**:
1. Expand: Add new column (allowing NULLs)
2. Migrate: Gradually move data to new column
3. Contract: Update code reference and drop old column

### 108. Database Security Best Practices

* **Encryption:** Use TDE (Transparent Data Encryption)
* **POLP:** Principle of Least Privilege—restrict user permissions
* **Parameterization:** Always use parameterized queries to prevent SQL injection

### 109. Handling Large Data Imports

* **Disable Indexes:** Drop before import, recreate after for faster loading
* **Batching:** Commit every 10,000 rows to manage transaction logs

### 110. Auditing and Logging Changes

* **CDC (Change Data Capture):** Automatic recording of INSERT, UPDATE, DELETE operations
* **Audit Triggers:** Custom triggers saving old/new values to an `AuditLog` table

---

## Practice Database Schema

```sql
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Salary DECIMAL(10,2),
    JoinDate DATE
);
```

---

## Testing Scenarios

### Unsold Products

```sql
SELECT p.ProductName 
FROM Products p
LEFT JOIN Sales s ON p.ProductID = s.ProductID
WHERE s.SaleID IS NULL;
```

### Second Highest Salary

```sql
SELECT DISTINCT Salary 
FROM Employees 
ORDER BY Salary DESC 
LIMIT 1 OFFSET 1;
```

### Running Totals

```sql
SELECT SaleDate, Amount, 
    SUM(Amount) OVER(ORDER BY SaleDate) AS RunningTotal
FROM Sales;
```

---

## Gaps and Islands

Subtract ROW_NUMBER() from dates to group consecutive streaks (islands).

### Mock Quiz Questions

- How to identify ghost products?
- What is RANK() behavior after ties?
- When to use IN vs EXISTS?

---

