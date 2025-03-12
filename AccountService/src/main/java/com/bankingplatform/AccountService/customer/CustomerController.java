package com.bankingplatform.AccountService.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://172.16.2.61:4200, http://172.16.1.166:4200")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // POST method to register a customer
    @PostMapping("/register")
    public ResponseEntity<?> registerCustomer(@RequestBody CustomerEntity customer) {
        CustomerEntity newCustomer = customerService.registerCustomer(customer);
        return ResponseEntity.ok(newCustomer);
    }

    // GET method to retrieve a customer by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable long id) {
        Optional<CustomerEntity> customer = customerService.getCustomer(id);
        return customer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET method to retrieve all customers
    @GetMapping("/all")
    public ResponseEntity<List<CustomerEntity>> getAllCustomers() {
        List<CustomerEntity> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }

    // DELETE method to delete a customer by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
