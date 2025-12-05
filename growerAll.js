/** @param {NS} ns */
export async function main(ns) {

    let hosts = new Set(["home"]);
    let excludes = ["home", "One", "CSEC"];

    hosts.forEach(host => {
        ns.scan(host).forEach(n => hosts.add(n));
    });

    let hitlist = Array.from(hosts).filter(server => ns.hasRootAccess(server)).filter(server => !excludes.includes(server));

    while (true) {
        for (const target of hitlist) {
            await ns.grow(target);
        }
        await ns.sleep(1000);
    }
}