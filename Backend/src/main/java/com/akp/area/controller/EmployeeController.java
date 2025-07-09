package com.akp.area.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akp.area.CrudDemoApplication;
import com.akp.area.Repo.EmployeeRepo;
import com.akp.area.model.Employee;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/Employee")
public class EmployeeController {

    private final CrudDemoApplication crudDemoApplication;
	@Autowired
	private EmployeeRepo er;

    EmployeeController(CrudDemoApplication crudDemoApplication) {
        this.crudDemoApplication = crudDemoApplication;
    }
	// insert an employee..
	@PostMapping("/insert")
	public ResponseEntity<String> insert(@RequestBody Employee e) {
		er.save(e);
		return new ResponseEntity<String>("regsiteraion succesful",HttpStatus.CREATED);
	}
	//get all the employee
	@GetMapping("/getAll")
	public List<Employee> getall() {
		return er.findAll();
	}
	// get by id 
	@GetMapping("/getAll/{id}")
	public ResponseEntity<String> getById(@PathVariable Long id) {
		if(er.existsById(id)) {
			return ResponseEntity.ok(er.findById(id).get().toString());
		}
		else {
			return ResponseEntity.badRequest().body("Id not found");
		}
	}
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable Long id){
		if(er.existsById(id)) {
		 er.deleteById(id);
		 return "deleted successfully";
		}
		else {
			return "Id not found";
		}
		
	}
	@PutMapping("/update/{id}")
	public ResponseEntity<Employee> update(@RequestBody Employee e, @PathVariable Long id) {
	    if (er.existsById(id)) {
	        e.setId(id); // Ensure we are updating the correct record
	        Employee updated = er.save(e); // Save updated entity
	        return ResponseEntity.ok(updated); // Return updated entity in response
	    } else {
	        return ResponseEntity.badRequest().build(); // If ID doesn't exist, return 400
	    }
	}

	
	
	
	}
	

