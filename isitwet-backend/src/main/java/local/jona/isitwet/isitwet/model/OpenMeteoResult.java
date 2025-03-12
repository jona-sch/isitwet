package local.jona.isitwet.isitwet.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import local.jona.isitwet.isitwet.model.format.DurationFormat;
import local.jona.isitwet.isitwet.model.format.PrecipitationFormat;
import local.jona.isitwet.isitwet.model.format.TemperatureFormat;
import local.jona.isitwet.isitwet.model.format.TimeFormat;
import lombok.Data;


@Data
public class OpenMeteoResult {
    /**
     * Longitude of the request.
     */
    private Float longitude;
    
    /**
     * Latitude of the request.
     */
    private Float latitude;
    
    /**
     * Generation time of the request (in ms).
     */
    @JsonProperty("generationtime_ms")
    private Float generationTimeMs;
    
    /**
     * UTC offset (in s).
     */
    @JsonProperty("utc_offset_seconds")
    private Float UtcOffset;
    
    /**
     * Timezone for datetimes.
     */
    private String timezone;
    
    /**
     * Timezone abbreviation.
     */
    @JsonProperty("timezone_abbreviation")
    private String timezoneAbbreviation;
    
    /**
     * Elevation of the requested location.
     */
    private Float elevation;
    
    /**
     * Daily units.
     */
    @JsonProperty("daily_units")
    private DailyUnits dailyUnits;
    
    /**
     * Daily units.
     */
    @JsonProperty("hourly_units")
    private HourlyUnits hourlyUnits;

    /**
     * Daily metrics.
     */
    private DailyMetrics daily;

    /**
     * Daily metrics.
     */
    private HourlyMetrics hourly;


    @Data
    public class DailyUnits {
    
        /**
         * Time format.
         */
        @JsonProperty("time")
        private TimeFormat timeFormat;
    
        /**
         * Minimal temperature format.
         */
        @JsonProperty("temperature_2m_max")
        private TemperatureFormat maxTemperatureFormat;
    
        /**
         * Minimal temperature format.
         */
        @JsonProperty("temperature_2m_min")
        private TemperatureFormat minTemperatureFormat;
    
        /**
         * Sunshine duration format.
         */
        @JsonProperty("sunshine_duration")
        private DurationFormat sunshineDurationFormat;
    
        /**
         * Rain sum format.
         */
        @JsonProperty("rain_sum")
        private PrecipitationFormat rainSumFormat;
    
        /**
         * Snowfall sum format.
         */
        @JsonProperty("snowfall_sum")
        private PrecipitationFormat snowfallFormat;
    
        /**
         * Wind speed format.
         */
        @JsonProperty("wind_speed_10m_max")
        private String windSpeedFormat;
    
        /**
         * Wind direction format.
         */
        @JsonProperty("wind_direction_10m_dominant")
        private String windDirectionFormat;
    }


    @Data
    public class HourlyUnits {
    
        /**
         * Time format.
         */
        @JsonProperty("time")
        private TimeFormat timeFormat;
    
        /**
         * Minimal temperature format.
         */
        @JsonProperty("temperature_2m")
        private TemperatureFormat temperatureFormat;
    
        /**
         * Sunshine duration format.
         */
        @JsonProperty("relative_humidity_2m")
        private String relativeHumidityFormat;
    
        /**
         * Rain sum format.
         */
        @JsonProperty("rain")
        private PrecipitationFormat rainFormat;
    
        /**
         * Snowfall format.
         */
        @JsonProperty("snowfall")
        private PrecipitationFormat snowfallFormat;
    
        /**
         * Wind speed format.
         */
        @JsonProperty("wind_speed_10m")
        private String windSpeedFormat;
    
        /**
         * Wind direction format.
         */
        @JsonProperty("wind_direction_10m")
        private String windDirectionFormat;
    }


    @Data
    public class DailyMetrics {
    
        /**
         * Times (format='YYYY-MM-DD').
         */
        @JsonProperty("time")
        private List<String> times;
    
        /**
         * Max temperatures.
         */
        @JsonProperty("temperature_2m_max")
        private List<Float> maxTemperatures;
    
        /**
         * Min temperatures.
         */
        @JsonProperty("temperature_2m_min")
        private List<Float> minTemperatures;
    
        /**
         * Sunshine duration.
         */
        @JsonProperty("sunshine_duration")
        private List<Float> sunshineDurations;
    
        /**
         * Rain sum.
         */
        @JsonProperty("rain_sum")
        private List<Float> rainSums;
    
        /**
         * Weather code (0-99): https://github.com/woheller69/omweather/blob/master/wmo_codes.png.
         */
        @JsonProperty("weather_code")
        private List<Integer> weatherCodes;
    
        /**
         * Snowfall sum.
         */
        @JsonProperty("snowfall_sum")
        private List<Float> snowfallSums;
    
        /**
         * Wind speeds.
         */
        @JsonProperty("wind_speed_10m_max")
        private List<Float> windSpeeds;
    
        /**
         * Wind directions.
         */
        @JsonProperty("wind_direction_10m_dominant")
        private List<Float> windDirections;
    }


    @Data
    public class HourlyMetrics {
    
        /**
         * Times (format='YYYY-MM-DD').
         */
        @JsonProperty("time")
        private List<String> times;
    
        /**
         * Max temperatures.
         */
        @JsonProperty("temperature_2m")
        private List<Float> temperatures;
    
        /**
         * Sunshine duration.
         */
        @JsonProperty("relative_humidity_2m")
        private List<Float> relativeHumidity;
    
        /**
         * Rain.
         */
        @JsonProperty("rain")
        private List<Float> rain;
    
        /**
         * Snowfall.
         */
        @JsonProperty("snowfall")
        private List<Float> snowfall;
    
        /**
         * Weather code (0-99): https://github.com/woheller69/omweather/blob/master/wmo_codes.png.
         */
        @JsonProperty("weather_code")
        private List<Integer> weatherCodes;
    
        /**
         * Wind speeds.
         */
        @JsonProperty("wind_speed_10m")
        private List<Float> windSpeeds;
    
        /**
         * Wind directions.
         */
        @JsonProperty("wind_direction_10m")
        private List<Float> windDirections;
    }

}
