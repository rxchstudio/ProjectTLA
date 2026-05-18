using System.Text.Json;
using Countries.Application.DTOs;
using Countries.Application.Interfaces;
using Countries.Infrastructure.Models;

namespace Countries.Infrastructure.Services;

public class CountryService : ICountryService
{
    private readonly HttpClient _httpClient;

    public CountryService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<CountryDto>> GetAllCountriesAsync()
    {
        var response = await _httpClient.GetAsync("https://restcountries.com/v3.1/all?fields=name,capital,continents,fifa,area,languages,population");
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var countries = JsonSerializer.Deserialize<List<RestCountryResponse>>(content) ?? new List<RestCountryResponse>();

        return countries.Select(c => new CountryDto
        {
            Name = c.Name.Common,
            Capital = c.Capital.FirstOrDefault() ?? "N/A",
            Continent = c.Continents.FirstOrDefault() ?? "N/A",
            FifaCode = c.FifaCode,
            Area = c.Area,
            Language = c.Languages.Values.FirstOrDefault() ?? "N/A",
            Population = c.Population
        }).ToList();
    }
}