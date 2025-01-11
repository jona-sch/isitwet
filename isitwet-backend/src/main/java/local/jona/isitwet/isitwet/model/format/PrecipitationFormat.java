package local.jona.isitwet.isitwet.model.format;

import com.fasterxml.jackson.annotation.JsonProperty;


public enum PrecipitationFormat {
    /**
     * Millimeters.
     */
    @JsonProperty("mm")
    MILLIMETERS,

    /**
     * Centimeters.
     */
    @JsonProperty("cm")
    CENTIMETERS,
}
