package com.example.taskmgr;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@EnableSwagger2
@EnableJpaAuditing
@ComponentScan(basePackages = "com.example.taskmgr")
public class TaskManagerApplication {
	
	private final static  Logger logger = LoggerFactory.getLogger(TaskManagerApplication.class);
	

	public static void main(String[] args) {
		SpringApplication.run(TaskManagerApplication.class, args);
		logger.info("Started the Task Manager Spring Boot Application");
	}
	
	 @Bean
		public FilterRegistrationBean corsFilter() {
			FilterRegistrationBean registrationBean = new FilterRegistrationBean();

			registrationBean.setFilter(new CORSFilter());
			registrationBean.addUrlPatterns("/*");

			return registrationBean;
		} 
}
