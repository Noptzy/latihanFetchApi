const Joi = require("joi");

exports.createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 50 characters"
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
    "string.empty": "Email cannot be empty"
  }),
  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters",
    "any.required": "Password is required",
    "string.empty": "Password cannot be empty"
  })
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.min": "Name must be at least 3 characters",
    "string.max": "Name cannot exceed 50 characters"
  }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format"
  }),
  password: Joi.string().min(8).messages({
    "string.min": "Password must be at least 8 characters"
  })
}).min(1); 