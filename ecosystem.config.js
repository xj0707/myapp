
module.exports = {
  apps: [{
    name: 'myapp-ecosystem', // 应用程序名
    script: './bin/www',  // 启动脚本
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }],

  // Deployment Configuration
  deploy: {
    production: {
      user: 'root',
      host: ['39.105.70.123'],
      ref: 'origin/master',
      repo: 'git@github.com:xj0707/myapp.git',
      path: '/home/www/',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    },
    development: {
      user: 'root',
      host: ['39.105.70.123'],
      ref: 'origin/master',
      repo: 'git@github.com:xj0707/myapp.git',
      path: '/home/www/',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env development',
      'pre-setup': ''
    }
  }
}