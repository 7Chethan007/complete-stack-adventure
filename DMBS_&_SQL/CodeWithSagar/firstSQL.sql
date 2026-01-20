create database if not exists CollegeDB;
use CollegeDB;
select database();

CREATE Table Students (
	StudentID INT auto_increment primary key,
    Name varchar(100),
    Age tinyint,
    Email varchar(100),
    JoinDate date
);

select * from students;

insert into Students(Name, Age, Email,JoinDate)
values('Amit',22,'amit@email.com','2025-02-20');