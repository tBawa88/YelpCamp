import { z } from 'zod';


const reviewValidation = z.object({
    content: z.string()
        .min(3, "Review should be atleast 3 characters long")
        .max(200, "Review cannot be more than 200 characters long"),
    rating: z.number()
        .min(1, "Min rating allowed is 1 star")
        .max(5, "Max rating allowed is 5 stars")
})
export default reviewValidation;