package com.akp.area.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.akp.area.model.Employee;

public interface EmployeeRepo extends JpaRepository<Employee, Long> {

}
