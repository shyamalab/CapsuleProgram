package com.example.taskmgr.model;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Task")
@EntityListeners(AuditingEntityListener.class)
public class Task implements Serializable {

	private static final long serialVersionUID = -748956247024967638L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Task_ID;

	@Column(nullable = false)
	private String Task;

	@Column(nullable = false)
	private String Start_Date;

	@Column(nullable = false)
	private String End_Date;

	@Column(nullable = false)
	private String Priority;

	@Column(nullable = false)
	private boolean EndTask;

//	@JsonManagedReference
    @ManyToOne(cascade=CascadeType.ALL) 
	@JoinColumn(name = "Parent_ID", insertable = true, updatable = true)

	private Parent_Task parent_Task;

	public Task() {

		// TODO Auto-generated constructor stub
	}

	public Long getTask_ID() {
		return Task_ID;
	}

	public void setTask_ID(Long task_ID) {
		Task_ID = task_ID;
	}

	public String getTask() {
		return Task;
	}

	public void setTask(String task) {
		Task = task;
	}

	public String getStart_Date() {
		return Start_Date;
	}

	public void setStart_Date(String start_Date) {
		Start_Date = start_Date;
	}

	public String getEnd_Date() {
		return End_Date;
	}

	public void setEnd_Date(String end_Date) {
		End_Date = end_Date;
	}

	public String getPriority() {
		return Priority;
	}

	public void setPriority(String priority) {
		Priority = priority;
	}

	public Parent_Task getParent_Task() {
		return parent_Task;
	}

	public void setParent_Task(Parent_Task parent_Task) {
		this.parent_Task = parent_Task;
	}

	public boolean isEndTask() {
		return EndTask;
	}

	public void setEndTask(boolean endTask) {
		this.EndTask = endTask;
	}

	public Task(String task, String start_Date, String end_Date, String priority, boolean endTask) {
		super();
		Task = task;
		Start_Date = start_Date;
		End_Date = end_Date;
		Priority = priority;
		EndTask = endTask;
	}
}
