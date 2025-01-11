package local.jona.isitwet.isitwet.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyFloat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import local.jona.isitwet.isitwet.model.OpenMeteoResult;
import local.jona.isitwet.isitwet.model.dto.WeatherDTO;
import local.jona.isitwet.isitwet.model.mapper.OpenMeteoResultMapper;


public class WeatherServiceTests {

    @Mock
    OpenMeteoClient localClientMock;

    @Mock
    OpenMeteoResultMapper mapper;

    @InjectMocks
    WeatherService weatherService; 

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

	@Test
	void testGetWeather() {
        var result = new OpenMeteoResult();
        result.setLongitude(0.5F);
        result.setLatitude(1.0F);
        result.setElevation(150F);
        var endResult = new WeatherDTO();
        Mockito.when(localClientMock.getWeather(anyFloat(), anyFloat())).thenReturn(result);
        Mockito.when(mapper.openMeteoResultToWeatherDTO(result)).thenReturn(endResult);
        var weatherDTO = weatherService.getWeather(0.5F, 1.0F);
        assertEquals(endResult, weatherDTO, "We expect the output of the mapper as end result.");
	}  
}
