# Task Management

מערכת לניהול משימות הכוללת Client ב-Angular ושרת REST API ב-ASP.NET Core.

## Stack

### Client
- Angular
- TypeScript
- Bootstrap 5
- Bootstrap Icons
- Reactive Forms
- NgRx

### Server
- ASP.NET Core
- .NET 10
- REST API
- Swagger / OpenAPI

## דרישות מקדימות

יש להתקין:
- Node.js ו-npm
- Angular CLI
- .NET 10 SDK

בדיקת גרסאות:

```bash
node --version
npm --version
ng version
dotnet --version
```

## הרצת השרת

מתיקיית הפרויקט:

```bash
cd server/TaskManagement.Api
dotnet restore
dotnet run
```

השרת זמין ב:

```text
http://localhost:5279
```

Swagger:

```text
http://localhost:5279/swagger
```

## הרצת האפליקציה

יש לפתוח Terminal נוסף ולעבור לתיקיית ה-Client:

```bash
cd client
npm install
ng serve
```

האפליקציה זמינה ב:

```text
http://localhost:4200
```

> יש להתאים את `cd client` לשם תיקיית ה-Client בפועל אם היא שונה בפרויקט.

## מבנה הפרויקט

```text
TaskManagement/
├── server/
│   └── TaskManagement.Api/
│       ├── Controllers/
│       ├── Models/
│       ├── Services/
│       ├── Validators/
│       └── Program.cs
│
└── client/
    └── src/
        └── app/
            ├── core/
            ├── features/
            ├── models/
            └── ...
```

## פונקציונליות

המערכת מאפשרת:
- הצגת רשימת משימות
- הוספת משימה
- עריכת משימה
- מחיקת משימה
- ולידציה בצד Client ובצד Server
- הצגת שגיאות API
- בחירת עדיפות וסטטוס
- בחירת תאריך יעד
- ממשק Responsive
- ממשק RTL בעברית
- ניהול State באמצעות NgRx

## State Management

המשימות מנוהלות באמצעות NgRx Store.

הזרימה המרכזית:

```text
Component
    ↓
Action
    ↓
Effect
    ↓
API
    ↓
Success Action
    ↓
Reducer
    ↓
Store
    ↓
Selector
    ↓
Component
```

לאחר פעולות Create / Update / Delete ה-Store מתעדכן בהתאם לתוצאת הפעולה, במקום לבצע GET מלא נוסף לאחר כל שינוי.

## API

```text
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/{id}
DELETE /api/tasks/{id}
```

## בדיקה מקומית

1. להפעיל את השרת.
2. לוודא ש-Swagger נטען.
3. להפעיל את Angular.
4. לפתוח את האפליקציה בדפדפן.
5. לוודא שרשימת המשימות נטענת.
6. ליצור משימה חדשה.
7. לערוך משימה.
8. למחוק משימה.
9. לבדוק שגיאות ולידציה.
10. לוודא שה-State מתעדכן ללא GET מיותר לאחר פעולות CRUD.


יש להעלות את פרויקט ה-Client ל-StackBlitz ולצרף את הקישור:

```text
[להוסיף כאן את קישור ה-StackBlitz]
```
