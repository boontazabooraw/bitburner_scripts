/** @param {NS} ns */
export async function main(ns) {
  try {
    while (true) {
      let hosts = new Set(["home"]);
      let excludes = ns.getPurchasedServers();
      excludes.push('home');

      hosts.forEach(host => {
        ns.scan(host).forEach(n => hosts.add(n));
      });

      let hitlist = Array.from(hosts)
        .filter(server => ns.hasRootAccess(server))
        .filter(server => !excludes.includes(server));

      for (const target of hitlist) {
        ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) && await ns.weaken(target);
        ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target) && await ns.hack(target);
        ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target) && await ns.weaken(target);
        await ns.grow(target);
      }
      await ns.sleep(300);
    }
  } catch (e) {
    ns.tprint(e);
    return false;
  }

}