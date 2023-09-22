import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log('database connected successfully')
        app.listen(config.port, () => {
            console.log(`university management project running on port ${config.port}`)
          })
    }
    catch (error) {
        console.error(error)
    }


}

main()