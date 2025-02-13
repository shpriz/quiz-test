-- Создание базы данных, если она не существует
CREATE DATABASE IF NOT EXISTS quizz_db;

-- Создание пользователя и назначение прав
CREATE USER IF NOT EXISTS 'quizz_user'@'%' IDENTIFIED BY 'quizz_password123';
GRANT ALL PRIVILEGES ON quizz_db.* TO 'quizz_user'@'%';
FLUSH PRIVILEGES;

-- Использование базы данных
USE quizz_db;

-- Создание таблиц
CREATE TABLE IF NOT EXISTS sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NOT NULL,
  text TEXT NOT NULL,
  answers JSON NOT NULL, -- Массив возможных ответов
  scores JSON NOT NULL,  -- Массив баллов для каждого ответа
  FOREIGN KEY (section_id) REFERENCES sections(id)
);

CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  total_score INT NOT NULL,
  completion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS section_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  result_id INT NOT NULL,
  section_title VARCHAR(255) NOT NULL,
  score INT NOT NULL,
  max_score INT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES results(id)
);

CREATE TABLE IF NOT EXISTS detailed_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  result_id INT NOT NULL,
  question_id INT NOT NULL,
  section_title VARCHAR(255) NOT NULL,
  question_text TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  score INT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES results(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Создание таблицы администраторов
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Создание индекса для ускорения поиска по username
CREATE INDEX idx_admins_username ON admins(username);

-- Добавление индексов для оптимизации запросов
CREATE INDEX idx_result_id ON section_scores(result_id);
CREATE INDEX idx_result_id_answers ON detailed_answers(result_id);
CREATE INDEX idx_section_id ON questions(section_id);
