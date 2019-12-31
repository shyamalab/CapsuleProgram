package com.example.taskmgr.model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "Parent_Task")
public class Parent_Task implements Serializable{
	
	 private static final long serialVersionUID = 8495817802073010928L;
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "Parent_ID", unique = true, nullable = false)
	    private Long Parent_ID;
	
	    @Column(nullable = false)
	    private String parTask;
	 	    
		
		public Parent_Task() {
			super();
		}


		public String getParTask() {
			return parTask;
		}


		public void setParTask(String parTask) {
			this.parTask = parTask;
		}


		public Long getParent_ID() {
			return Parent_ID;
		}

		public void setParent_ID(Long parent_ID) {
			Parent_ID = parent_ID;
		}



}
