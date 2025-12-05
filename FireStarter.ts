export async function main(ns: NS) {
  let hosts = new Set(["home"]);
  let excludes = ["home", "One"];

  hosts.forEach((host) => {
    ns.scan(host).forEach((n) => hosts.add(n));
  });

  let hitlist = Array.from(hosts)
    .filter((server) => !ns.hasRootAccess(server))
    .filter((server) => !excludes.includes(server));

  //while (true) {
  for (const target of hitlist) {
    try {
      ns.getServer(target).sshPortOpen && ns.brutessh(target);
      ns.getServer(target).ftpPortOpen && ns.ftpcrack(target);
      ns.print("Available port attacks completed...");

      if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
        ns.nuke(target);
        ns.print("Target nuked...");
        ns.tprint(`Pwnd: ${target}; `);
      }

      await ns.sleep(500);
    } catch (e) {
      ns.print(`Error on Nuking ${target}: ${e}`);
    }
  }
  //  }
}
