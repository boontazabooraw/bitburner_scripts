export async function main(ns: NS) {
  let hosts = new Set(["home"]);
  let excludes = ["home", "One", "CSEC", "Donation", "Donation_2"];

  hosts.forEach((host) => {
    ns.scan(host).forEach((n) => hosts.add(n));
  });

  let hitlist = Array.from(hosts)
    .filter((server) => ns.hasRootAccess(server))
    .filter((server) => !excludes.includes(server));

  while (true) {
    for (let target of hitlist) {
      if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
        await ns.hack(target);
      }
    }
    await ns.sleep(100);
  }
}
