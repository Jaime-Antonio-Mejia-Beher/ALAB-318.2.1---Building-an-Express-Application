const express = require("express")
const app = express();
const port = 3100;

app.get('/', (req: Request, res))

app.listen(3100, () => {
    console.log(`server running on port: ${port}`)
})


