package com.bankingplatform.AccountService.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public CustomerEntity registerCustomer(CustomerEntity customerEntity) {
        return customerRepository.save(customerEntity);

    }

    public Optional<CustomerEntity> getCustomer(Long customerId) {
        return customerRepository.findById(customerId);
    }

    public List<CustomerEntity> getAllCustomers() {
        return customerRepository.findAll();
    }

    public CustomerEntity updateCustomer(Long id, CustomerEntity customerEntity) {
        CustomerEntity customer = customerRepository.findById(id).orElseThrow();
        customer.setName(customerEntity.getName());
        customer.setEmail(customerEntity.getEmail());
        customer.setPhone(customerEntity.getPhone());
        customer.setAddress(customerEntity.getAddress());
        return customerRepository.save(customer);
    }

    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
