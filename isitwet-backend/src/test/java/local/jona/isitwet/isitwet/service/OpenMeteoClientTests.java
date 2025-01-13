package local.jona.isitwet.isitwet.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import local.jona.isitwet.isitwet.model.OpenMeteoResult;


public class OpenMeteoClientTests {

    @Mock
    RestTemplate restTemplateMock;

    @InjectMocks
    OpenMeteoClient openMeteoClient; 

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

	@Test
	void testGetWeather2xxSuccessful() {
        var expectedUrl = "https://api.open-meteo.com/v1/"
            + "/forecast?latitude=1.0&longitude=0.5"
            + "&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,rain_sum,weather_code,snowfall_sum"
            + "&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,weather_code"
            + "&past_days=2"
            + "&forecast_days=2"
            + "&timezone=Europe/London";
        var expectedResult = new OpenMeteoResult();
        expectedResult.setLongitude(0.5F);
        expectedResult.setLatitude(1.0F);
        var restResponse = new ResponseEntity<OpenMeteoResult>(expectedResult, HttpStatusCode.valueOf(200));
        Mockito.when(restTemplateMock.exchange(
            eq(expectedUrl),
            eq(HttpMethod.GET),
            any(),
            eq(OpenMeteoResult.class)
        )).thenReturn(restResponse);
        var result = openMeteoClient.getWeather(0.5F, 1.0F, "Europe/London");
        assertEquals(expectedResult, result, "We expect the body of the response to be the result.");
	}

	@Test
	void testGetWeather5xxUnsuccessful() {
        var expectedUrl = "https://api.open-meteo.com/v1/"
            + "/forecast?latitude=1.0&longitude=0.5"
            + "&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,rain_sum,weather_code,snowfall_sum"
            + "&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,weather_code"
            + "&past_days=2"
            + "&forecast_days=2"
            + "&timezone=Europe/London";
        var restResponse = new ResponseEntity<OpenMeteoResult>(new OpenMeteoResult(), HttpStatusCode.valueOf(500));
        Mockito.when(restTemplateMock.exchange(
            eq(expectedUrl),
            eq(HttpMethod.GET),
            any(),
            eq(OpenMeteoResult.class)
        )).thenReturn(restResponse);
        // var result = openMeteoClient.getWeather(0.5F, 1.0F);
        assertThrows(HttpClientErrorException.class,
            () -> openMeteoClient.getWeather(0.5F, 1.0F, "Europe/London"));
	}

	@Test
	void testGetWeatherClientException() {
        var expectedUrl = "https://api.open-meteo.com/v1/"
            + "/forecast?latitude=1.0&longitude=0.5"
            + "&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,rain_sum,weather_code,snowfall_sum"
            + "&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,weather_code"
            + "&past_days=2"
            + "&forecast_days=2"
            + "&timezone=Europe/London";
        Mockito.when(restTemplateMock.exchange(
            eq(expectedUrl),
            eq(HttpMethod.GET),
            any(),
            eq(OpenMeteoResult.class)
        )).thenThrow(new HttpClientErrorException(HttpStatusCode.valueOf(300)));
        assertThrows(HttpClientErrorException.class,
            () -> openMeteoClient.getWeather(0.5F, 1.0F, "Europe/London"));
	}
}
