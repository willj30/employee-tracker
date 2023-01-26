INSERT INTO department (dept_name)
VALUES
('Bounties Department'),
('Trading Department'),
('Villain Department'),
('Civilian Department');

INSERT INTO roles (title, credits_salary, dept_id)
VALUES
('Bounty Hunter', 150000, 1),
('Trader', 45000, 2),
('Bounty Droid', 100000, 1),
('Assassin', 80000, 1),
('War Veteran', 50000, 1),
('Mechanic', 65000, 4),
('Imperial', 500000, 3),
('Sheriff', 35000, 2),
('Package', 0, 4);

INSERT INTO characters (first_name, last_name, role_id, manager_id)
VALUES
('Din', 'Djarin', 1, NULL),
('Greef', 'Carga', 2, 1),
('IG', '11', 3, NULL),
('Fennec', 'Shand', 4, NULL),
('Cara', 'Dune', 5, 1),
('Peli', 'Motto', 6, 1),
('Mof', 'Gideon', 7, NULL),
('Cobb', 'Vanth', 8, NULL),
('Baby', 'Grogu', 9, 1);