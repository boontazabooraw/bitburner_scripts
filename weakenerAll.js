/** @param {NS} ns */
export async function main(ns) {

    //"home","n00dles","foodnstuff","sigma-cosmetics","joesguns","hong-fang-tea","One","nectar-net","CSEC","neo-net"

    let hosts = new Set(["home"]);
    let excludes = ["home", "One", "CSEC"];

    hosts.forEach(host => {
        ns.scan(host).forEach(n => hosts.add(n));
    });

    let hitlist = Array.from(hosts).filter(server => ns.hasRootAccess(server)).filter(server => !excludes.includes(server));


    while (true) {
        for (const target of hitlist) {
            if (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
                await ns.weaken(target);
            }
        }
        await ns.sleep(1000);
    }

}