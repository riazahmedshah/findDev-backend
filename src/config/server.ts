import {app} from "../index"

const PORT = 1000;


// async function testRedis() {
//   await getRedisClient().set('node-test', 'Works!');
//   const value = await getRedisClient().get('node-test');
//   console.log('Redis test value:', value);  // Should log "Works!"
// }

// testRedis();

app.listen(PORT, () => {
  console.log(`server is running: http://localhost:${PORT}`)
});