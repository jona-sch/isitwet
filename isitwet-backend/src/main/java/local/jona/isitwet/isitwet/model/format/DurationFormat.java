package local.jona.isitwet.isitwet.model.format;

import com.fasterxml.jackson.annotation.JsonProperty;


public enum DurationFormat {
    /**
     * Second.
     */
    @JsonProperty("s")
    SECOND,

    /**
     * Minute.
     */
    @JsonProperty("m")
    MINUTE,

    /**
     * Hour.
     */
    @JsonProperty("h")
    HOUR
}
