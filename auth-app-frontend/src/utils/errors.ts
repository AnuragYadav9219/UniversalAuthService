const getLoginErrorMessage = (error: any) => {
    const status = error?.response?.status;

    switch (status) {
        case 400:
            return "Please check your email and password and try again.";

        case 401:
            return "The email or password you entered is incorrect.";

        case 403:
            return "Your account does not have permission to access this application.";

        case 404:
            return "No account found with this email address.";

        case 500:
            return "Something went wrong on our side. Please try again later.";

        default:
            return "Unable to sign in at the moment. Please try again.";
    }
};

export default getLoginErrorMessage;