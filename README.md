## Meld-CX Exam

![Demo](./demo.gif)

### Requirements

- Node >=20.9
- MySQL 8

### TechStack

- WebSocket
- NextJS


### Start

- `cp .env.example .env`
- Replace the values
- `docker compose up -d`
- `npm install`
- `npx prisma migrate dev`
- `node ./prisma/seeders/index.js`
- `yarn dev` or `npm run dev`


### Credentials

**Username** | **Password**
---------|---------
`exam@examiner.com` | `Default123!`
`dev@examiner.com` | `Default123!`


### Sequence

```mermaid
sequenceDiagram
   Examiner->>Developer: Hi I, login
   Developer->>Examiner: Great, will get all user to list down
   Developer->>Examiner: Find ya in the list
   Developer->>Examiner: I ping you, did you get it?
   Examiner->>Developer: Yes, I received it
```


### Flowchart (notification)

```mermaid
flowchart TD
    A[Login] --> B{Notification event}
    B -->|New client| C((Users))
    
    C -->|Clicked| D[Listed User]
    D -->|Notify| B
    B -->|Notified| E(Alerted)
```


### Schema

```mermaid
erDiagram
    User ||..o| Session : has

    User {
        string(100) id PK
        string(199) name
        string(99) email
        string(100) password
        verified_at deactivated_at
        datetime deactivated_at
        datetime login_at
        datetime created_at
        datetime updated_at
    }

    Session {
        string(100) id PK
        string user_id FK
        string(50) access_token
        string(50) access_token
        datetime access_token
        datetime created_at
        datetime updated_at
    }
```
