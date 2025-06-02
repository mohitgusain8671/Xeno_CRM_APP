import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expiration time
    });

    return token;
}