package com.example.taskmgr.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.taskmgr.exception.ResourceNotFoundException;
import com.example.taskmgr.model.Task;
import com.example.taskmgr.repository.ParentTaskRepository;
import com.example.taskmgr.repository.TaskRepository;

@Service
public class TaskManagerService {

	private final static Logger logger = LoggerFactory.getLogger(TaskManagerService.class);

	@Autowired
	TaskRepository taskRepository;

	@Autowired
	ParentTaskRepository parenttaskRepository;

	public List<Task> getAllTasks() {

		logger.debug("Service to get list of tasks");
		return taskRepository.findAll();
	}
	
	public Task getTaskByID(Long id) {

		logger.debug("Service to get tasks by id");
		
		Optional<Task> task = taskRepository.findById(id);
        
        if(task.isPresent()) {
            return task.get();
        } else {
            throw new ResourceNotFoundException("Task", "id", id);
        }
	}

	public Task createTask(Task task) {

		logger.debug("Service to create a new task");

		if (parenttaskRepository.findByParTask(task.getParent_Task().getParTask()) == null) {
			parenttaskRepository.save(task.getParent_Task());
		} else {
			task.setParent_Task(parenttaskRepository.findByParTask(task.getParent_Task().getParTask()));
		}
		return taskRepository.save(task);
	}

	public Task updateTask(Long taskId, Task taskDetails) {
		
		logger.debug("Service to create a Update task");

		Task task = taskRepository.findById(taskId)
				.orElseThrow(() -> new ResourceNotFoundException("Task", "id", taskId));
		task.setTask(taskDetails.getTask());
		task.setPriority(taskDetails.getPriority());
		task.setStart_Date(taskDetails.getStart_Date());
		task.setEnd_Date(taskDetails.getEnd_Date());
		task.setEndTask(taskDetails.isEndTask());
		if (parenttaskRepository.findByParTask(taskDetails.getParent_Task().getParTask()) == null) {
			parenttaskRepository.save(taskDetails.getParent_Task());
			task.setParent_Task(parenttaskRepository.findByParTask(taskDetails.getParent_Task().getParTask()));
		} else {
			task.setParent_Task(parenttaskRepository.findByParTask(taskDetails.getParent_Task().getParTask()));
		}

		logger.debug("Service to update the existing task");

		return taskRepository.save(task);

	}
	
}
