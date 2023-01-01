# NestJS Monorepo Boilerplate

## How to run

1. `pnpm run serve`

## Backend packages

### Config

#### Installation

1. In `app.module.ts`

```js
import { ConfigModule } from '@nestjs-monorepo-boilerplate/back-config';

...

@Module({
  imports: [ConfigModule],
  ...
})
```

2. To use the configuration service just `import { ConfigService } from '@nestjs-monorepo-boilerplate/back-config'`

### Database

#### Available resources

```js
import {
  InjectRepository,
  EntityManager,
  DatabaseModule,
  DatabaseFeatureModule,
} from '@nestjs-monorepo-boilerplate/back-database';
```
