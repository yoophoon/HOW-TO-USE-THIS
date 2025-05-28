# 系统服务展示面板

# 直接安装
```s
docker run -d \
  -p 4000:80 \
  -v /path/to/dashy/my-local-conf.yml:/app/public/conf.yml \
  -v /path/to/dashy/icons:/app/public/item-icons/icons \
  --name=my-dashboard \
  --restart=always \
  lissy93/dashy:latest
```

# 配置
```yml
---
# Page meta info, like heading, footer text and nav links
pageInfo:
  title: Dashy
  description: Welcome to your new dashboard!
  navLinks:
  - title: GitHub
    path: https://github.com/Lissy93/dashy
  - title: Documentation
    path: https://dashy.to/docs

# Optional app settings and configuration
appConfig:
  theme: colorful
  layout: auto
  iconSize: medium
  language: asia/Shanghai
  auth:
    users:
      - user: yoophoon    # 改成自己的用户名
        hash: 8e0797354da82102b019e7204551d2931c89eab4b27e11bbfb7e69e11702234c  # cha256 哈希加密，地址用这个： https://emn178.github.io/online-tools/sha256.html
        type: admin
# Main content - An array of sections, each containing an array of items
sections:
- name: Getting Started
  icon: fas fa-rocket
  items:
  - title: Dashy Live
    description: Development a project management links for Dashy
    icon: https://i.ibb.co/qWWpD0v/astro-dab-128.png
    url: https://live.dashy.to/
    target: newtab
  - title: GitHub
    description: Source Code, Issues and Pull Requests
    url: https://github.com/lissy93/dashy
    icon: favicon
  - title: Docs
    description: Configuring & Usage Documentation
    provider: Dashy.to
    icon: far fa-book
    url: https://dashy.to/docs
  - title: Showcase
    description: See how others are using Dashy
    url: https://github.com/Lissy93/dashy/blob/master/docs/showcase.md
    icon: far fa-grin-hearts
  - title: Config Guide
    description: See full list of configuration options
    url: https://github.com/Lissy93/dashy/blob/master/docs/configuring.md
    icon: fas fa-wrench
  - title: Support
    description: Get help with Dashy, raise a bug, or get in contact
    url: https://github.com/Lissy93/dashy/blob/master/.github/SUPPORT.md
    icon: far fa-hands-helping

    
```

`git clone https://github.com/walkxcode/dashboard-icons.git`