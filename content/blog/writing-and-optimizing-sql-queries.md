---
title: "Writing and Optimizing SQL Queries"
description: "TODO"
publishedAt: "2025-11-11"
tags: ['sql']
---


## 1. Setup environment
### PostgreSQL:
```bash
docker run --name postgres-learning -e POSTGRES_PASSWORD=postgres -p 5434:5432 -d postgres:18
docker exec -it postgres-learning psql -U postgres
```
### Create database and table:
```bash
psql (18.0 (Debian 18.0-1.pgdg13+3))
Type "help" for help.

postgres=# CREATE DATABASE pagila;
CREATE DATABASE
postgres=# \q
```

### Creata all schema objects:
```bash
cat ~/Evgenii/tutorials/tech-blog/sql-queries/pagila/pagila-schema.sql | docker exec -i postgres-learning psql -U postgres -d pagila
```
### Fill tables with data:
```bash
cat ~/Evgenii/tutorials/tech-blog/sql-queries/pagila/pagila-data.sql | docker exec -i postgres-learning psql -U postgres -d pagila 
```
## 2. Connect to database
```bash
docker exec -it postgres-learning psql -U postgres -d pagila
```
```bash
pagila=# \dt
                      List of tables
 Schema |       Name       |       Type        |  Owner   
--------+------------------+-------------------+----------
 public | actor            | table             | postgres
 public | address          | table             | postgres
 public | category         | table             | postgres
 public | city             | table             | postgres
 public | country          | table             | postgres
 public | customer         | table             | postgres
 public | film             | table             | postgres
 public | film_actor       | table             | postgres
 public | film_category    | table             | postgres
 public | inventory        | table             | postgres
 public | language         | table             | postgres
 public | payment          | partitioned table | postgres
 public | payment_p2022_01 | table             | postgres
 public | payment_p2022_02 | table             | postgres
 public | payment_p2022_03 | table             | postgres
 public | payment_p2022_04 | table             | postgres
 public | payment_p2022_05 | table             | postgres
 public | payment_p2022_06 | table             | postgres
 public | payment_p2022_07 | table             | postgres
 public | rental           | table             | postgres
 public | staff            | table             | postgres
 public | store            | table             | postgres
(22 rows)
```

```sql
pagila=# EXPLAIN ANALYZE
SELECT * FROM rental WHERE customer_id = 123;
                                               QUERY PLAN                                               
--------------------------------------------------------------------------------------------------------
 Seq Scan on rental  (cost=0.00..350.55 rows=25 width=40) (actual time=0.217..2.923 rows=24.00 loops=1)
   Filter: (customer_id = 123)
   Rows Removed by Filter: 16020
   Buffers: shared hit=150
 Planning:
   Buffers: shared hit=85
 Planning Time: 0.636 ms
 Execution Time: 3.053 ms
(8 rows)
```
Let's execute a more complex query to find the top 10 most rented films in the last month:
```sql
pagila=# EXPLAIN ANALYZE
SELECT f.title, COUNT(*) as rentals
FROM film f
JOIN inventory i ON f.film_id = i.film_id
JOIN rental r ON i.inventory_id = r.inventory_id
WHERE r.rental_date >= '2005-08-01'  -- assume last month in data
GROUP BY f.title
ORDER BY rentals DESC
LIMIT 10;
```

Response:
```sql
Limit  (cost=766.41..766.43 rows=10 width=23) (actual time=27.328..27.333 rows=10.00 loops=1)
  Buffers: shared hit=247
  ->  Sort  (cost=766.41..768.91 rows=1000 width=23) (actual time=27.326..27.330 rows=10.00 loops=1)
        Sort Key: (count(*)) DESC
        Sort Method: top-N heapsort  Memory: 26kB
        Buffers: shared hit=247
        ->  HashAggregate  (cost=734.80..744.80 rows=1000 width=23) (actual time=27.034..27.125 rows=958.00 loops=1)
              Group Key: f.title
              Batches: 1  Memory Usage: 121kB
              Buffers: shared hit=244
              ->  Hash Join  (cost=219.57..654.58 rows=16044 width=15) (actual time=8.964..23.326 rows=16044.00 loops=1)
                    Hash Cond: (i.film_id = f.film_id)
                    Buffers: shared hit=244
                    ->  Hash Join  (cost=133.07..525.78 rows=16044 width=4) (actual time=4.562..14.615 rows=16044.00 loops=1)
                          Hash Cond: (r.inventory_id = i.inventory_id)
                          Buffers: shared hit=180
                          ->  Seq Scan on rental r  (cost=0.00..350.55 rows=16044 width=4) (actual time=0.066..5.764 rows=16044.00 loops=1)
                                Filter: (rental_date >= '2005-08-01 00:00:00+03'::timestamp with time zone)
                                Buffers: shared hit=150
                          ->  Hash  (cost=75.81..75.81 rows=4581 width=8) (actual time=3.673..3.674 rows=4581.00 loops=1)
                                Buckets: 8192  Batches: 1  Memory Usage: 243kB
                                Buffers: shared hit=30
                                ->  Seq Scan on inventory i  (cost=0.00..75.81 rows=4581 width=8) (actual time=0.132..2.259 rows=4581.00 loops=1)
                                      Buffers: shared hit=30
                    ->  Hash  (cost=74.00..74.00 rows=1000 width=19) (actual time=4.241..4.242 rows=1000.00 loops=1)
                          Buckets: 1024  Batches: 1  Memory Usage: 60kB
                          Buffers: shared hit=64
                          ->  Seq Scan on film f  (cost=0.00..74.00 rows=1000 width=19) (actual time=0.013..4.046 rows=1000.00 loops=1)
                                Buffers: shared hit=64
Planning:
  Buffers: shared hit=427
Planning Time: 11.309 ms
Execution Time: 28.084 ms
```

The query execution plan shows that the database is performing sequential scans on the `rental`, `inventory`, and `film` tables, which can be inefficient for large datasets. To optimize this query, we can consider adding indexes on the columns used in the JOIN and WHERE clauses.
## 3. Optimize with Indexes
```sql
CREATE INDEX idx_rental_date ON rental(rental_date);
CREATE INDEX idx_inventory_film ON inventory(film_id);
```
After creating the indexes, we can re-run the same query and analyze the execution plan again to see if there are improvements in performance.
```sql
Planning:
  Buffers: shared hit=27
Planning Time: 0.502 ms
Execution Time: 10.109 ms
```
The execution time has significantly decreased from 28.084 ms to 10.109 ms after adding the indexes, demonstrating the effectiveness of indexing in optimizing SQL queries.
## Conclusion
Optimizing SQL queries is crucial for improving database performance, especially as data volume grows. By analyzing query execution plans and implementing appropriate indexing strategies, we can significantly reduce query execution times and enhance overall application
performance.
# Writing and Optimizing SQL Queries
Optimizing SQL queries is essential for ensuring efficient data retrieval and overall database performance. In this blog post, we will explore various techniques and best practices for writing and optimizing SQL queries.




