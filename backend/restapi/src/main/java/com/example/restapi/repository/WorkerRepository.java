package com.example.restapi.repository;

import com.example.restapi.entity.users.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {
}
