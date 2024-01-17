package com.thenetvalue.usersManagement.security.constants;
public interface ExceptionMessagesConstants {
    public static final String ERROR_MISS_FIELDS = "Missing 'username' or 'password' in POST request body.";
    public static final String ERROR_FAULTY_FIELDS = "Password or username do not meet the security requirements ";
    public static final String ERROR_BAD_CREDENTIALS= "Invalid username or password. Please check your credentials and try again.";
    public static final String ERROR_INVALID_TOKEN= "Invalid JSON Web Token: ";
    public static final String ERROR_NULL_PASSWORD = "Password cannot be null";
    public static final String ERROR_NULL_USERNAME = "Username cannot be null";
    public static final String ERROR_NULL_EMAIL = "Email cannot be null";
    public static final String ERROR_NULL_REVIEW_TEXT = "Review comment cannot be null";
    public static final String ERROR_USERNAME_DUPLICATED = "Username already exists. Please choose a different one.";
    public static final String ERROR_REVIEW_DUPLICATED = "The movie has already been reviewed";
    public static final String ERROR_REVIEW_NOT_FOUND = "The review has not been found";
    public static final String ERROR_INVALID_REVIEW = "The movie has already been reviewed";
    public static final String ERROR_USER_NOT_FOUND = "User not found on the database";
    public static final String ERROR_FAULTY_PASSWORD = "Invalid password. Ensure that it meets the security requirements";
    public static final String ERROR_FAULTY_USERNAME = "Invalid Username. Ensure that it meets the security requirements";
    public static final String ERROR_FAULTY_EMAIL = "Invalid email. Ensure that it meets the security requirements";

}
