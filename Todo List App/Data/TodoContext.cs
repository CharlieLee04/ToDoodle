using Microsoft.EntityFrameworkCore;
using Todo_List_App.Models;

namespace Todo_List_App.Data;

public class TodoContext : DbContext 
{

    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> Todos { get; set; }
    
}