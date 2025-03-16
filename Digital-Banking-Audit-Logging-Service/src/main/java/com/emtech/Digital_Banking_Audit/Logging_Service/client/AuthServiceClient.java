package com.emtech.Digital_Banking_Audit.Logging_Service.client;

//import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "Digital-Banking-User-Service", url = "http://localhost:9090/api/users")
public interface AuthServiceClient {


    @GetMapping("/validate/{token}")
    ResponseEntity<Boolean> validateToken(@PathVariable("token") String token);

    @GetMapping("/extract-username")
    ResponseEntity<String> extractUsername(@RequestParam("token") String token);
}
