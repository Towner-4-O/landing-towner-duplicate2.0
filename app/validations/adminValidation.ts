import Joi from 'joi';

export const loginAdminSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
  
  password: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 4 characters long',
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
});