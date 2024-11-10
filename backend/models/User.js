import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Define the schema for the User model
 */
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


/**
 * Pre-save middleware to hash the password with bcrypt before saving it to the database
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    // Generate a salt with 10 rounds (higher values increase security but take longer)
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the generated salt and replace the plain password with the hashed version
    this.password = await bcrypt.hash(this.password, salt);
    // Proceed to save the document
    next();
});

/**
 * // Define a method on the userSchema to compare entered passwords with the stored hashed password
 * @param enteredPassword
 * @returns {Promise<*>}
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    // Compare the entered password with the hashed password in the database and return true if they match
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
