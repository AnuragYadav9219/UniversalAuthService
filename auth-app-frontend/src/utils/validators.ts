export const isValidEmail = (email: string): string | null => {
    const value = email.trim();

    if (!value) {
        return "Email is Required!";
    }

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
        return "Please enter a valid email address!";
    }

    return null;
};

export const isValidPassword = (password: string): string | null => {
    const value = password.trim();

    if (!value) {
        return "Password is required!";
    }

    if (value.length < 8) {
        return "Password must be at least 8 characters long!";
    }

    if (value.length > 64) {
        return "Password must not exceed 64 characters!";
    }

    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(value)) {
        return "Password must contain uppercase, lowercase, number and special character!";
    }

    return null;
}