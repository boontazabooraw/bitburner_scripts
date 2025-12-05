export async function main(ns: NS) {
  let hosts = new Set(["home"]);
  let excludes = ["home", "One"];

  hosts.forEach((host) => {
    ns.scan(host).forEach((n) => hosts.add(n));
  });

  let hitlist = Array.from(hosts)
    .filter((server) => ns.hasRootAccess(server))
    .filter((server) => !excludes.includes(server));

  let totalNoBkdr: number = 0;

  ns.tprint("\t");
  for (const target of hitlist) {
    if (!ns.getServer(target).backdoorInstalled) {
      ns.tprint(`Backdoor still not installed on ${target}`);
      totalNoBkdr++;
    }
  }
  totalNoBkdr < 1 && ns.tprint("All pwned servers have Backdoor installed.");
  ns.tprint("\n");
}
