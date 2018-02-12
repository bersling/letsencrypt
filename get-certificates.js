const { execSync } = require('child_process');

// REQUIREMENTS:
// IMPORTANT: This script requires your server the serve static files from /.well-known and to have a webroot as specified !

const webroot = "/www/data";
const email = "bersling@gmail.com";
const dockerCommand = (certificates) => {
  return `docker run  -v /www/data:/www/data -v /etc/letsencrypt/:/etc/letsencrypt/ certbot/certbot certonly --non-interactive --agree-tos --email ${email} --webroot -w ${webroot} ${certificates}`
};

// Need to be root to execute this (adjusted for docker)

//  ... for nginx you can achieve it by replacing default config with this:
// server {
//     root /www/data;
//     location / {
//     }
// }

const requiredCertificates = [
  "-d a.myapp.com",
  "-d b.myapp.com",
  "-d c.myapp.com -d d.myapp.com",
  "-d hello.world.com"
];

requiredCertificates.forEach(domainSet => {
  execSync(dockerCommand(domainSet));
});

