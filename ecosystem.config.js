module.exports = {
  apps: [
    {
      name: 'dev-server',
      script: './server/server.dev.js',
      watch: ['server', 'config', 'proxy'],
      // instances: 'max',
      // exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      env_csr: {
        NODE_ENV: 'development',
        RENDER_MODE: 'csr',
      },
      env_ssr: {
        NODE_ENV: 'development',
        RENDER_MODE: 'ssr',
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'node',
  //     host: '212.83.163.1',
  //     ref: 'origin/master',
  //     repo: 'git@github.com:repo.git',
  //     path: '/var/www/production',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};
