package local.jona.isitwet.isitwet.model.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;


@Data
public class WeatherDTO {
    /**
     * Longitude.
     */
    @JsonProperty(required = true)
    private Float longitude;
    
    /**
     * Latitude.
     */
    @JsonProperty(required = true)
    private Float latitude;
    
    /**
     * Altitude.
     */
    @JsonProperty(required = true)
    private Float altitude;

    /**
     * Daily.
     */
    @JsonProperty(required = true)
    private DailyWeather daily;

    /**
     * Hourly.
     */
    @JsonProperty(required = true)
    private HourlyWeather hourly;

    /**
     * Hourly.
     */
    @JsonProperty(required = true)
    private QuarterlyWeather quarterly;

    
    @Data
    public class DailyWeather {
        /**
         * Dates (format = 'YYYY-MM-DD').
         */
        @JsonProperty(required = true)
        private List<String> dates;

        /**
         * Max temperatures (in degrees Celsius).
         */
        @JsonProperty(required = true)
        private List<Float> maxTemperatures;

        /**
         * Min temperatures (in degrees Celsius).
         */
        @JsonProperty(required = true)
        private List<Float> minTemperatures;

        /**
         * Sunshine duration (in hours).
         */
        @JsonProperty(required = true)
        private List<Float> sunshineDuration;

        /**
         * Rain sum (in mm).
         */
        @JsonProperty(required = true)
        private List<Float> rainSum;

        /**
         * Weather codes.
         */
        @JsonProperty(required = true)
        private List<Integer> weatherCodes;

        /**
         * Snow (in cm).
         */
        @JsonProperty(required = true)
        private List<Float> snow;
    }

    
    @Data
    public class QuarterlyWeather {

        /**
         * Max temperatures (in degrees Celsius).
         */
        @JsonProperty(required = true)
        private List<Float> maxTemperatures;

        /**
         * Min temperatures (in degrees Celsius).
         */
        @JsonProperty(required = true)
        private List<Float> minTemperatures;

        /**
         * Sunshine duration (in hours).
         */
        @JsonProperty(required = true)
        private List<Float> sunshineDuration;

        /**
         * Rain sum (in mm).
         */
        @JsonProperty(required = true)
        private List<Float> rainSum;

        /**
         * Weather codes.
         */
        @JsonProperty(required = true)
        private List<Integer> weatherCodes;

        /**
         * Snow (in cm).
         */
        @JsonProperty(required = true)
        private List<Float> snow;
    }

    
    @Data
    public class HourlyWeather {
        /**
         * Dates (format = 'YYYY-MM-DD').
         */
        @JsonProperty(required = true)
        private List<String> times;

        /**
         * Temperatures (in degrees Celsius).
         */
        @JsonProperty(required = true)
        private List<Float> temperatures;

        /**
         * Relative humidity (in %).
         */
        @JsonProperty(required = true)
        private List<Float> relativeHumidity;

        /**
         * Rain (in mm).
         */
        @JsonProperty(required = true)
        private List<Float> rain;

        /**
         * Snow (in cm).
         */
        @JsonProperty(required = true)
        private List<Float> snow;
    }
}
