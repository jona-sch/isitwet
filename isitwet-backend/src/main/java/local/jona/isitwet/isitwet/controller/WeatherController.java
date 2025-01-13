package local.jona.isitwet.isitwet.controller;


import io.swagger.v3.oas.annotations.responses.ApiResponse;
import local.jona.isitwet.isitwet.data.LocationRepository;
import local.jona.isitwet.isitwet.model.dto.WeatherDTO;
import local.jona.isitwet.isitwet.service.WeatherService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping(value = "api/v1/weather", produces = {MediaType.APPLICATION_JSON_VALUE})
public class WeatherController {

    private final LocationRepository locationRepository;

    protected WeatherService weatherService;


    public WeatherController(WeatherService weatherService, LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
        this.weatherService = weatherService;
    }
    

    @GetMapping("")
    @ApiResponse(description = "Get weather for a specific longitude/latitude.", responseCode = "200")
    public ResponseEntity<WeatherDTO> getWeather(
            @RequestParam(required = true) Float longitude,
            @RequestParam(required = true) Float latitude,
            @RequestParam(required = false, defaultValue = "GMT") String timezone
        ) {
        var response = this.weatherService.getWeather(longitude, latitude, timezone);
        return ResponseEntity.ok(response);
    }
    


    @GetMapping("/{id}")
    @ApiResponse(description = "Get weather for a specific location.", responseCode = "200")
    public ResponseEntity<WeatherDTO> getWeather(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "GMT") String timezone
        ) {
        var location = locationRepository.findById(id);
        if (location.isPresent()) {
            var response = this.weatherService.getWeather(location.get().getLongitude(), location.get().getLatitude(), timezone);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().build();
    }

}
