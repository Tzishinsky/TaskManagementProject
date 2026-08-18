# Task Management

מערכת לניהול משימות הכוללת Client ב-Angular ושרת REST API ב-ASP.NET Core.

## Stack

### Client
- Angular
- TypeScript
- Bootstrap 5
- Bootstrap Icons
- Reactive Forms
- NgRx *

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

(זו צורת הפיתרון הנכונה שמפאת חוסר הזמן לא הגעתי אליה )
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
 שימוש מהנה !