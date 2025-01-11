package local.jona.isitwet.isitwet.model.format;

import com.fasterxml.jackson.annotation.JsonProperty;


public enum TemperatureFormat {
    /**
     * Celsius.
     */
    @JsonProperty("°C")
    CELSIUS,

    /**
     * Fahrenheit.
     */
    @JsonProperty("°F")
    FAHRENHEIT
}
