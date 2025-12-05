export async function main(ns: NS) {
  const target: any = ns.args[0];
  const numThreads: number = Math.round(ns.getServerMaxRam(target) / 2.25);

  ns.scp("/scripts/burntobits.ts", target);
  ns.exec("/scripts/burntobits.ts", target, numThreads);

  ns.tprint(`Executing attack on ${target} [t=${numThreads}]`);
}
