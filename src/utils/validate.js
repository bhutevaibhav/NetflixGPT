export const checkValidData = (email, password, name, isSignInForm) => {
  const isEmailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

  if (!isEmailValid) return "Email is not valid";

  if (!isSignInForm) {
    if (name.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  if (password.length < 4 || password.length > 18) {
    return "Password must be between 4 and 7 characters";
    // console.log("Password must be between 4 and 7 characters");
  }

  // Granular password validation
  const hasNumber = /[0-9]/.test(password);
  if (!hasNumber) return "Password must contain at least one number";

  const hasSpecialchar = /[!@#$%^&*]/.test(password);
  if (!hasSpecialchar)
    return "Password must contain at least one special character";

  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase)
    return "Password must contain at least one uppercase letter";

  return null;
};

// implement different error msg for different form - use isSignUp form to check the form
