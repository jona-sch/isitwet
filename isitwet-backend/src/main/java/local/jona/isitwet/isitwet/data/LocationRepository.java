package local.jona.isitwet.isitwet.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByNameIgnoreCaseContaining(String nameSlice);
}
