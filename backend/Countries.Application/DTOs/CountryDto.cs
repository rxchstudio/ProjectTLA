namespace Countries.Application.DTOs;

public class CountryDto
{
    public string Name { get; set; } = string.Empty;
    public string Capital { get; set; } = string.Empty;
    public string Continent { get; set; } = string.Empty;
    public string FifaCode { get; set; } = string.Empty;
    public double Area { get; set; }
    public string Language { get; set; } = string.Empty;
    public long Population { get; set; }
}