
## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```



```
social-media
├─ .eslintrc.js
├─ .gitignore
├─ .prettierrc
├─ docker-compose.yml
├─ images
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ src
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ auth
│  │  ├─ auth.controller.ts
│  │  ├─ auth.module.ts
│  │  ├─ auth.service.ts
│  │  ├─ decorators
│  │  │  └─ roles.decorator.ts
│  │  ├─ dto
│  │  │  ├─ auth-user.dto.ts
│  │  │  └─ index.ts
│  │  └─ guards
│  │     ├─ auth.guard.ts
│  │     ├─ jwt.strategy.ts
│  │     └─ roles.guard.ts
│  ├─ chat
│  │  ├─ chat.module.ts
│  │  ├─ chat.service.ts
│  │  ├─ dto
│  │  │  ├─ active-conversation.dto.ts
│  │  │  ├─ conversation.dto.ts
│  │  │  └─ message.dto.ts
│  │  ├─ entities
│  │  │  ├─ active-conversation.ts
│  │  │  ├─ conversation.entity.ts
│  │  │  └─ message.entity.ts
│  │  └─ gateway
│  │     └─ chat.gateway.ts
│  ├─ main.ts
│  ├─ posts
│  │  ├─ dto
│  │  │  └─ post.dto.ts
│  │  ├─ entities
│  │  │  └─ post.entity.ts
│  │  ├─ guards
│  │  │  └─ is-creator.guard.ts
│  │  ├─ posts.controller.ts
│  │  ├─ posts.module.ts
│  │  └─ posts.service.ts
│  ├─ shared
│  │  └─ interceptors
│  │     ├─ createUser.interceptor.ts
│  │     └─ index.ts
│  └─ users
│     ├─ dto
│     │  ├─ create-user.dto.ts
│     │  ├─ friend-request.dto.ts
│     │  └─ role.dto.ts
│     ├─ entities
│     │  ├─ friend-request.entity.ts
│     │  └─ user.entity.ts
│     ├─ users.controller.ts
│     ├─ users.module.ts
│     └─ users.service.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```