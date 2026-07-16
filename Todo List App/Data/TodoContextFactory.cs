using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Todo_List_App.Data;

public class TodoContextFactory : IDesignTimeDbContextFactory<TodoContext>
{
    public TodoContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TodoContext>();

        optionsBuilder.UseSqlite("Data Source=todos.db");

        return new TodoContext(optionsBuilder.Options);
    }
}