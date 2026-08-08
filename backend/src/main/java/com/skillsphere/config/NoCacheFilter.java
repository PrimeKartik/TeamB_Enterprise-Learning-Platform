package com.skillsphere.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Every response from this API is marked non-cacheable.
 *
 * Without this, the browser's HTTP cache can serve a previously-fetched
 * authenticated GET response (e.g. /api/wishlist, /api/enrollments/my) to a
 * DIFFERENT user later on, because the standard browser cache key is based
 * on the request URL only — it does NOT take the Authorization header into
 * account. So: User1 logs in, GETs /api/wishlist, browser caches it. User1
 * logs out, User2 logs in with a fresh token, GETs the same URL — without
 * this header, the browser may silently return User1's cached response
 * instead of hitting the server, making it look like wishlists (or any
 * other per-user data) are "shared" between accounts.
 */
@Component
@Order(1)
public class NoCacheFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        if (response instanceof HttpServletResponse httpResponse) {
            httpResponse.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
            httpResponse.setHeader("Pragma", "no-cache");
            httpResponse.setHeader("Expires", "0");
        }

        chain.doFilter(request, response);
    }
}
