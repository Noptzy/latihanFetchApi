const Joi = require("joi");

exports.registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Nama harus diisi",
    "string.empty": "Nama tidak boleh kosong",
    "string.min": "Nama minimal 3 karakter",
    "string.max": "Nama maksimal 50 karakter",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email harus diisi",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "Password hanya boleh huruf dan angka.",
      "string.min": "Password minimal 8 karakter.",
      "any.required": "Password harus diisi",
      "string.empty": "Password tidak boleh kosong",
    }),
});

exports.updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "any.required": "Nama harus diisi",
    "string.empty": "Nama tidak boleh kosong",
    "string.min": "Nama minimal 3 karakter",
    "string.max": "Nama maksimal 50 karakter",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email harus diisi",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "Password hanya boleh huruf dan angka.",
      "string.min": "Password minimal 8 karakter.",
      "any.required": "Password harus diisi",
      "string.empty": "Password tidak boleh kosong",
    }),
});

exports.loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email harus diisi",
    "string.empty": "Email tidak boleh kosong",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.pattern.base": "Password hanya boleh huruf dan angka.",
      "string.min": "Password minimal 8 karakter.",
      "any.required": "Password harus diisi",
      "string.empty": "Password tidak boleh kosong",
    }),
});
