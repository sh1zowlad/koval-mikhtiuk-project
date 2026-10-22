import localtunnel from 'localtunnel';

const CANDIDATES = ['koval-mikhtiuk', 'koval-mikhtiuk-proj', 'kovalmikhtiukproject'];
const PORT = 5173;

async function tryConnect() {
  for (const sub of CANDIDATES) {
    try {
      const tunnel = await localtunnel({ port: PORT, subdomain: sub });
      if (tunnel.url.includes(sub)) {
        console.log(`[${new Date().toLocaleTimeString()}] Custom URL successfully online: ${tunnel.url}`);
        tunnel.on('close', () => {
          console.log('Tunnel closed. Reconnecting in 3s...');
          setTimeout(tryConnect, 3000);
        });
        tunnel.on('error', (e) => console.error('Tunnel error:', e?.message || e));
        return;
      } else {
        tunnel.close();
      }
    } catch {
      // try next candidate
    }
  }

  // If none of candidates worked, retry in 3 seconds
  setTimeout(tryConnect, 3000);
}

// Keep event loop alive
setInterval(() => {}, 30000);

tryConnect();
