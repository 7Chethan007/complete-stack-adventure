# Top 20 SQL Interview Questions – Complete Professional Guide

**Source:** GeeksforGeeks "Top 20 SQL Interview Questions" Series  
**Database:** Oracle SQL (EMP, DEPT schema)  
**Updated:** Complete with Visual Join Diagrams & Normalization Theory  
**Format:** Professional README with Copyable SQL Code & Advanced Explanations

---

## Table of Contents

### Part 1: Fundamentals (Episodes 1-10)
1. [2nd Highest Salary (Ep-1)](#ep-1-2nd-highest-salary)
2. [Department Wise Highest Salary (Ep-2)](#ep-2-department-wise-highest-salary)
3. [Display Alternate Records (Ep-3)](#ep-3-display-alternate-records)
4. [Display Duplicate of a Column (Ep-4)](#ep-4-display-duplicate-of-a-column)
5. [Pattern Matching in SQL (Ep-5)](#ep-5-pattern-matching-in-sql)
6. [Pattern Searching in SQL-2 (Ep-6)](#ep-6-pattern-searching-in-sql-2)
7. [Display Nth Row in SQL (Ep-7)](#ep-7-display-nth-row-in-sql)
8. [Union vs Union All (Ep-8)](#ep-8-union-vs-union-all)
9. [Inner Join (Ep-9)](#ep-9-inner-join)
10. [Self Join (Ep-10)](#ep-10-self-join)

### Part 2: Advanced Joins & Queries (Episodes 11-20)
11. [Left Join (Ep-11)](#ep-11-left-join)
12. [Right Join (Ep-12)](#ep-12-right-join)
13. [Full Join (Ep-13)](#ep-13-full-join)
14. [Cross Join (Ep-14)](#ep-14-cross-join)
15. [Display 1st or Last Nth Rows (Ep-15)](#ep-15-display-1st-or-last-nth-rows)
16. [Nth Highest Salary (Ep-16)](#ep-16-nth-highest-salary)
17. [Intersect in SQL (Ep-17)](#ep-17-intersect-in-sql)
18. [Minus in SQL (Ep-18)](#ep-18-minus-in-sql)
19. [First Normal Form (Ep-19)](#ep-19-first-normal-form)

---

## DATABASE SCHEMA

### EMP Table

```sql
CREATE TABLE emp (
  empno    NUMBER PRIMARY KEY,
  ename    VARCHAR2(10),
  job      VARCHAR2(9),
  mgr      NUMBER,
  hiredate DATE,
  sal      NUMBER(7,2),
  comm     NUMBER(7,2),
  deptno   NUMBER(2)
);
```

**Sample Data:**

| EMPNO | ENAME  | JOB       | MGR  | HIREDATE  | SAL  | COMM | DEPTNO |
|-------|--------|-----------|------|-----------|------|------|--------|
| 7839  | KING   | PRESIDENT | NULL | 17-NOV-81 | 5000 | NULL | 10     |
| 7698  | BLAKE  | MANAGER   | 7839 | 01-MAY-81 | 2850 | NULL | 30     |
| 7782  | CLARK  | MANAGER   | 7839 | 09-JUN-81 | 2450 | NULL | 10     |
| 7566  | JONES  | MANAGER   | 7839 | 02-APR-81 | 2975 | NULL | 20     |
| 7788  | SCOTT  | ANALYST   | 7566 | 19-APR-87 | 3000 | NULL | 20     |
| 7902  | FORD   | ANALYST   | 7566 | 03-DEC-81 | 3000 | NULL | 20     |
| 7369  | SMITH  | CLERK     | 7902 | 17-DEC-80 | 800  | NULL | 20     |
| 7934  | MILLER | CLERK     | 7782 | 23-JAN-82 | 1300 | NULL | 10     |

### DEPT Table

```sql
CREATE TABLE dept (
  deptno NUMBER(2) PRIMARY KEY,
  dname  VARCHAR2(14),
  loc    VARCHAR2(13)
);
```

**Sample Data:**

| DEPTNO | DNAME      | LOC      |
|--------|------------|----------|
| 10     | ACCOUNTING | NEW YORK |
| 20     | RESEARCH   | DALLAS   |
| 30     | SALES      | CHICAGO  |
| 40     | OPERATIONS | BOSTON   |

---

---

# PART 1: FUNDAMENTALS (Episodes 1-10)

---

## EP-1: 2nd Highest Salary

### Question

Display the 2nd highest salary from the `EMP` table.

### SQL Query

```sql
SELECT MAX(sal)
FROM emp
WHERE sal < (SELECT MAX(sal) FROM emp);
```

### Sample Result

| MAX(SAL) |
|----------|
| 4000     |

### Explanation

**Subquery Step:**
```sql
(SELECT MAX(sal) FROM emp)
```
- Finds the maximum salary: 5000 (KING)

**Outer Query Step:**
```sql
WHERE sal < (SELECT MAX(sal) FROM emp)
```
- Filters all salaries less than 5000

**Final Step:**
```sql
SELECT MAX(sal)
```
- Gets maximum from remaining set: 4000

---

## EP-2: Department Wise Highest Salary

### Question

Display the maximum salary for each department.

### SQL Query

```sql
SELECT MAX(sal) AS max_salary,
       deptno
FROM emp
GROUP BY deptno;
```

### Sample Result

| MAX_SALARY | DEPTNO |
|-----------|--------|
| 5000      | 10     |
| 3000      | 20     |
| 2850      | 30     |

### Detailed Explanation

- `GROUP BY deptno`: Partitions rows by department
- `MAX(sal)`: Applied to each partition independently
- Aggregate functions work on grouped data only

---

## EP-3: Display Alternate Records

### Question

Display every 2nd row (alternate records) from the `EMP` table.

### SQL Query

```sql
SELECT *
FROM (
  SELECT ROWNUM rn, empno, ename, sal
  FROM emp
)
WHERE MOD(rn, 2) = 0;
```

### Sample Result

| RN | EMPNO | ENAME | SAL  |
|----|-------|-------|------|
| 2  | 7698  | BLAKE | 2850 |
| 4  | 7566  | JONES | 2975 |
| 6  | 7902  | FORD  | 3000 |

### How MOD Works

- `MOD(rn, 2) = 0` → even row numbers (2, 4, 6, ...)
- `MOD(rn, 2) = 1` → odd row numbers (1, 3, 5, ...)

---

## EP-4: Display Duplicate of a Column

### Question

Display employee names that appear more than once.

### SQL Query

```sql
SELECT ename, COUNT(*) AS cnt
FROM emp
GROUP BY ename
HAVING COUNT(*) > 1
ORDER BY COUNT(*) DESC;
```

### Sample Result

| ENAME | CNT |
|-------|-----|
| TRISH | 3   |
| RISHI | 2   |

### Explanation

- `GROUP BY ename`: Groups by name
- `HAVING COUNT(*) > 1`: Filters groups with duplicates
- `ORDER BY COUNT(*) DESC`: Most frequent first

---

## EP-5: Pattern Matching in SQL

### 5.1 Names Starting with 'M'

```sql
SELECT ename
FROM emp
WHERE ename LIKE 'M%';
```

**Pattern:** `'M%'` = starts with M

**Result:**

| ENAME  |
|--------|
| MARTIN |
| MILLER |

---

### 5.2 Names Ending with 'M'

```sql
SELECT ename
FROM emp
WHERE ename LIKE '%M';
```

**Pattern:** `'%M'` = ends with M

---

### 5.3 Names Containing 'M' Anywhere

```sql
SELECT ename
FROM emp
WHERE ename LIKE '%M%';
```

**Pattern:** `'%M%'` = M appears anywhere

---

### 5.4 Names NOT Containing 'M'

```sql
SELECT ename
FROM emp
WHERE ename NOT LIKE '%M%';
```

**Result:**

| ENAME |
|-------|
| JONES |
| SCOTT |
| FORD  |
| BLAKE |
| CLARK |

---

## EP-6: Pattern Searching in SQL-2

### 6.1 Exactly 4 Letters

```sql
SELECT ename
FROM emp
WHERE ename LIKE '____';
```

**Pattern:** `'____'` = exactly 4 characters

**Result:**

| ENAME |
|-------|
| KING  |
| FORD  |
| WARD  |

---

### 6.2 Second Letter is 'L'

```sql
SELECT ename
FROM emp
WHERE ename LIKE '_L%';
```

**Pattern:** `'_L%'` = any char, then L, then anything

**Result:**

| ENAME |
|-------|
| BLAKE |
| CLARK |
| ALLEN |

---

### 6.3 Fourth Letter is 'M'

```sql
SELECT ename
FROM emp
WHERE ename LIKE '___M%';
```

**Result:**

| ENAME |
|-------|
| ADAMS |

---

### 6.4 Employees Hired in December

```sql
SELECT hiredate, ename
FROM emp
WHERE hiredate LIKE '%DEC%';
```

**Result:**

| HIREDATE  | ENAME |
|-----------|-------|
| 03-DEC-81 | FORD  |
| 17-DEC-80 | SMITH |

---

### 6.5 Names with Exactly Two 'L's (Consecutive)

```sql
SELECT ename
FROM emp
WHERE ename LIKE '%LL%';
```

**Result:**

| ENAME  |
|--------|
| ALLEN  |
| MILLER |

---

## EP-7: Display Nth Row in SQL

### 7.1 Display Specific Rows (2, 3, 7)

```sql
SELECT *
FROM (
  SELECT ROWNUM AS r, emp.*
  FROM emp
)
WHERE r IN (2, 3, 7);
```

**Sample Result:**

| R | EMPNO | ENAME | JOB     | SAL  |
|---|-------|-------|---------|------|
| 2 | 7698  | BLAKE | MANAGER | 2850 |
| 3 | 7782  | CLARK | MANAGER | 2450 |
| 7 | 7369  | SMITH | CLERK   | 800  |

---

### 7.2 Display Only 4th Row

```sql
SELECT *
FROM (
  SELECT ROWNUM AS r, empno, ename, sal
  FROM emp
)
WHERE r = 4;
```

**Result:**

| R | EMPNO | ENAME | SAL  |
|---|-------|-------|------|
| 4 | 7566  | JONES | 2975 |

---

### 7.3 Display 2nd Row Using MINUS

```sql
SELECT *
FROM emp
WHERE ROWNUM <= 2
MINUS
SELECT *
FROM emp
WHERE ROWNUM = 1;
```

**Explanation:**
- First query: rows 1 and 2
- Second query: row 1 only
- MINUS removes row 1 → leaves row 2

---

## EP-8: Union vs Union All

### Theory: UNION and UNION ALL

#### UNION
- Combines results from multiple SELECT statements
- **Removes duplicate rows**
- Slower (requires sorting and deduplication)
- Each SELECT must have same number of columns with compatible data types

#### UNION ALL
- Combines results from multiple SELECT statements
- **Keeps all rows, including duplicates**
- Faster (no sorting)
- Each SELECT must have same number of columns with compatible data types

### UNION: Duplicate Removal

```sql
SELECT city FROM sample1
UNION
SELECT city FROM sample2;
```

**SAMPLE1:**

| CITY      |
|-----------|
| hyderabad |
| london    |
| texas     |

**SAMPLE2:**

| CITY       |
|------------|
| hyderabad  |
| bhutan     |
| california |

**Result (Duplicates Removed):**

| CITY       |
|------------|
| hyderabad  |
| london     |
| texas      |
| bhutan     |
| california |

---

### UNION ALL: Keep All Duplicates

```sql
SELECT city FROM sample1
UNION ALL
SELECT city FROM sample2;
```

**Result (All Rows):**

| CITY       |
|------------|
| hyderabad  |
| london     |
| texas      |
| hyderabad  |
| bhutan     |
| california |

---

### Comparison Table

| Aspect              | UNION | UNION ALL |
|---------------------|-------|-----------|
| Removes duplicates  | ✓ Yes | ✗ No      |
| Performance         | Slower| Faster    |
| Sorting             | Yes   | No        |
| Memory usage        | Higher| Lower     |

---

## EP-9: Inner Join

### Theory: INNER JOIN

**Definition:**
Returns rows that have matching values in **both** tables based on the join condition.

**Key Points:**
- Only matching rows are included
- Non-matching rows are excluded
- Most commonly used join type
- Can use old-style (comma-separated) or explicit `INNER JOIN` syntax

### 9.1 Department-wise Total Salary

```sql
SELECT d.dname,
       SUM(e.sal) AS total_salary
FROM emp e, dept d
WHERE e.deptno = d.deptno
GROUP BY d.dname;
```

**Result:**

| DNAME      | TOTAL_SALARY |
|------------|--------------|
| ACCOUNTING | 7450         |
| RESEARCH   | 9775         |
| SALES      | 2850         |

### Line-by-Line Explanation

```sql
FROM emp e, dept d
```
- `e` alias for emp (employees table)
- `d` alias for dept (departments table)

```sql
WHERE e.deptno = d.deptno
```
- **Join condition:** matches dept numbers
- This is what makes it an INNER JOIN

```sql
GROUP BY d.dname
```
- Groups results by department name
- One row per department

```sql
SUM(e.sal) AS total_salary
```
- Calculates total salary within each group

---

### 9.2 Employee Details with Department

```sql
SELECT e.ename,
       e.sal,
       d.deptno,
       d.dname,
       d.loc
FROM emp e, dept d
WHERE e.deptno = d.deptno;
```

**Result:**

| ENAME | SAL  | DEPTNO | DNAME      | LOC      |
|-------|------|--------|------------|----------|
| KING  | 5000 | 10     | ACCOUNTING | NEW YORK |
| BLAKE | 2850 | 30     | SALES      | CHICAGO  |
| CLARK | 2450 | 10     | ACCOUNTING | NEW YORK |
| JONES | 2975 | 20     | RESEARCH   | DALLAS   |
| SCOTT | 3000 | 20     | RESEARCH   | DALLAS   |
| FORD  | 3000 | 20     | RESEARCH   | DALLAS   |
| SMITH | 800  | 20     | RESEARCH   | DALLAS   |

---

### 9.3 Employees in Chicago Location

```sql
SELECT e.ename,
       e.sal,
       d.deptno,
       d.dname,
       d.loc
FROM emp e, dept d
WHERE e.deptno = d.deptno
  AND d.loc = 'CHICAGO';
```

**Result:**

| ENAME | SAL  | DEPTNO | DNAME | LOC     |
|-------|------|--------|-------|---------|
| BLAKE | 2850 | 30     | SALES | CHICAGO |

---

### 9.4 Visual Representation of INNER JOIN

```
EMP Table (Left)          DEPT Table (Right)
+-----------+             +----------+
| empno | d |             | d | dname|
| 7839  | 10|             | 10| ACC  |
| 7698  | 30|             | 20| RES  |
| 7782  | 10|             | 30| SAL  |
| 7566  | 20|             +----------+
| 7788  | 20|
| 7902  | 20|
| 7369  | 20|
| 7934  | 10|
+-----------+

INNER JOIN Result (Matching on deptno):
+-------+---------+----------+
| empno | deptno  | dname    |
+-------+---------+----------+
| 7839  | 10      | ACC      |
| 7698  | 30      | SAL      |
| 7782  | 10      | ACC      |
| 7566  | 20      | RES      |
| 7788  | 20      | RES      |
| 7902  | 20      | RES      |
| 7369  | 20      | RES      |
| 7934  | 10      | ACC      |
+-------+---------+----------+

All rows have matches → No NULL values
```

---

## EP-10: Self Join

### Theory: SELF JOIN

**Definition:**
Joins a table with itself to compare rows within the same table.

**Use Cases:**
- Employee-manager relationships
- Comparing hierarchical data
- Finding duplicates or related records in same table

**Key Points:**
- Same table used twice with different aliases
- Essential for hierarchical queries
- Can use any join type (INNER, LEFT, FULL)

### 10.1 Employee and Their Manager

```sql
SELECT e1.ename AS "employee",
       e2.ename AS "manager"
FROM emp e1, emp e2
WHERE e2.empno = e1.mgr;
```

**Result:**

| employee | manager |
|----------|---------|
| BLAKE    | KING    |
| CLARK    | KING    |
| JONES    | KING    |
| SCOTT    | JONES   |
| FORD     | JONES   |
| SMITH    | FORD    |

### Line-by-Line Explanation

```sql
FROM emp e1, emp e2
```
- `e1` represents the **employee** perspective
- `e2` represents the **manager** perspective
- Same table used twice

```sql
WHERE e2.empno = e1.mgr
```
- Manager's empno = Employee's mgr field
- Creates parent-child relationship

---

### 10.2 Employees Earning More Than Manager

```sql
SELECT e1.ename AS "employee",
       e2.ename AS "manager"
FROM emp e1, emp e2
WHERE e1.mgr = e2.empno
  AND e1.sal > e2.sal;
```

**Result:**

| employee | manager |
|----------|---------|
| SCOTT    | JONES   |
| FORD     | JONES   |

---

### 10.3 Employees Who Joined Before Manager

```sql
SELECT e1.ename AS "employee",
       e2.ename AS "manager",
       e2.sal AS "manager_salary",
       e2.hiredate
FROM emp e1, emp e2
WHERE e1.mgr = e2.empno
  AND e1.hiredate < e2.hiredate;
```

**Result:**

| employee | manager | manager_salary | HIREDATE   |
|----------|---------|----------------|------------|
| BLAKE    | KING    | 5000           | 17-NOV-81  |
| CLARK    | KING    | 5000           | 17-NOV-81  |
| JONES    | KING    | 5000           | 17-NOV-81  |
| SMITH    | FORD    | 3000           | 03-DEC-81  |

---

### 10.4 Visual: Self Join Diagram

```
EMP Table (used twice):

Original Table:
+-------+-------+-----+
| empno | ename | mgr |
+-------+-------+-----+
| 7839  | KING  | NULL|  ← No manager
| 7698  | BLAKE | 7839|  ← KING is manager
| 7782  | CLARK | 7839|  ← KING is manager
| 7566  | JONES | 7839|  ← KING is manager
| 7788  | SCOTT | 7566|  ← JONES is manager
| 7902  | FORD  | 7566|  ← JONES is manager
| 7369  | SMITH | 7902|  ← FORD is manager
+-------+-------+-----+

Self Join: e1.mgr = e2.empno
Result (Employee → Manager):

e1 (Employee)      e2 (Manager)
empno=7698,BLAKE   empno=7839,KING  ✓ Match
empno=7782,CLARK   empno=7839,KING  ✓ Match
empno=7566,JONES   empno=7839,KING  ✓ Match
empno=7788,SCOTT   empno=7566,JONES ✓ Match
empno=7902,FORD    empno=7566,JONES ✓ Match
empno=7369,SMITH   empno=7902,FORD  ✓ Match
empno=7839,KING    empno=NULL       ✗ No match (KING has no manager)
```

---

---

# PART 2: ADVANCED JOINS & QUERIES (Episodes 11-20)

---

## Comprehensive JOIN Theory

Before diving into individual join types, understand the fundamental join concepts:

### Join Categories

1. **INNER JOIN** - Only matching rows
2. **OUTER JOINS** - Include non-matching rows
   - LEFT JOIN
   - RIGHT JOIN
   - FULL JOIN
3. **CROSS JOIN** - Cartesian product

### When to Use Each Join

| Join Type | Use Case |
|-----------|----------|
| INNER JOIN | Need only matching records |
| LEFT JOIN | Keep all left table rows, match right where possible |
| RIGHT JOIN | Keep all right table rows, match left where possible |
| FULL JOIN | Keep all rows from both tables |
| CROSS JOIN | Generate all combinations |

---

## EP-11: Left Join

### Theory: LEFT JOIN (LEFT OUTER JOIN)

**Definition:**
Returns ALL rows from the **left table**, plus matching rows from the **right table**. Non-matching rows from right table show NULL.

**Key Points:**
- All left table rows are preserved
- Right table rows included only if join condition matches
- NULL values appear for non-matching rows from right table
- Also called LEFT OUTER JOIN

### 11.1 Basic Left Join

```sql
SELECT e.empno,
       e.ename,
       e.deptno,
       d.dname,
       d.loc
FROM emp e
LEFT JOIN dept d
ON e.deptno = d.deptno;
```

**Result:**

| EMPNO | ENAME  | DEPTNO | DNAME      | LOC      |
|-------|--------|--------|------------|----------|
| 7839  | KING   | 10     | ACCOUNTING | NEW YORK |
| 7782  | CLARK  | 10     | ACCOUNTING | NEW YORK |
| 7934  | MILLER | 10     | ACCOUNTING | NEW YORK |
| 7566  | JONES  | 20     | RESEARCH   | DALLAS   |
| 7788  | SCOTT  | 20     | RESEARCH   | DALLAS   |
| 7698  | BLAKE  | 30     | SALES      | CHICAGO  |

---

### 11.2 Left Join with Filter

```sql
SELECT e.empno,
       e.ename,
       e.deptno,
       d.dname,
       d.loc,
       e.job
FROM emp e
LEFT JOIN dept d
ON e.deptno = d.deptno
WHERE d.dname = 'SALES';
```

**Result:**

| EMPNO | ENAME  | DEPTNO | DNAME | LOC     | JOB      |
|-------|--------|--------|-------|---------|----------|
| 7654  | MARTIN | 30     | SALES | CHICAGO | SALESMAN |
| 7844  | TURNER | 30     | SALES | CHICAGO | SALESMAN |
| 7900  | JAMES  | 30     | SALES | CHICAGO | CLERK    |

---

### 11.3 Left Join Showing NULLs (Finding Non-Matches)

```sql
SELECT e.empno,
       e.ename,
       d.dname,
       d.loc
FROM emp e
LEFT JOIN dept d
ON e.deptno = d.deptno
WHERE d.dname IS NULL;
```

**Result:** Employees in non-existent departments

| EMPNO | ENAME | DNAME | LOC  |
|-------|-------|-------|------|
| NULL  | NULL  | NULL  | NULL |

---

### 11.4 Visual: Left Join Diagram

```
EMP Table (LEFT)           DEPT Table (RIGHT)
+-------+-------+---------+   +--------+--------+----------+
| empno | ename | deptno  |   | deptno | dname  | loc      |
+-------+-------+---------+   +--------+--------+----------+
| 7839  | KING  | 10      |   | 10     | ACC    | NEW YORK |
| 7698  | BLAKE | 30      |   | 20     | RES    | DALLAS   |
| 7782  | CLARK | 10      |   | 30     | SALES  | CHICAGO  |
| 7566  | JONES | 20      |   +--------+--------+----------+
| 7788  | SCOTT | 20      |
| 7902  | FORD  | 20      |
| 7369  | SMITH | 20      |
| 7934  | MILLER| 10      |
+-------+-------+---------+

LEFT JOIN ON e.deptno = d.deptno:

Result (ALL from LEFT, matching from RIGHT):
+-------+-------+---------+--------+----------+
| empno | ename | deptno  | dname  | loc      |
+-------+-------+---------+--------+----------+
| 7839  | KING  | 10      | ACC    | NEW YORK | ← Match
| 7782  | CLARK | 10      | ACC    | NEW YORK | ← Match
| 7934  | MILLER| 10      | ACC    | NEW YORK | ← Match
| 7698  | BLAKE | 30      | SALES  | CHICAGO  | ← Match
| 7566  | JONES | 20      | RES    | DALLAS   | ← Match
| 7788  | SCOTT | 20      | RES    | DALLAS   | ← Match
| 7902  | FORD  | 20      | RES    | DALLAS   | ← Match
| 7369  | SMITH | 20      | RES    | DALLAS   | ← Match
+-------+-------+---------+--------+----------+

Key: ALL left rows included, NULLs for non-matching right
```

---

## EP-12: Right Join

### Theory: RIGHT JOIN (RIGHT OUTER JOIN)

**Definition:**
Returns ALL rows from the **right table**, plus matching rows from the **left table**. Non-matching rows from left table show NULL.

**Key Points:**
- All right table rows are preserved
- Left table rows included only if join condition matches
- NULL values appear for non-matching rows from left table
- Opposite behavior of LEFT JOIN
- Also called RIGHT OUTER JOIN

### 12.1 Basic Right Join

```sql
SELECT e.empno,
       e.ename,
       e.deptno,
       d.deptno,
       d.dname,
       d.loc
FROM emp e
RIGHT JOIN dept d
ON e.deptno = d.deptno;
```

**Result:**

| EMPNO | ENAME  | DEPTNO | DEPTNO | DNAME      | LOC      |
|-------|--------|--------|--------|------------|----------|
| 7839  | KING   | 10     | 10     | ACCOUNTING | NEW YORK |
| 7782  | CLARK  | 10     | 10     | ACCOUNTING | NEW YORK |
| 7934  | MILLER | 10     | 10     | ACCOUNTING | NEW YORK |
| 7566  | JONES  | 20     | 20     | RESEARCH   | DALLAS   |
| 7788  | SCOTT  | 20     | 20     | RESEARCH   | DALLAS   |
| 7698  | BLAKE  | 30     | 30     | SALES      | CHICAGO  |
| NULL  | NULL   | NULL   | 40     | OPERATIONS | BOSTON   |

---

### 12.2 Finding Departments with No Employees

```sql
SELECT d.deptno,
       d.dname,
       d.loc,
       e.empno,
       e.ename
FROM emp e
RIGHT JOIN dept d
ON e.deptno = d.deptno
WHERE e.empno IS NULL;
```

**Result:** Departments with no employees

| DEPTNO | DNAME      | LOC    | EMPNO | ENAME |
|--------|------------|--------|-------|-------|
| 40     | OPERATIONS | BOSTON | NULL  | NULL  |

---

### 12.3 Visual: Right Join Diagram

```
EMP Table (LEFT)           DEPT Table (RIGHT)
+-------+-------+---------+   +--------+--------+----------+
| empno | ename | deptno  |   | deptno | dname  | loc      |
+-------+-------+---------+   +--------+--------+----------+
| 7839  | KING  | 10      |   | 10     | ACC    | NEW YORK |
| 7698  | BLAKE | 30      |   | 20     | RES    | DALLAS   |
| 7782  | CLARK | 10      |   | 30     | SALES  | CHICAGO  |
| 7566  | JONES | 20      |   | 40     | OPS    | BOSTON   |
| 7788  | SCOTT | 20      |   +--------+--------+----------+
| 7902  | FORD  | 20      |
| 7369  | SMITH | 20      |
| 7934  | MILLER| 10      |
+-------+-------+---------+

RIGHT JOIN ON e.deptno = d.deptno:

Result (matching from LEFT, ALL from RIGHT):
+-------+-------+---------+--------+----------+
| empno | ename | deptno  | dname  | loc      |
+-------+-------+---------+--------+----------+
| 7839  | KING  | 10      | ACC    | NEW YORK | ← Match
| 7782  | CLARK | 10      | ACC    | NEW YORK | ← Match
| 7934  | MILLER| 10      | ACC    | NEW YORK | ← Match
| 7698  | BLAKE | 30      | SALES  | CHICAGO  | ← Match
| 7566  | JONES | 20      | RES    | DALLAS   | ← Match
| 7788  | SCOTT | 20      | RES    | DALLAS   | ← Match
| 7902  | FORD  | 20      | RES    | DALLAS   | ← Match
| 7369  | SMITH | 20      | RES    | DALLAS   | ← Match
| NULL  | NULL  | NULL    | OPS    | BOSTON   | ← No match (Dept 40)
+-------+-------+---------+--------+----------+

Key: ALL right rows included, NULLs for non-matching left
```

---

## EP-13: Full Join

### Theory: FULL JOIN (FULL OUTER JOIN)

**Definition:**
Returns ALL rows from **both** tables. Combines results of LEFT JOIN and RIGHT JOIN.

**Key Points:**
- All rows from both tables are included
- NULL where join condition doesn't match
- Most comprehensive but slowest join
- Simulates LEFT JOIN UNION RIGHT JOIN
- Not supported in all databases (use UNION in MySQL)

### 13.1 Basic Full Join

```sql
SELECT e.empno,
       e.ename,
       e.deptno,
       d.deptno,
       d.dname,
       d.loc
FROM emp e
FULL JOIN dept d
ON e.deptno = d.deptno
ORDER BY e.deptno, d.deptno;
```

**Result:**

| EMPNO | ENAME  | DEPTNO | DEPTNO | DNAME      | LOC      |
|-------|--------|--------|--------|------------|----------|
| 7839  | KING   | 10     | 10     | ACCOUNTING | NEW YORK |
| 7782  | CLARK  | 10     | 10     | ACCOUNTING | NEW YORK |
| 7934  | MILLER | 10     | 10     | ACCOUNTING | NEW YORK |
| 7566  | JONES  | 20     | 20     | RESEARCH   | DALLAS   |
| 7788  | SCOTT  | 20     | 20     | RESEARCH   | DALLAS   |
| 7698  | BLAKE  | 30     | 30     | SALES      | CHICAGO  |
| NULL  | NULL   | NULL   | 40     | OPERATIONS | BOSTON   |

---

### 13.2 Finding All Unmatched Records

```sql
SELECT e.empno,
       e.ename,
       d.deptno,
       d.dname
FROM emp e
FULL JOIN dept d
ON e.deptno = d.deptno
WHERE e.empno IS NULL OR d.deptno IS NULL;
```

**Result:** Records without matches

| EMPNO | ENAME | DEPTNO | DNAME      |
|-------|-------|--------|------------|
| NULL  | NULL  | 40     | OPERATIONS |

---

### 13.3 Visual: Full Join Diagram

```
EMP Table (LEFT)           DEPT Table (RIGHT)
+-------+-------+---------+   +--------+--------+----------+
| empno | ename | deptno  |   | deptno | dname  | loc      |
+-------+-------+---------+   +--------+--------+----------+
| 7839  | KING  | 10      |   | 10     | ACC    | NEW YORK |
| 7698  | BLAKE | 30      |   | 20     | RES    | DALLAS   |
| 7782  | CLARK | 10      |   | 30     | SALES  | CHICAGO  |
| 7566  | JONES | 20      |   | 40     | OPS    | BOSTON   |
| 7788  | SCOTT | 20      |   +--------+--------+----------+
| 7902  | FORD  | 20      |
| 7369  | SMITH | 20      |
| 7934  | MILLER| 10      |
+-------+-------+---------+

FULL JOIN ON e.deptno = d.deptno:

Result (ALL from BOTH tables):
+-------+-------+---------+--------+----------+
| empno | ename | deptno  | dname  | loc      |
+-------+-------+---------+--------+----------+
| 7839  | KING  | 10      | ACC    | NEW YORK | ← Match
| 7782  | CLARK | 10      | ACC    | NEW YORK | ← Match
| 7934  | MILLER| 10      | ACC    | NEW YORK | ← Match
| 7698  | BLAKE | 30      | SALES  | CHICAGO  | ← Match
| 7566  | JONES | 20      | RES    | DALLAS   | ← Match
| 7788  | SCOTT | 20      | RES    | DALLAS   | ← Match
| 7902  | FORD  | 20      | RES    | DALLAS   | ← Match
| 7369  | SMITH | 20      | RES    | DALLAS   | ← Match
| NULL  | NULL  | NULL    | OPS    | BOSTON   | ← No left match
+-------+-------+---------+--------+----------+

Key: ALL rows from both tables, NULLs for non-matches
```

---

## EP-14: Cross Join

### Theory: CROSS JOIN (Cartesian Product)

**Definition:**
Creates a Cartesian product - every row from left table is combined with every row from right table.

**Key Points:**
- No join condition (no ON clause)
- Result size = rows(left) × rows(right)
- Can generate very large result sets
- Use with caution on large tables
- Useful for generating combinations or sequences

### 14.1 Basic Cross Join

```sql
SELECT e.ename,
       d.dname
FROM emp e
CROSS JOIN dept d
LIMIT 10;
```

**Sample Result (First 10 Rows):**

| ENAME | DNAME      |
|-------|------------|
| KING  | ACCOUNTING |
| KING  | RESEARCH   |
| KING  | SALES      |
| KING  | OPERATIONS |
| BLAKE | ACCOUNTING |
| BLAKE | RESEARCH   |
| BLAKE | SALES      |
| BLAKE | OPERATIONS |
| CLARK | ACCOUNTING |
| CLARK | RESEARCH   |

**Total Result Size:** 8 employees × 4 departments = 32 rows

---

### 14.2 Cross Join with Filter

```sql
SELECT e.empno,
       e.ename,
       d.deptno,
       d.dname
FROM emp e
CROSS JOIN dept d
WHERE e.deptno = d.deptno;
```

**Result:** (This is equivalent to INNER JOIN)

| EMPNO | ENAME | DEPTNO | DNAME      |
|-------|-------|--------|------------|
| 7839  | KING  | 10     | ACCOUNTING |
| 7782  | CLARK | 10     | ACCOUNTING |
| 7934  | MILLER| 10     | ACCOUNTING |
| (more rows...) |

---

### 14.3 Visual: Cross Join Diagram

```
EMP Table           DEPT Table
+-------+          +--------+
| ename |          | dname  |
+-------+          +--------+
| KING  |          | ACC    |
| BLAKE |          | RES    |
| CLARK |          | SALES  |
+-------+          +--------+

CROSS JOIN (All combinations):
+-------+--------+
| ename | dname  |
+-------+--------+
| KING  | ACC    |
| KING  | RES    |
| KING  | SALES  |
| BLAKE | ACC    |
| BLAKE | RES    |
| BLAKE | SALES  |
| CLARK | ACC    |
| CLARK | RES    |
| CLARK | SALES  |
+-------+--------+

Total: 3 employees × 3 departments = 9 combinations
```

---

## EP-15: Display 1st or Last Nth Rows

### Question

Display the first or last N rows from a table.

### 15.1 Display Last 2 Rows Using MINUS

```sql
SELECT *
FROM emp
MINUS
SELECT *
FROM emp
WHERE ROWNUM <= (SELECT COUNT(*) - 2 FROM emp);
```

**Sample Result:**

| EMPNO | ENAME | JOB    | MGR  | HIREDATE  | SAL  | DEPTNO |
|-------|-------|--------|------|-----------|------|--------|
| 7369  | SMITH | CLERK  | 7902 | 17-DEC-80 | 800  | 20     |
| 7902  | FORD  | ANALYST| 7566 | 03-DEC-81 | 3000 | 20     |

---

### 15.2 Display Last N Rows with Row Numbers

```sql
SELECT *
FROM (
  SELECT ROWNUM r, emp.*
  FROM emp
)
WHERE r > (SELECT COUNT(*) - 2 FROM emp);
```

**Sample Result:**

| R | EMPNO | ENAME | JOB    | SAL  |
|---|-------|-------|--------|------|
| 6 | 7902  | FORD  | ANALYST| 3000 |
| 7 | 7369  | SMITH | CLERK  | 800  |

---

### 15.3 Display First and Last N Rows

```sql
SELECT *
FROM (
  SELECT ROWNUM r, emp.*
  FROM emp
)
WHERE r > (SELECT COUNT(*) - 2 FROM emp)
   OR r IN (1, 2);
```

**Sample Result:**

| R | EMPNO | ENAME  | JOB       | SAL  |
|---|-------|--------|-----------|------|
| 1 | 7839  | KING   | PRESIDENT | 5000 |
| 2 | 7698  | BLAKE  | MANAGER   | 2850 |
| 6 | 7902  | FORD   | ANALYST   | 3000 |
| 7 | 7369  | SMITH  | CLERK     | 800  |

---

### 15.4 Display Odd-Numbered Rows

```sql
SELECT *
FROM (
  SELECT ROWNUM r, emp.*
  FROM emp
)
WHERE MOD(r, 2) = 1;
```

**Sample Result:**

| R | EMPNO | ENAME  | JOB       | SAL  |
|---|-------|--------|-----------|------|
| 1 | 7839  | KING   | PRESIDENT | 5000 |
| 3 | 7782  | CLARK  | MANAGER   | 2450 |
| 5 | 7788  | SCOTT  | ANALYST   | 3000 |
| 7 | 7369  | SMITH  | CLERK     | 800  |

---

## EP-16: Nth Highest Salary

### Question

Find the Nth highest salary without using LIMIT or TOP (for different N values).

### 16.1 2nd Highest Salary

```sql
SELECT MAX(sal)
FROM emp
WHERE sal < (SELECT MAX(sal) FROM emp);
```

**Result:**

| MAX(SAL) |
|----------|
| 4000     |

---

### 16.2 3rd Highest Salary

```sql
SELECT MAX(sal)
FROM emp
WHERE sal < (
  SELECT MAX(sal)
  FROM emp
  WHERE sal < (SELECT MAX(sal) FROM emp)
);
```

---

### 16.3 Nth Highest (General Solution with Row Numbers)

```sql
SELECT *
FROM (
  SELECT sal,
         ROW_NUMBER() OVER (ORDER BY sal DESC) AS rn
  FROM emp
)
WHERE rn = 3;
```

**Result:** 3rd highest salary

| SAL  | RN |
|------|-----|
| 3000 | 3   |

---

### 16.4 Top N Salaries with Employee Names

```sql
SELECT e.ename,
       e.sal,
       RANK() OVER (ORDER BY e.sal DESC) AS salary_rank
FROM emp e
WHERE RANK() OVER (ORDER BY e.sal DESC) <= 5;
```

**Result:**

| ENAME | SAL  | SALARY_RANK |
|-------|------|-------------|
| KING  | 5000 | 1           |
| SCOTT | 3000 | 2           |
| FORD  | 3000 | 2           |
| JONES | 2975 | 4           |
| BLAKE | 2850 | 5           |

---

## EP-17: Intersect in SQL

### Theory: INTERSECT

**Definition:**
Returns rows that appear in **both** SELECT statements. Only common rows are returned.

**Key Points:**
- Both queries must return same number of columns
- Columns must have compatible data types
- Removes duplicates
- Both rows must match exactly
- Useful for finding common values

### 17.1 Basic Intersect

**Scenario:** Find employees who are also managers.

**Employees Table (all):**

| EMPNO |
|-------|
| 7839  |
| 7698  |
| 7782  |
| 7566  |
| 7788  |
| 7902  |
| 7369  |

**Managers (from MGR column):**

| MGR   |
|-------|
| 7839  |
| 7566  |
| 7902  |

### Query

```sql
SELECT empno
FROM emp
INTERSECT
SELECT mgr
FROM emp
WHERE mgr IS NOT NULL;
```

**Result:** Employees who are managers

| EMPNO |
|-------|
| 7839  |
| 7566  |
| 7902  |

---

### 17.2 Intersect with Multiple Columns

```sql
SELECT empno, ename
FROM emp
WHERE sal > 2500
INTERSECT
SELECT empno, ename
FROM emp
WHERE deptno = 20;
```

**Result:** Employees in dept 20 with salary > 2500

| EMPNO | ENAME |
|-------|-------|
| 7566  | JONES |
| 7788  | SCOTT |
| 7902  | FORD  |

---

### 17.3 Visual: Intersect Diagram

```
Set A (All Employees)    Set B (Managers)
+------+                +------+
| 7839 |                | 7839 |
| 7698 |                | 7566 |
| 7782 |                | 7902 |
| 7566 |                +------+
| 7788 |
| 7902 |
| 7369 |
+------+

INTERSECT (Common elements):
+------+
| 7839 | ← Present in both sets
| 7566 | ← Present in both sets
| 7902 | ← Present in both sets
+------+

Non-intersecting (7698, 7782, 7788, 7369) are excluded
```

---

## EP-18: Minus in SQL

### Theory: MINUS (SET DIFFERENCE)

**Definition:**
Returns rows from the **first** query that do **not** appear in the **second** query.

**Key Points:**
- Both queries must return same number of columns
- Columns must have compatible data types
- Removes duplicates
- Order matters: A MINUS B ≠ B MINUS A
- Useful for finding exclusive elements

### 18.1 Basic Minus

**Scenario:** Find employees who are NOT managers.

```sql
SELECT empno
FROM emp
MINUS
SELECT mgr
FROM emp
WHERE mgr IS NOT NULL;
```

**Result:** Employees who are NOT managers

| EMPNO |
|-------|
| 7698  |
| 7782  |
| 7788  |
| 7369  |

---

### 18.2 Minus with Conditions

```sql
SELECT empno, ename
FROM emp
WHERE deptno = 20
MINUS
SELECT empno, ename
FROM emp
WHERE sal > 3000;
```

**Result:** Department 20 employees NOT earning > 3000

| EMPNO | ENAME |
|-------|-------|
| 7369  | SMITH |

---

### 18.3 Visual: Minus Diagram

```
Set A (All Employees)    Set B (Managers)
+------+                +------+
| 7839 |                | 7839 |
| 7698 |                | 7566 |
| 7782 |                | 7902 |
| 7566 |                +------+
| 7788 |
| 7902 |
| 7369 |
+------+

MINUS A - B (Elements in A not in B):
+------+
| 7698 | ← Only in A
| 7782 | ← Only in A
| 7788 | ← Only in A
| 7369 | ← Only in A
+------+

Elements in B (7839, 7566, 7902) are removed because they're also in B
```

---

### 18.4 MINUS vs NOT IN vs LEFT JOIN

| Method | Use Case |
|--------|----------|
| MINUS | Find exclusive rows between two complete queries |
| NOT IN | Simple column-level exclusion |
| LEFT JOIN + NULL filter | Find unmatched rows with additional context |

**Comparison Query:**

```sql
-- Using MINUS
SELECT empno FROM emp
MINUS
SELECT mgr FROM emp WHERE mgr IS NOT NULL;

-- Using NOT IN
SELECT empno FROM emp
WHERE empno NOT IN (SELECT mgr FROM emp WHERE mgr IS NOT NULL);

-- Using LEFT JOIN
SELECT e.empno
FROM emp e
LEFT JOIN emp m ON e.empno = m.mgr
WHERE m.empno IS NULL;
```

---

## EP-19: First Normal Form (1NF)

### Theory: First Normal Form (1NF)

**Definition:**
A relation is in First Normal Form if:
1. All column values are **atomic** (indivisible)
2. No repeating groups or arrays
3. All column names are **unique**
4. **Order of rows doesn't matter**

### 19.1 Rule 1: Atomic Values

**Violation Example:**

| Roll_No | Name      | Phone          |
|---------|-----------|----------------|
| 66      | Trishaank | p1, p2         |
| 73      | Prashant  | p3             |
| 79      | Sanjay    | p4             |

**Problem:** Phone column contains multiple values (comma-separated)

**Correction (1NF Compliant):**

| Roll_No | Name      | Phone |
|---------|-----------|-------|
| 66      | Trishaank | p1    |
| 66      | Trishaank | p2    |
| 73      | Prashant  | p3    |
| 79      | Sanjay    | p4    |

---

### 19.2 Solution 1: Multiple Rows for Multivalued Attributes

```sql
CREATE TABLE student (
  roll_no NUMBER PRIMARY KEY,
  name VARCHAR2(50) NOT NULL
);

CREATE TABLE student_phone (
  roll_no NUMBER,
  phone VARCHAR2(20),
  PRIMARY KEY (roll_no, phone),
  FOREIGN KEY (roll_no) REFERENCES student(roll_no)
);
```

**Data:**

**student table:**

| ROLL_NO | NAME      |
|---------|-----------|
| 66      | Trishaank |
| 73      | Prashant  |
| 79      | Sanjay    |
| 82      | Srinivas  |

**student_phone table:**

| ROLL_NO | PHONE |
|---------|-------|
| 66      | p1    |
| 66      | p2    |
| 73      | p3    |
| 79      | p4    |
| 82      | p5    |

---

### 19.3 Solution 2: Multiple Columns for Multivalued Attributes

```sql
CREATE TABLE student_normalized (
  roll_no NUMBER PRIMARY KEY,
  name VARCHAR2(50) NOT NULL,
  phone1 VARCHAR2(20),
  phone2 VARCHAR2(20)
);
```

**Data:**

| ROLL_NO | NAME      | PHONE1 | PHONE2 |
|---------|-----------|--------|--------|
| 66      | Trishaank | p1     | p2     |
| 73      | Prashant  | p3     | NULL   |
| 79      | Sanjay    | p4     | NULL   |
| 82      | Srinivas  | p5     | NULL   |

---

### 19.4 Rule 2: No Intermixing of Different Data Types

**Violation Example:**

| ID  | Date      | Name  |
|-----|-----------|-------|
| 1   | 1-2-19    | trish |
| 2   | 1-2-19    | Mahi  |
| 3   | 2-2-19    | Rishi |
| 4   | abc       | Mani  |

**Problem:** ID column has mixed number and text values

**Correction:**

| ID  | Date      | Name  |
|-----|-----------|-------|
| 1   | 01-FEB-19 | trish |
| 2   | 01-FEB-19 | Mahi  |
| 3   | 02-FEB-19 | Rishi |
| 4   | 03-FEB-19 | Mani  |

---

### 19.5 Rule 3: Unique Column Names

**Violation Example:**

| Name   | Name   |
|--------|--------|
| kandhi | trish  |
| Kalakonda | Mahi  |
| Kandhi | Rishi |

**Problem:** Duplicate column names cause ambiguity

**Correction:**

| First_Name | Last_Name |
|------------|-----------|
| kandhi     | trish     |
| Kalakonda  | Mahi      |
| Kandhi     | Rishi     |

---

### 19.6 Rule 4: Order of Data Doesn't Matter

**Valid (1NF Compliant):**

| Roll_No |
|---------|
| 79      |
| 66      |
| 61      |
| 67      |

**Same Data (Still 1NF):**

| Roll_No |
|---------|
| 61      |
| 66      |
| 67      |
| 79      |

**Explanation:** Both representations are equivalent in 1NF. Physical order in storage doesn't violate normalization.

---

### 19.7 Composite Key Approach for Multivalued Attributes

**Before 1NF:**

| Roll_No | Name      | Phone  |
|---------|-----------|--------|
| 66      | Trishaank | p1, p2 |
| 73      | Prashant  | p3     |
| 79      | Sanjay    | p4     |
| 82      | Srinivas  | p5     |

**After 1NF (Composite Key):**

| Roll_No | Name      | Phone |
|---------|-----------|-------|
| 66      | Trishaank | p1    |
| 66      | Trishaank | p2    |
| 73      | Prashant  | p3    |
| 79      | Sanjay    | p4    |
| 82      | Srinivas  | p5    |

**SQL Implementation:**

```sql
CREATE TABLE student_1nf (
  roll_no NUMBER,
  name VARCHAR2(50),
  phone VARCHAR2(20),
  PRIMARY KEY (roll_no, phone),
  CONSTRAINT fk_roll UNIQUE (roll_no, name)
);

INSERT INTO student_1nf VALUES (66, 'Trishaank', 'p1');
INSERT INTO student_1nf VALUES (66, 'Trishaank', 'p2');
INSERT INTO student_1nf VALUES (73, 'Prashant', 'p3');
INSERT INTO student_1nf VALUES (79, 'Sanjay', 'p4');
INSERT INTO student_1nf VALUES (82, 'Srinivas', 'p5');
```

---

### 19.8 Quick Reference: 1NF Violations and Fixes

| Violation | Problem | Fix |
|-----------|---------|-----|
| Non-atomic values | Column contains multiple values | Split into atomic columns or create separate rows |
| Repeating groups | Multiple columns for similar data | Create junction table with composite key |
| Mixed data types | Different types in same column | Enforce consistent data type |
| Duplicate column names | Column name appears twice | Rename to unique names |
| Row order matters | Data interpretation depends on order | Ensure all data is self-contained |

---

---

## COMPREHENSIVE JOIN COMPARISON TABLE

| Join Type | Syntax | Returns | Use When |
|-----------|--------|---------|----------|
| INNER JOIN | `... INNER JOIN ... ON ...` | Matching rows only | Need only matched data |
| LEFT JOIN | `... LEFT JOIN ... ON ...` | All left + matching right + NULLs | Keep all left rows |
| RIGHT JOIN | `... RIGHT JOIN ... ON ...` | Matching left + all right + NULLs | Keep all right rows |
| FULL JOIN | `... FULL JOIN ... ON ...` | All rows from both + NULLs | Keep all from both |
| CROSS JOIN | `... CROSS JOIN ...` | Cartesian product (no ON) | Generate all combinations |
| SELF JOIN | `... JOIN ... ON same table` | Depends on join type + NULLs | Compare within same table |

---

## SQL OPERATOR PRECEDENCE & LOGIC

### Set Operations (UNION, INTERSECT, MINUS)

```
UNION: Returns unique rows from both queries
   Query A: {1, 2, 3, 4}
   Query B: {3, 4, 5, 6}
   Result:  {1, 2, 3, 4, 5, 6}

INTERSECT: Returns rows common to both
   Query A: {1, 2, 3, 4}
   Query B: {3, 4, 5, 6}
   Result:  {3, 4}

MINUS: Returns rows in first query not in second
   Query A: {1, 2, 3, 4}
   Query B: {3, 4, 5, 6}
   Result:  {1, 2}
```

---

## COMMON INTERVIEW PATTERNS

### Pattern 1: Finding Missing Values

```sql
-- Find IDs that exist in one table but not another
SELECT id FROM table1
MINUS
SELECT id FROM table2;
```

### Pattern 2: Finding Duplicates

```sql
-- Find values appearing more than once
SELECT column
FROM table
GROUP BY column
HAVING COUNT(*) > 1;
```

### Pattern 3: Finding Nth Record

```sql
-- Find Nth highest salary
SELECT MAX(sal)
FROM emp
WHERE sal NOT IN (
  SELECT DISTINCT sal
  FROM emp
  ORDER BY sal DESC
  LIMIT N-1
);
```

### Pattern 4: Joining to Same Table

```sql
-- Self join for hierarchical comparison
SELECT e.name, m.name as manager
FROM emp e
LEFT JOIN emp m ON e.manager_id = m.id;
```

---

## PRACTICE SCENARIOS

1. **Find employees in departments with no managers** - LEFT JOIN + WHERE NULL
2. **List all department and employee combinations** - CROSS JOIN
3. **Find departments with more than 3 employees** - GROUP BY + HAVING
4. **Get 2nd-4th highest salaries** - Nested subqueries + MINUS
5. **Compare employees vs managers** - INTERSECT
6. **Employees not assigned to any department** - LEFT JOIN + WHERE NULL or MINUS

---

## NORMALIZATION RULES QUICK REFERENCE

### 1NF (First Normal Form)
- ✓ All values are atomic
- ✓ No repeating groups
- ✓ Unique column names
- ✓ Row order irrelevant

### 2NF (Second Normal Form)
- Must be in 1NF
- ✓ No partial dependencies on primary key

### 3NF (Third Normal Form)
- Must be in 2NF
- ✓ No transitive dependencies

---

**Last Updated:** November 26, 2025  
**Complete Coverage:** 20 SQL Interview Questions  
**Format:** Professional Guide with Visual Diagrams  
**Database:** Oracle SQL