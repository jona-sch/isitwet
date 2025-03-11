package local.jona.isitwet.isitwet;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import local.jona.isitwet.isitwet.model.mapper.LocationMapper;
import local.jona.isitwet.isitwet.model.mapper.OpenMeteoResultMapper;
import local.jona.isitwet.isitwet.service.OpenMeteoClient;

@Configuration
public class IsItWetConfig {

    /**
     * OpenMeteoClient Bean.
     *
     * @return OpenMeteoClient instance.
     */
    @Bean
    public OpenMeteoClient getOpenMeteoClient() {
        return new OpenMeteoClient();
    }

    /**
     * RestTemplate Bean.
     *
     * @return RestTemplate instance.
     */
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    /**
     * OpenMeteoResultMapper Bean.
     *
     * @return OpenMeteoResultMapper instance.
     */
    @Bean
    public OpenMeteoResultMapper getOpenMeteoResultMapper() {
        return new OpenMeteoResultMapper();
    }

    /**
     * LocationMapper Bean.
     *
     * @return LocationMapper instance.
     */
    @Bean
    public LocationMapper getLocationMapper() {
        return new LocationMapper();
    }
}
