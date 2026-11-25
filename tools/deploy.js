// Builds the site and pushes the finished files (the dist/ folder) to the
// `deploy` branch on GitHub. Hostinger's Git deployment pulls that branch.
// Run with: npm run deploy
const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const tmp = path.join(os.tmpdir(), 'aly-portfolio-deploy');
const run = (cmd, cwd = root) => execSync(cmd, { cwd, stdio: 'inherit' });
const out = (cmd, cwd = root) => execSync(cmd, { cwd }).toString().trim();

const remote = out('git remote get-url origin');
const sha = out('git rev-parse --short HEAD');

console.log('\n> Building the site...');
run('npm run build');

console.log('\n> Preparing the deploy branch...');
fs.rmSync(tmp, { recursive: true, force: true });
try {
  run(`git clone --quiet --branch deploy --single-branch "${remote}" "${tmp}"`);
} catch {
  fs.mkdirSync(tmp, { recursive: true });
  run('git init --quiet -b deploy', tmp);
  run(`git remote add origin "${remote}"`, tmp);
}

// Replace everything in the branch with the fresh build.
for (const f of fs.readdirSync(tmp)) if (f !== '.git') fs.rmSync(path.join(tmp, f), { recursive: true, force: true });
fs.cpSync(dist, tmp, { recursive: true });

run('git add -A', tmp);
if (!out('git status --porcelain', tmp)) {
  console.log('\nNothing changed since the last deploy.');
} else {
  run(`git commit --quiet -m "Deploy build of ${sha}"`, tmp);
  run('git push --quiet origin deploy', tmp);
  console.log('\nDone! Pushed to the `deploy` branch. In hPanel → Git, press "Deploy" (or wait for auto-deploy).');
}
