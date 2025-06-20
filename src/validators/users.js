const Joi = require("joi");
const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must be at most 50 characters",
  }),
    email: Joi.string().email().required().messages({
        "string.email": "Email is not valid",
        "any.required": "Email is required", 
        "string.empty": "Email cannot be empty",
  }),
    password: Joi.string().min(6).max(100).pattern(/^[a-zA-Z0-9]{6,100}$/).required().messages({
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password must be at most 100 characters", 
            "string.pattern.base": "Password must be 6-100 alphanumeric characters",
            "any.required": "Password is required",
            "string.empty": "Password cannot be empty",
    }),
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Name is required",
        "string.empty": "Name cannot be empty", 
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name must be at most 50 characters",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Email is not valid",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
    }),
    password: Joi.string().min(8).max(30).pattern(/^[a-zA-Z0-9]{8,30}$/).optional().messages({
        "string.min": "New password must be at least 8 characters",
        "string.max": "New password must be at most 30 characters",
        "string.pattern.base": "New password must be 8-30 alphanumeric characters",
    }),
    photoProfile: Joi.any().optional()
});

const loginUserSchema = Joi.object({
    name: Joi.string().allow("").optional(),
    email: Joi.string().email().allow("").optional().messages({
        "string.email": "Email is not valid",
    }),
    password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
    }),
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    loginUserSchema,
};