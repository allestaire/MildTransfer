## Meld-CX Exam



### Requirements

- Node >=20.9
- MySQL 8


### Start

- `npm install`
- `npx prisma migrate dev`
- `node ./prisma/seeders/index.js`
- `yarn dev` or `npm run dev`


### Schema

```mermaid
erDiagram
    User {
        string(100) id PK
        string(99) email
        string(100) password
        datetime deactivated_at
        datetime created_at
        datetime updated_at
    }
```
