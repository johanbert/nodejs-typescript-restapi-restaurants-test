export const UserModel = {
    _id: String,
    email: String,
    password: { type: String, select: false },
    full_name: String,
    create_at: Date,
}