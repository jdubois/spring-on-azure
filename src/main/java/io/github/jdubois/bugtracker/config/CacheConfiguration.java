package io.github.jdubois.bugtracker.config;

import io.github.jhipster.config.JHipsterConstants;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Profile;

@EnableCaching
@Profile(JHipsterConstants.SPRING_PROFILE_PRODUCTION)
public class CacheConfiguration {
}
