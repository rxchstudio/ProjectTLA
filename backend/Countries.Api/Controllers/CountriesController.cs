using Countries.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Countries.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CountriesController : ControllerBase
{
    private readonly ICountryService _countryService;

    public CountriesController(ICountryService countryService)
    {
        _countryService = countryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCountries()
    {
        try
        {
            var countries = await _countryService.GetAllCountriesAsync();
            return Ok(countries);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while fetching countries.");
        }
    }
}