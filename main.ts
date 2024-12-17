
if (import.meta.main) {
  const day = Deno.args[0];
  let version = Deno.args[1];

  if (!day) {
    console.log("[Missing Argument Error] Please provide a day number as an argument.");
    Deno.exit(1);
  }
  if (!version || (version !== 'ai' && version !== 'human')) {
    console.log("[Info] Due to missing or incorrect argument of ai/human using default: human");
    version = 'human';
  }
  console.log(`Running day ${day} with ${version} version...`);

  const module = await import(`./days/${day}.ts`);
  module[version]();
}
