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
    public ResponseEntity<Location> createLocation(@RequestBody Location Location) throws URISyntaxException {
        Location savedLocation = locationRepository.save(Location);
        return ResponseEntity.created(new URI("/locations/" + savedLocation.getId())).body(savedLocation);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Location> updateLocation(@PathVariable Long id, @RequestBody Location Location) {
        Location currentLocation = locationRepository.findById(id).orElseThrow(RuntimeException::new);
        currentLocation.setLatitude(Location.getLatitude());
        currentLocation.setLongitude(Location.getLongitude());
        currentLocation = locationRepository.save(Location);

        return ResponseEntity.ok(currentLocation);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLocation(@PathVariable Long id) {
        locationRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}