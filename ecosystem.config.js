module.exports = {
  apps: [
    {
      name: 'Ramana Api',
      script: 'npm',
      args: 'start',
      watch: true,
      autorestart: true,
      max_memory_restart: '500M', // Optional: restart if memory usage exceeds this value
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
