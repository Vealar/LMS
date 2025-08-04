const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async ({email, password, fullName}) => {
    const existing = await prisma.user.findUnique({where: {email}});
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 13);

    const user = await prisma.user.create({
        data: {email, password: hashed, fullName},
    });

    return user;
};

const login = async ({email, password}) => {
    const user = await prisma.user.findUnique({where: {email}});
    if (!user) throw new Error("Invalid credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        {expiresIn: "7d"}
    );

    return {token, user};
};

module.exports = {register, login};
