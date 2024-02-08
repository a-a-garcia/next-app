//Zod is a TypeScript-first schema declaration and validation library.
//useful for when you need to validate data and don't want to write several if statements

import { z } from 'zod';

// z.object() returns a schema object so store it in a variable
const schema = z.object({
    name: z.string().min(3),
    email: z.string().email()
})

//export it as a default object;

export default schema