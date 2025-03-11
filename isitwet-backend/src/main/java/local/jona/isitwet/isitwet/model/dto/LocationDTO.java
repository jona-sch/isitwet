package local.jona.isitwet.isitwet.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDTO {
    /**
     * Id.
     */
    private Long id;

    /**
     * Longitude.
     */
    private Float longitude;

    /**
     * Latitude.
     */
    private Float latitude;

    /**
     * Name.
     */
    private String name;

}
