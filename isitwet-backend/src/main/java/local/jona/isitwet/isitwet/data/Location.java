package local.jona.isitwet.isitwet.data;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "client")
@Getter
@Setter
public class Location {

    /**
     * Id.
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Longitude.
     */
    @NotNull
    private Float longitude;

    /**
     * Latitude.
     */
    @NotNull
    private Float latitude;

    /**
     * Name.
     */
    @NotNull
    private String name;
}