package com.example.taskmgr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.taskmgr.model.Task;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

}
