CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT DEFAULT NULL,
  dt_publication DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO articles (titre, contenu) VALUES
('Premier article','Contenu 1'),
('Deuxième article','Contenu 2'),
('Troisième article','Contenu 3'),
('Quatrième article','Contenu 4'),
('Cinquième article','Contenu 5');
('Sixième article','Contenu 6'),
('Septième article','Contenu 7'),
('Huitième article','Contenu 8'),
('Neuvième article','Contenu 9'),
('Dixième article','Contenu 10');