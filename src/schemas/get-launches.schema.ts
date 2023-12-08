import { z } from "zod";
import { parseNumberFromString } from "@/utils/validations/parseNumberFromString";
import { sanitizeSearchForMongoDB } from "@/utils/validations/sanitizeSearchForMongoDB ";

export const getLaunchesSchema = z.object({
    limit: z.string().optional().transform(parseNumberFromString),
    page: z.string().optional().transform(parseNumberFromString),
    search: z.string().transform(sanitizeSearchForMongoDB).optional(),
});
