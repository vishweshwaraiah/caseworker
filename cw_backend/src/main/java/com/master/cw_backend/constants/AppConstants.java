package com.master.cw_backend.constants;

public class AppConstants {
    public enum Sex {
        MALE, FEMALE, OTHERS
    };

    public static final String PAGE_NUMBER = "0";
    public static final String PAGE_SIZE = "10";
    public static final String SORT_BY = "id";
    public static final String SORT_DIR = "asc";

    // Default Error/Exceptions Messages
    public static final String POST_DELETE = "Post deleted successfully!";
    public static final String USER_DELETE = "User deleted successfully!";
    public static final String CATEGORY_DELETE = "Category deleted successfully!";

    public static final String RESOURCE_NOT_FOUND = "The resource you are looking for is not found!";
    public static final String UNEXPECTED_TYPE = "The type of the variable is unexpected!";
    public static final String NOT_READABLE = "Wrong JSON, please verify!";
    public static final String ILLEGAL_FORMAT = "Illegal format in the data!";
    public static final String MULTIPART_UPLOAD = "Looks like something is wrong with upload file!";

    // Image path
    public static final String IMAGE_PATH = "images/";
}
