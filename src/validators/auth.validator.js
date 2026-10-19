const { z } = require("zod");

const registerSchema = z.object({
    name: z
         .string()
         .trim()
         .min(2, 'Name must contain at least 2 characters')
         .max(70, 'Name cannot exceed 70 characters'),

    email: z
         .string()
         .trim()
         .email("please provide a valid email")
         .transform((email)=> email.toLowerCase()),
         
    password:z
        .string()
        .min(8, 'Password must contain at least 8 characters')
        .max(72, 'Password cannot exceed 72 characters'),
     
    role: z
        .enum(['applicant', 'poster'])
        .default('applicant'),   

});

module.exports = {registerSchema}