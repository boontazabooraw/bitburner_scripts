export async function main(ns: NS) {
  const target: string = ns.getHostname();
  let isStronk: boolean =
    ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target);

  while (true) {
    if (isStronk) {
      await ns.weaken(target);
    }
    await ns.hack(target);
    if (isStronk) {
      await ns.weaken(target);
    }
    await ns.grow(target);
    await ns.sleep(500);
  }
}
