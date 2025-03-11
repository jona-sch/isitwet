package local.jona.isitwet.isitwet;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(enableDefaultTransactions = false) // This prevents Spring Data JPA from making every Repository
                                                          // method transactional, leading to potential non-ACID
                                                          // behavior
public class JpaRepositoryConfiguration {

}
