package com.example.fc.eda.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceRepository extends JpaRepository<BalanceEntity, UUID> {}
