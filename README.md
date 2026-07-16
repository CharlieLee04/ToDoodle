# Todoodle

Todoodle is a full-stack task management application built with React, ASP.NET Core, Entity Framework Core and SQLite.

The project started as a way to learn how a React frontend communicates with a .NET backend, but gradually evolved into
a desktop-inspired application with smooth interactions and persistent local storage.

## Features

- Create, edit and complete tasks
- Persistent SQLite database
- Drag-and-drop task reordering
- Gesture-based deletion by dragging cards into a delete zone
- Live search
- Filter by active or completed tasks
- Double-click to mark tasks as complete
- Responsive card-based interface

## Built With

### Frontend

- React
- Vite
- Motion
- CSS

### Backend

- ASP.NET Core Minimal APIs
- Entity Framework Core
- SQLite

## Running the project

### Backend

```bash
cd "Todo List App"
dotnet restore
dotnet ef database update
dotnet run
```

The API runs on:

```
http://localhost:5206
```

### Frontend

```bash
cd todo-frontend
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

## What I Learned

This was my first project combining a React frontend with an ASP.NET Core backend and a SQLite database.

Throughout the project I learned how to:

- Structure a React application using reusable components
- Manage application state with React hooks
- Implement drag-and-drop interactions and animations

One of the parts I enjoyed most was moving beyond the basic functionality of a to-do app and focusing on making the interactions
feel polished. Features such as dragging cards to reorder them and deleting tasks by dragging them into a delete zone made the
project much more interesting to build.

## Future Improvements

Some ideas I'd like to add in the future include:

- Dark mode
- Due dates and reminders
- Categories or tags
- Cloud synchronisation
- Mobile version

## Author

Charlie Lee
