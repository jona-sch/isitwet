package local.jona.isitwet.isitwet.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import local.jona.isitwet.isitwet.data.Location;
import local.jona.isitwet.isitwet.data.LocationRepository;
import local.jona.isitwet.isitwet.model.dto.LocationDTO;
import local.jona.isitwet.isitwet.model.mapper.LocationMapper;
import local.jona.isitwet.isitwet.model.mapper.OpenMeteoResultMapper;


@RestController
@RequestMapping("api/v1/locations")
public class LocationController {

    private final LocationRepository locationRepository;

    @Autowired
    private LocationMapper locationMapper;

    public LocationController(LocationRepository locationRepository,
            LocationMapper locationMapper) {
        this.locationRepository = locationRepository;
        this.locationMapper = locationMapper;
    }


    @GetMapping
    public List<Location> getLocations(@AuthenticationPrincipal Jwt jwt) {
        var userId = jwt.getSubject();
        return locationRepository.findByUserId(userId);
    }


    @GetMapping("/query")
    public List<Location> getLocation(@AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = true) String nameSlice
    ) {
        var userId = jwt.getSubject();
        return locationRepository.findByNameIgnoreCaseContainingAndUserId(nameSlice, userId);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getLocation(@AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id) {
        var userId = jwt.getSubject();
        var location = locationRepository.findById(id).orElseThrow(RuntimeException::new);
        if (!location.getUserId().equals(userId)) {
            return ResponseEntity.badRequest().body("This location does not exist.");
        }
        return ResponseEntity.ok().body(locationMapper.locationToLocationDTO(location));
    }


    @PostMapping
    public ResponseEntity<?> createLocation(@AuthenticationPrincipal Jwt jwt,
            @RequestBody LocationDTO locationInput) throws URISyntaxException {
        var userId = jwt.getSubject();
        var existingLocation = locationRepository.findByNameIgnoreCaseAndUserId(locationInput.getName(), userId);
        if (!existingLocation.isEmpty()) {
            return ResponseEntity.badRequest().body("A location with this name already exists.");
        }
        var location = locationMapper.locationDTOToLocation(locationInput);
        location.setUserId(userId);
        var savedLocation = locationMapper.locationToLocationDTO(locationRepository.save(location));
        return ResponseEntity.created(new URI("/locations/" + savedLocation.getId())).body(savedLocation);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateLocation(@AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id, @RequestBody Location location) {
        var userId = jwt.getSubject();
        var currentLocation = locationRepository.findById(id).orElseThrow(RuntimeException::new);
        if (!currentLocation.getUserId().equals(userId)) {
            return ResponseEntity.badRequest().body("This location does not exist.");
        }
        var existingNameLocation = locationRepository.findByNameIgnoreCaseAndUserId(location.getName(), userId);
        if (!existingNameLocation.isEmpty() && !location.getName().equals(currentLocation.getName())) {
            return ResponseEntity.badRequest().body("A location with this name already exists.");
        }
        currentLocation.setLatitude(location.getLatitude());
        currentLocation.setLongitude(location.getLongitude());
        currentLocation.setName(location.getName());
        currentLocation = locationRepository.save(currentLocation);

        return ResponseEntity.ok(currentLocation);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id) {
        var userId = jwt.getSubject();
        var currentLocation = locationRepository.findById(id).orElseThrow(RuntimeException::new);
        if (!currentLocation.getUserId().equals(userId)) {
            return ResponseEntity.badRequest().build();
        }
        locationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}