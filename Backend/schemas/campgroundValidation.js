import { z } from 'zod';

const campgroundValidation = z.object({
    title: z.string()
        .min(3, "Title must be atleast 3 characters long")
        .max(100, "Title cannot be more than 100 characters"),
    price: z.number()
        .min(0, "Price cannot be less than 0")
        .max(99999, "Price is too high"),
    image: z.string()
        .max(300, "Image link cannot exceed 300 chars"),
    location: z.string()
        .min(3, "Location must be atleast 3 characters long"),
    description: z.string()
        .min(3, "Description should be atleast 3 characters")
        .max(500, "Description cannot be more than 500 characters"),
    authorId: z.string()
})

export default campgroundValidation;