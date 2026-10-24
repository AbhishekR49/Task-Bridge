const {z} = require('zod');

const createTaskSchema = new z.object({

    title: z.string().trim().min(5).max(120),

    description: z.string().trim().min(200).max(5000),

    paymentAmount: z.coerce.number().positive(),

    currency: z.literal('INR').default('INR')
});

const updateTaskSchema = new z.object({
    title: z.string().trim().min(5).max(120).optional(),

    description: z.string().trim().min(200).max(5000).optional(),

    paymentAmount: z.coerce.number().positive().optional(),

    currency: z.literal('INR').default('INR').optional()
}).strict().refine( (data)=>
    Object.keys(data).length >0 ,
    {message:"Provide at least one field to update"}
);

module.exports ={ createTaskSchema, updateTaskSchema};