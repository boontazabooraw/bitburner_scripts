export async function main(ns: NS) {

    let hosts = new Set(["home"]);
    let excludes = ns.getPurchasedServers();
    excludes.push('home');

    hosts.forEach(host => {
        ns.scan(host).forEach(n => hosts.add(n));
    });

    let hitlist = Array.from(hosts)
        .filter(server => ns.hasRootAccess(server)
            && !excludes.includes(server)
            && ns.getServerMoneyAvailable(server) != 0
            && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(server))
        && ns.getServerSecurityLevel(server) > ns.getServerMinSecurityLevel(server);

    while (true) {
        for (let target of hitlist) {
            await ns.weaken(target);
        }
        await ns.sleep(100);
    }
}