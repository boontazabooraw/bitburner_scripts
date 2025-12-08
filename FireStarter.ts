export async function main(ns: NS) {
  let hosts = new Set(["home"]);
  let excludes: string[] = ns.getPurchasedServers();
  excludes.push("home");

  let level2hack: boolean;
  let ports2hack: boolean;

  hosts.forEach((host) => {
    ns.scan(host).forEach((n) => hosts.add(n));
  });

  let hitlist = Array.from(hosts)
    .filter((server) => !ns.hasRootAccess(server))
    .filter((server) => !excludes.includes(server));

  //while (true) {
  for (const target of hitlist) {
    try {
      level2hack =
        ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target);
      ports2hack =
        ns.getServerNumPortsRequired(target) !=
        ns.getServer(target).openPortCount;

      if (ports2hack) {
        if (
          !ns.getServer(target).sshPortOpen &&
          ns.fileExists("BruteSSH.exe")
        ) {
          ns.brutessh(target);
          ns.tprint(`SSH Port opened for ${target}`);
        }
        if (
          !ns.getServer(target).ftpPortOpen &&
          ns.fileExists("FTPCrack.exe")
        ) {
          ns.ftpcrack(target);
          ns.tprint(`FTP Port opened for ${target}`);
        }
        if (
          !ns.getServer(target).smtpPortOpen &&
          ns.fileExists("FTPCrack.exe")
        ) {
          ns.relaysmtp(target);
          ns.tprint(`SMTP Port opened for ${target}`);
        }
      }

      if (level2hack) {
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
