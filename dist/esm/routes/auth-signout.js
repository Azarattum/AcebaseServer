import { sendUnexpectedError } from '../shared/error.js';
export const addRoute = (env) => {
    env.app.post(`/auth/${env.db.name}/signout`, async (req, res) => {
        const LOG_ACTION = 'auth.signout';
        const LOG_DETAILS = { ip: req.ip, uid: req.user?.uid ?? null };
        try {
            if (req.user) {
                const client = typeof req.body.client_id === 'string' ? env.clients.get(req.body.client_id) : null; // NEW in AceBaseClient v0.9.4
                if (client) {
                    // Remove user binding from client socket
                    client.user = null;
                }
                const signOutEverywhere = typeof req.body === 'object' && req.body.everywhere === true; // NEW in AceBaseClient v0.9.14
                if (signOutEverywhere) {
                    // Remove token from cache
                    env.authCache.remove(req.user.uid);
                    // Remove user binding from all clients signed in with current user
                    for (let client of env.clients.values()) {
                        if (client.user?.uid === req.user.uid) {
                            client.user = null;
                        }
                    }
                }
                // Remove token from user's auth node
                await env.authRef.child(req.user.uid).transaction(snap => {
                    if (!snap.exists()) {
                        return;
                    }
                    const user = snap.val();
                    if (signOutEverywhere) {
                        user.access_token = null;
                    }
                    user.last_signout = new Date();
                    user.last_signout_ip = req.ip;
                    return user;
                });
                env.log.event(LOG_ACTION, LOG_DETAILS);
            }
            res.send('Bye!');
        }
        catch (err) {
            env.log.error(LOG_ACTION, 'unexpected', { ...LOG_DETAILS, message: err instanceof Error ? err.message : err.toString() });
            sendUnexpectedError(res, err);
        }
    });
};
export default addRoute;
//# sourceMappingURL=auth-signout.js.map