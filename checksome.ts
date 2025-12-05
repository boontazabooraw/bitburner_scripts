interface ServersI {
  name: string;
  totalRam: number;
  availRam: number;
  reqHackLvl: number;
  availMoney: number;
  rootAccess: boolean;
  securityLvl: number;
  minSecurityLvl: number;
  hTime: number;
}

export async function main(ns: NS) {
  let hosts = new Set(["home"]);
  let excludes = ["home", "One", "CSEC", "neo-net"];

  hosts.forEach(host => {
    ns.scan(host).forEach(n => hosts.add(n));
  });

  let servers: ServersI[] = [];

  let s = Array.from(hosts).filter(server => !excludes.includes(server));

  for (const target of s) {
    servers.push({
      name: target,
      totalRam: ns.getServerMaxRam(target),
      availRam: roundOffTwoDec((ns.getServerMaxRam(target) - ns.getServerUsedRam(target))),
      reqHackLvl: ns.getServerRequiredHackingLevel(target),
      availMoney: roundOffTwoDec(ns.getServerMoneyAvailable(target)),
      rootAccess: ns.hasRootAccess(target),
      securityLvl: roundOffTwoDec(ns.getServerSecurityLevel(target)),
      minSecurityLvl: ns.getServerMinSecurityLevel(target),
      hTime: roundOffTwoDec(ns.getHackTime(target) / 1000 / 60),
    })
  }


  servers.sort((a, b) => a.reqHackLvl - b.reqHackLvl);

  // Servers to be pwnd
  ns.tprint("******************************* WITHOUT ACCESS *******************************");
  for (const tbd of servers) {
    if (!tbd.rootAccess && tbd.reqHackLvl <= (ns.getHackingLevel() + 150)) {
      ns.tprint(`${tbd.name} : ${tbd.totalRam}GB : \$${tbd.availMoney} : LVL${tbd.reqHackLvl}`);
    }
  }
  ns.tprint("***************************************************************************\n\n");

  // Servers with Root Access
  ns.tprint("******************************* WITH ACCESS *******************************");
  for (const hkd of servers) {
    if (hkd.rootAccess) {
      ns.tprint(`${hkd.name} : ${hkd.availRam}GB : \$${hkd.availMoney} : Security LVL of ${hkd.securityLvl} (min ${hkd.minSecurityLvl})`);
    }
  }
  ns.tprint("***************************************************************************\n\n");

  // Hackable servers
  ns.tprint("******************************* READY TO GET MILKED *******************************");
  for (const mlk of servers) {
    if (mlk.rootAccess && mlk.availMoney > 0) {
      ns.tprint(`${mlk.name} have \$${mlk.availMoney} inside (${mlk.hTime}min/s).`);
    }
  }
  ns.tprint("***********************************************************************************");


  //Old Code LMAO
  /*
  let hitlist = Array.from(hosts).filter(server => ns.hasRootAccess(server)).filter(server => !excludes.includes(server));
  let availableTargets: string[] = [];

  let tbd = Array.from(hosts).filter(server => !ns.hasRootAccess(server)).filter(server => !excludes.includes(server));
  try {

    // List of servers you DO NOT have root access
    ns.tprint("\n\n");
    ns.tprint("=== Servers you don't have root access ===")
    for (const target of tbd) {
      ns.tprint(`${target}: ${Math.round((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) * 100) / 100}GB,  \$${Math.round(ns.getServerMoneyAvailable(target))}, LVL${ns.getServerRequiredHackingLevel(target)}`);
    }

    // List of servers you have root access
    ns.tprint("\n\n");
    ns.tprint("=== Servers you have root access ===")
    for (const target of hitlist) {
      ns.tprint(`${target}: ${Math.round((ns.getServerMaxRam(target) - ns.getServerUsedRam(target)) * 100) / 100}GB available, Money Available: ${Math.round(ns.getServerMoneyAvailable(target))}`);
    }

    // Checking for available targets
    ns.tprint("\n\n");
    ns.tprint("=== Available Targets ===");
    for (const target of hitlist) {
      if (ns.getServerMaxRam(target) > 0) {
        if (ns.getServerUsedRam(target) === 0 && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
          availableTargets.push(target);
        }
      }
    }
    if (availableTargets.length === 0) {
      ns.tprint("No servers available for hijacking...");
      ns.tprint("\n\n");
    } else {
      for (const target of availableTargets) {
        ns.tprint(`${target} is available for hijacking. [LVL ${ns.getServerRequiredHackingLevel(target)}]`);
        ns.tprint("\n\n");
      }
    }
  } catch (e) {
    ns.tprint(e);
  }
  */
}

function roundOffTwoDec(n: number) {
  return Math.round(n * 100) / 100;
}