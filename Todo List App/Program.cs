using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Todo_List_App.Data;
using Todo_List_App.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173",
                                "http://192.168.1.151:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddDbContext<TodoContext>(options => 
    options.UseSqlite("Data Source=todos.db"));

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/", () => "ToDo App is Running");

app.MapGet("/todos", async (TodoContext db) => 
    await db.Todos
    .OrderBy(todo => todo.SortOrder)
    .ThenBy(todo => todo.Id) 
    .ToListAsync());

app.MapGet("/todos/{id}", async (int id, TodoContext db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
    {
        return Results.NotFound("Todo not found");
    }

    return Results.Ok(todo);
});

app.MapPost("/todos", async (TodoItem todo, TodoContext db) =>
{
    var highestSortOrder = await db.Todos
    .Select(existingTodo => (int?)existingTodo.SortOrder)
    .MaxAsync() ?? -1;

    todo.SortOrder = highestSortOrder +1;

    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todos/{todo.Id}", todo);
});

app.MapPut("/todos/{id}", async (int id, TodoItem updatedTodo, TodoContext db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
    {
        return Results.NotFound();      
    }

    todo.Title = updatedTodo.Title;
    todo.IsComplete = updatedTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.Ok(todo);
});

app.MapDelete("/todos/{id}", async (int id, TodoContext db) => 
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null)
    {
        return Results.NotFound();
    }

    db.Todos.Remove(todo);

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapPut("/todos/reorder", async (List<int> todoIds, TodoContext db) =>
{
    var todos = await db.Todos
        .Where(todo => todoIds.Contains(todo.Id))
        .ToListAsync();

    for (var index = 0; index < todoIds.Count; index++)
    {
        var todo = todos.FirstOrDefault(todo => todo.Id == todoIds[index]);

        if (todo is not null)
        {
            todo.SortOrder = index;
        }
    }

    await db.SaveChangesAsync();
    return Results.NoContent();
});



app.Run();