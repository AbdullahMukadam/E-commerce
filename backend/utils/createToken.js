import jwt from "jsonwebtoken"

const CreateToken = (res, userId) => {
    const Token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })

    res.cookie('jwt', Token, {
        httpOnly: true,
        secure: "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return Token
}

export default CreateToken