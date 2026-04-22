# TO DO

## 23/04/2026

- Terminar la migración [Animals Repository](./src/animals/repositories/animals-repo.ts) a Prisma. Eliminando pool y sustituyendo con el cliente de prisma

- Manejo de errores con [sql-error](./src/errors/sql-error.ts) a través del middleware de manejo de errores. Los errores deben lanzarse desde la capa más cercana a los datos y viajar hasta el manejador de errores en app, donde serán lanzados como http error pero conservando la info del error original:
    - [Animals Repository](./src/animals/repositories/animals-repo.ts)
    - [Animals Controller](./src/animals/controllers/animals-controller.ts)
    - [Middleware: error-handle](./src/middleware/error-handler.ts)

- Tests:
    - [Animals Repository](./src/animals/repositories/animals-repo-test.ts)
    - [Animals Controller](./src/animals/controllers/animals-controller-test.ts)
