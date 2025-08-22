# LMS — запуск проекта

## Требования перед запуском

Перед запуском убедитесь, что установлены следующие компоненты:

- **Node.js** : https://nodejs.org/
- **npm** (подтягивается вместе с Node.js)
- **Docker + Docker Compose**: https://www.docker.com/products/docker-desktop/

> После установки **перезагрузите компьютер**, чтобы переменные окружения применились корректно.

---

## Подготвка окружения

### 1. Клонировать репозиторий

```bash
git clone https://github.com/Vealar/LMS.git
cd LMS
```

### 2. Настройка backend
1) Перейдите в папку серверной части:
```bash
cd backend
```

2) Создайте .env файл в папке backend, пример содрежимого:
    DATABASE_URL="postgresql://lms_user:lms_pass@localhost:5433/lms_db?schema=public"
    
    JWT_SECRET="PaM_Pam_PAM_PAM"
    
    PORT=8080
    
    S3_ENDPOINT=http://localhost:9000
    S3_ACCESS_KEY=minioadmin
    S3_SECRET_KEY=minioadmin
    S3_BUCKET=lms-files
    S3_REGION=us-east-1
3) Установите зависимости 
```bash
npm install           
```
### 3. Настройка frontend
Перейдите в папку клиентской части:
```bash
cd frontend
```
```bash
npm install            # Установка зависимостей
```

---

## Запуск приложения
Находясь в корне проекта поднимите базы данных(должен быть включен Docker):
```bash
docker compose up
```
Затем запустите сервер:
```bash
cd backend
npm run dev
```

Затем запустите клиент:
```bash
cd frontend
npm run dev
```
