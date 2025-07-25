import {app} from "./express"

const PORT = 1100;

app.listen(PORT, () => {
  console.log(`server is running: http://localhost:${PORT}`)
});