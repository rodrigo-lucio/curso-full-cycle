package com.example.fc.eda.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "balances")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BalanceEntity {

  @Id private UUID accountId;
  private BigDecimal balance;
}
