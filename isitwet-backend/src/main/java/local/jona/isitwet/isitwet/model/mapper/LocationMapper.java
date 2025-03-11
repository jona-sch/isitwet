package local.jona.isitwet.isitwet.model.mapper;

import local.jona.isitwet.isitwet.data.Location;
import local.jona.isitwet.isitwet.model.dto.LocationDTO;

public class LocationMapper {
    
    public Location locationDTOToLocation(LocationDTO input) {
        var location = new Location();
        location.setId(input.getId());
        location.setLatitude(input.getLatitude());
        location.setLongitude(input.getLongitude());
        location.setName(input.getName());
        return location;
    }
    
    public LocationDTO locationToLocationDTO(Location input) {
        var locationDTO = new LocationDTO();
        locationDTO.setId(input.getId());
        locationDTO.setLatitude(input.getLatitude());
        locationDTO.setLongitude(input.getLongitude());
        locationDTO.setName(input.getName());
        return locationDTO;
    }
}
