package com.thenetvalue.usersManagement.security.constants;

public interface SecurityConstants {

    public static final String JWT_KEY = "jxgEQeXHuPq8VdbyYFNkANdudQ53YUn4";
    public static final String JWT_HEADER = "Authorization";
    public static final String ERROR_MISS_CREDENTIALS= "Missing 'username' or 'password' in POST request body.";
    public static final String ERROR_FAULTY_CREDENTIALS= "Password or username are invalid. Ensure they meet the security requirements ";

}
