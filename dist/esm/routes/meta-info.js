import { readFileSync } from 'fs';
import { packageRootPath } from '../shared/rootpath.js';
import { join as joinPaths } from 'path';
import * as os from 'os';
export const addRoute = (env) => {
    // Read server version from package.json
    const filePath = joinPaths(packageRootPath, '/package.json');
    const json = readFileSync(filePath, 'utf-8');
    const packageInfo = JSON.parse(json);
    // Add info endpoint
    env.app.get(`/info/${env.db.name}`, (req, res) => {
        const info = {
            version: packageInfo.version,
            time: Date.now(),
            process: process.pid
        };
        if (req.user && req.user.uid === 'admin') {
            const numberToByteSize = number => {
                return Math.round((number / 1024 / 1024) * 100) / 100 + 'MB';
            };
            const sPerMinute = 60;
            const sPerHour = sPerMinute * 60;
            const sPerDay = sPerHour * 24;
            const numberToTime = number => {
                const days = Math.floor(number / sPerDay);
                number -= sPerDay * days;
                const hours = Math.floor(number / sPerHour);
                number -= hours * sPerHour;
                const minutes = Math.floor(number / sPerMinute);
                number -= minutes * sPerMinute;
                const seconds = Math.floor(number);
                return `${days}d${hours}h${minutes}m${seconds}s`;
            };
            const mem = process.memoryUsage();
            const adminInfo = {
                dbname: env.db.name,
                platform: os.platform(),
                arch: os.arch(),
                release: os.release(),
                host: os.hostname(),
                uptime: numberToTime(os.uptime()),
                load: os.loadavg(),
                mem: {
                    total: numberToByteSize(os.totalmem()),
                    free: numberToByteSize(os.freemem()),
                    process: {
                        arrayBuffers: numberToByteSize(mem.arrayBuffers),
                        external: numberToByteSize(mem.external),
                        heapTotal: numberToByteSize(mem.heapTotal),
                        heapUsed: numberToByteSize(mem.heapUsed),
                        residentSet: numberToByteSize(mem.rss)
                    }
                },
                cpus: os.cpus(),
                network: os.networkInterfaces()
            };
            Object.assign(info, adminInfo);
        }
        // for (let i = 0; i < 1000000000; i++) {
        //     let j = Math.pow(i, 2);
        // }
        res.send(info);
    });
};
export default addRoute;
//# sourceMappingURL=meta-info.js.map