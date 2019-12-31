package com.example.taskmgr.controller;

import com.example.taskmgr.TaskManagerApplication;
import com.example.taskmgr.model.Task;
import com.example.taskmgr.repository.ParentTaskRepository;
import com.example.taskmgr.service.TaskManagerService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TaskController {
	
	private final static  Logger logger = LoggerFactory.getLogger(TaskController.class);

    @Autowired
    TaskManagerService taskmgrService;
    
    @Autowired
    ParentTaskRepository parenttaskRepository;

    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
    	logger.info("Listed all Task details");
        return taskmgrService.getAllTasks();
    }

    @PostMapping("/tasks")
    public Task createTask(@Valid @RequestBody Task task) {
    	logger.info("Created a new Task");
        return taskmgrService.createTask(task);
    }

    @GetMapping("/tasks/task/{id}")
    public Task getTask(@PathVariable(value = "id") Long taskId) {
    	logger.info("Updated the existing Task");

        return taskmgrService.getTaskByID(taskId);
    }

    @PutMapping("/tasks/{id}")
    public Task updateTask(@PathVariable(value = "id") Long taskId,
                                           @Valid @RequestBody Task taskDetails) {
    	logger.info("Updated the existing Task");

        return taskmgrService.updateTask(taskId, taskDetails);
    }
   
}
