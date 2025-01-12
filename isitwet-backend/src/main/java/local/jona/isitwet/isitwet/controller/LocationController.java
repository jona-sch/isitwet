package local.jona.isitwet.isitwet.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.http.ResponseEntity;
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


@RestController
@RequestMapping("api/v1/locations")
public class LocationController {

    private final LocationRepository locationRepository;

    
    public LocationController(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }


    @GetMapping
    public List<Location> getLocations() {
        return locationRepository.findAll();
    }


    @GetMapping("/query")
    public List<Location> getLocation(
            @RequestParam(required = true) String nameSlice
    ) {
        return locationRepository.findByNameIgnoreCaseContaining(nameSlice);
    }


    @GetMapping("/{id}")
    public Location getLocation(@PathVariable Long id) {
        return locationRepository.findById(id).orElseThrow(RuntimeException::new);
    }


    @PostMapping
    public ResponseEntity<?> createLocation(@RequestBody Location location) throws URISyntaxException {
        var existingLocation = locationRepository.findByNameIgnoreCaseContaining(location.getName());
        if (!existingLocation.isEmpty()) {
            return ResponseEntity.badRequest().body("A location with this name already exists.");
        }
        var savedLocation = locationRepository.save(location);
        return ResponseEntity.created(new URI("/locations/" + savedLocation.getId())).body(savedLocation);
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable Long id, @RequestBody Location location) {
        var currentLocation = locationRepository.findById(id).orElseThrow(RuntimeException::new);
        var existingNameLocation = locationRepository.findByNameIgnoreCaseContaining(location.getName());
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
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}