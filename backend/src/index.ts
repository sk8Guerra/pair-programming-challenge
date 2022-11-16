import { createExpressApp } from "./server";

async function main() {
  const app = await createExpressApp();
  const defaultPort = 4000;
  const port = process.env.PORT || defaultPort;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
