const validateSignup = (data) => {
	const { firstName, lastName, email, password, contactNumber } = data;
	if (firstName && lastName && email && password && contactNumber)
		return true;
	return false;
};

const validateLogin = (data) => {
	const { email, password } = data;

	if (email && password) {
		return true;
	}
	return false;
};

export { validateSignup, validateLogin };
