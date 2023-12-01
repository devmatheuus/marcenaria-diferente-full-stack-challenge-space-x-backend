import cron from "node-cron";
import { seed } from "@/database/seed";

cron.schedule("0 9 * * *", async () => {
    console.log("Running cron job to update database");
    await seed();
    console.log("Finished running cron job to update database");
});
