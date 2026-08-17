export const UI_TEXT = {
  page: {
    title: 'ניהול משימות',
    tasks: 'משימות',
    noTasks: 'לא נמצאו משימות',
    noTasksDescription: 'אין כרגע משימות להצגה',
    loading: 'טוען משימות...'
  },

  form: {
    addTitle: 'הוספת משימה',
    editTitle: 'עריכת משימה',

    title: 'כותרת משימה',
    description: 'תיאור משימה',
    priority: 'עדיפות',
    dueDate: 'תאריך יעד',
    status: 'סטטוס',

    add: 'הוספת משימה',
    update: 'עדכון משימה',
    saving: 'שומר...',
    cancel: 'ביטול'
  },

  task: {
    edit: 'עריכת משימה',
    delete: 'מחיקת משימה',

    priority: 'עדיפות',
    status: 'סטטוס',
    dueDate: 'תאריך יעד'
  },

  validation: {
    titleRequired: 'כותרת המשימה היא שדה חובה.',
    titleMaxLength: 'כותרת המשימה אינה יכולה להכיל יותר מ־100 תווים.',
    descriptionMaxLength: 'תיאור המשימה אינו יכול להכיל יותר מ־500 תווים.',
    dueDateRequired: 'תאריך יעד הוא שדה חובה.'
  },

  errors: {
    loadTasks: 'אירעה שגיאה בטעינת המשימות.',
    createTask: 'אירעה שגיאה ביצירת המשימה.',
    updateTask: 'אירעה שגיאה בעדכון המשימה.',
    deleteTask: 'אירעה שגיאה במחיקת המשימה.'
  }
} as const;

export const TASK_PRIORITY_LABELS = {
  Low: 'נמוכה',
  Medium: 'בינונית',
  High: 'גבוהה'
} as const;

export const TASK_STATUS_LABELS = {
  Pending: 'ממתינה',
  InProgress: 'בתהליך',
  Completed: 'הושלמה'
} as const;