using Countries.Application.DTOs;
namespace Countries.Application.Interfaces;

public interface ICountryService
{
    Task<List<CountryDto>> GetAllCountriesAsync();
}