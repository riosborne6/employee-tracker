USE workforce;
INSERT INTO Department (name)
VALUES 
  ("Sales"),
  ("Engineering"),
  ("Finance"),
  ("Legal");

INSERT INTO Role (title, salary, department_id) 
VALUES
    ("Sales Lead", 100000.00, 1),
    ("Sales Person", 80000.00, 1),
    ("Lead Engineer", 150000.00, 2),
    ("Software Engineer", 120000.00, 2),
    ("Accountant", 125000.00, 3),
    ("Legal Team Lead", 250000.00, 4),
    ("Lawyer", 190000.00, 4);


INSERT INTO Employee (first_name, last_name, role_id, manager_id)
VALUES 
("Johnny", "Unitus", 1, NULL),
("Barry", "Manilow", 2, 1),
("Frank", "Sinatra", 3, NULL),
("Hannah", "Folk", 4, 3),
("Skyler", "Brungardt", 5, NULL),
("Adam", "Sandler", 6, NULL),
("Chris", "Farley", 7, 6);
