package com.skillsphere.config;

import com.skillsphere.security.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {


    private final JwtAuthFilter jwtAuthFilter;


    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {

        this.jwtAuthFilter = jwtAuthFilter;

    }



    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();

    }




    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http
    ) throws Exception {


        http

            .csrf(csrf ->
                csrf.disable()
            )


            .cors(cors ->
                cors.configurationSource(
                    corsConfigurationSource()
                )
            )


            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )


            .authorizeHttpRequests(auth -> auth


                // ==========================
                // PUBLIC AUTH APIs
                // ==========================

                .requestMatchers(
                    "/api/auth/**"
                )
                .permitAll()



                // ==========================
                // NEWSLETTER PUBLIC
                // ==========================

                .requestMatchers(
                    "/api/newsletter/**"
                )
                .permitAll()



                // ==========================
                // CHATBOT PUBLIC
                // ==========================

                .requestMatchers(
                    "/api/chat/**"
                )
                .permitAll()



                // ==========================
                // ADMIN COURSE READ
                // ==========================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/courses/admin"
                )
                .hasRole("ADMIN")



                // ==========================
                // COURSE READ PUBLIC
                // ==========================

                .requestMatchers(
                    HttpMethod.GET,
                    "/api/courses",
                    "/api/courses/**",
                    "/api/reviews/**",
                    "/api/complaints/**",
                    "/api/career-roadmaps/**",
                    "/images/**"
                )
                .permitAll()



                // ==========================
                // ADMIN COURSE MANAGEMENT
                // ==========================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/courses",
                    "/api/courses/**"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/courses",
                    "/api/courses/**"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/courses",
                    "/api/courses/**"
                )
                .hasRole("ADMIN")



                // ==========================
                // MODULE MANAGEMENT (ADMIN)
                // ==========================

                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/modules/**"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/modules/**"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.GET,
                    "/api/modules/**"
                )
                .permitAll()



                .requestMatchers(
                    HttpMethod.POST,
                    "/api/modules/**"
                )
                .hasRole("ADMIN")



                // ==========================
                // LESSON ADMIN
                // ==========================

                .requestMatchers(
                    HttpMethod.POST,
                    "/api/modules/*/lessons"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.PUT,
                    "/api/lessons/*"
                )
                .hasRole("ADMIN")



                .requestMatchers(
                    HttpMethod.DELETE,
                    "/api/lessons/*"
                )
                .hasRole("ADMIN")


                // ==========================
                // ADMIN APIs
                // ==========================

                .requestMatchers(
                    "/api/admin",
                    "/api/admin/**"
                )
                .hasRole("ADMIN")



                // ==========================
                // USER FEATURES
                // ==========================

                .requestMatchers(
                    "/api/enrollments",
                    "/api/enrollments/**"
                )
                .authenticated()



                .requestMatchers(
                    "/api/dashboard",
                    "/api/dashboard/**"
                )
                .authenticated()



                // ==========================
                // EVERYTHING ELSE
                // ==========================

                .anyRequest()
                .authenticated()

            )



            .addFilterBefore(

                jwtAuthFilter,

                UsernamePasswordAuthenticationFilter.class

            );



        return http.build();

    }





    @Bean
    public CorsConfigurationSource corsConfigurationSource() {


        CorsConfiguration config =
                new CorsConfiguration();



        config.setAllowedOriginPatterns(
            List.of("*")
        );



        config.setAllowedMethods(
            List.of(
                "GET",
                "POST",
                "PUT",
                "PATCH",
                "DELETE",
                "OPTIONS"
            )
        );



        config.setAllowedHeaders(
            List.of("*")
        );



        config.setAllowCredentials(
            true
        );



        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();



        source.registerCorsConfiguration(
            "/**",
            config
        );



        return source;

    }


}