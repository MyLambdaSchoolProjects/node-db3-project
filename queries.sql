-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select ProductName
    , c.CategoryName
from Product as p
join Category as c
    on p.CategoryId = c.id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select id as OrderId
    , c.CompanyName
    , o.OrderDate 
from [Order] as o
join Customer as c
    on o.CustomerId = c.Id
where o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select o.Id as OrderID
    , p.ProductName
    , od.Quantity
from [Order] as o
join Product as p
    on od.ProductId = p.Id
join OrderDetail as od
    on o.Id = od.OrderId
where o.id = 10251;

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
select o.Id as OrderID
    , c.CompanyName
    , e.LastName
from [Order] as o
join Customer as c
    on o.CustomerId = c.Id
join Employee as e
    on o.EmployeeId = e.Id;
