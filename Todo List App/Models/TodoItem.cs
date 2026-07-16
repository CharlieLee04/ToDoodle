namespace Todo_List_App.Models;

public class TodoItem 
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public bool IsComplete { get; set; }
    public int SortOrder { get; set; }
}
