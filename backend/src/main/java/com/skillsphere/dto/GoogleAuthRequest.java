package com.skillsphere.dto;

import jakarta.validation.constraints.NotBlank;

public class GoogleAuthRequest {

    @NotBlank
    private String credential; // the ID token returned by Google Identity Services

    public String getCredential() { return credential; }
    public void setCredential(String credential) { this.credential = credential; }
}
