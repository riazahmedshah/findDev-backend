import {app} from "../index"

const PORT = 1000;

app.listen(PORT, () => {
  console.log(`server is running: http://localhost:${PORT}`)
});