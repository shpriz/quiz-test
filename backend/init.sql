-- Создание базы данных, если она не существует
CREATE DATABASE IF NOT EXISTS quizz_db;

-- Использование базы данных
USE quizz_db;

-- Создаем таблицы
CREATE TABLE IF NOT EXISTS sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_id INT NOT NULL,
    text TEXT NOT NULL,
    answers JSON NOT NULL,
    scores JSON NOT NULL,
    FOREIGN KEY (section_id) REFERENCES sections(id)
);

-- Создаем таблицу для результатов
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS quiz_results (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_score INT NOT NULL,
    section_scores JSON NOT NULL,
    detailed_answers JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
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
CREATE INDEX idx_result_id ON quiz_results(user_id);
