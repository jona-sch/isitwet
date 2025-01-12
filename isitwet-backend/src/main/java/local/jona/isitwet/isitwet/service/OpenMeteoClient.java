package local.jona.isitwet.isitwet.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import local.jona.isitwet.isitwet.model.OpenMeteoResult;

public class OpenMeteoClient {

    /**
     * Open-Meteo URL.
     */
    private String openMeteoUrl = "https://api.open-meteo.com/v1/";

    /**
     * Template used to create and send REST requests.
     */
    @Autowired
    private RestTemplate restTemplate;

    /**
     * Make the request to Open-Meteo API and format answer as OpenMeteoResult.
     *
     * @param longitude float.
     * @param latitude float.
     *
     * @return OpenMeteoResult instance containing the response from Open-Meteo.
     */
    public OpenMeteoResult getWeather(Float longitude, Float latitude) {
        var url = this.openMeteoUrl
            + "/forecast?latitude=" + latitude + "&longitude=" + longitude
            + "&daily=temperature_2m_max,temperature_2m_min,sunshine_duration,rain_sum,weather_code,snowfall_sum"
            + "&hourly=temperature_2m,relative_humidity_2m,rain,snowfall,weather_code"
            + "&timezone=GMT"
            + "&past_days=2"
            + "&forecast_days=2";
        var request = new HttpEntity<String>("", this.getHeaders());

        try {
            var response = this.restTemplate.exchange(url, HttpMethod.GET, request, OpenMeteoResult.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new HttpClientErrorException(
                    response.getStatusCode(),
                    response.getBody().toString()
                );
            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new HttpClientErrorException(
                e.getStatusCode(),
                "Problem with Open-Meteo: " + e.getMessage()
            );
        }
    }

    /**
     * Generate headers for our request.
     *
     * @return HttpHeaders instance.
     */
    private HttpHeaders getHeaders() {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return headers;
    }
}
