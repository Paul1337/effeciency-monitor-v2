export const MinPasswordLength = 3;

export const validatePassword = (password: string) => {
    return password.length >= MinPasswordLength;
};

export const MinEmailLength = 4;

export const validateEmail = (email: string) => {
    return email.length >= MinEmailLength && email.includes('@');
};
