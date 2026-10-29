const {z} = require('zod');

const updateApplicationSchema = z.object({
    status: z.enum(["accepted","rejected"])
}).strict();

module.exports = updateApplicationSchema;