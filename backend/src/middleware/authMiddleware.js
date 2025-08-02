const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET;

async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // { id, email, role, iat }

        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Сравнение времени: если токен старее обновления пользователя
        const tokenIssuedAt = new Date(decoded.iat * 1000); // iat — в секундах
        if (tokenIssuedAt < user.updatedAt) {
            return res.status(403).json({ message: "Token expired due to data update" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
