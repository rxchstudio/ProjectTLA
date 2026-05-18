using System.Text.Json.Serialization;

namespace Countries.Infrastructure.Models;

public class RestCountryResponse
{
    [JsonPropertyName("name")]
    public NameInfo Name { get; set; } = new();

    [JsonPropertyName("capital")]
    public List<string> Capital { get; set; } = new();

    [JsonPropertyName("continents")]
    public List<string> Continents { get; set; } = new();

    [JsonPropertyName("fifa")]
    public string FifaCode { get; set; } = string.Empty;

    [JsonPropertyName("area")]
    public double Area { get; set; }

    [JsonPropertyName("languages")]
    public Dictionary<string, string> Languages { get; set; } = new();

    [JsonPropertyName("population")]
    public long Population { get; set; }
}

public class NameInfo
{
    [JsonPropertyName("common")]
    public string Common { get; set; } = string.Empty;
}