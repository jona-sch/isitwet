package local.jona.isitwet.isitwet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import local.jona.isitwet.isitwet.model.dto.WeatherDTO;
import local.jona.isitwet.isitwet.model.mapper.OpenMeteoResultMapper;

@Service
public class WeatherService {

    @Autowired
    private OpenMeteoResultMapper openMeteoResultMapper;

    @Autowired
    private OpenMeteoClient openMeteoClient; 

    public WeatherDTO getWeather(Float longitude, Float latitude) {
        var response = this.openMeteoClient.getWeather(longitude, latitude);
        var result = this.openMeteoResultMapper.openMeteoResultToWeatherDTO(response);
        return result;
    }
}
