package com.example.fc.eda.usecase.updatebalance;

import com.example.fc.eda.repository.BalanceEntity;
import com.example.fc.eda.repository.BalanceRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UpdateBalanceUseCase {

  private final BalanceRepository repository;

  public void update(UpdateBalanceInput input) {
    BalanceEntity entity = repository.findById(input.accountId()).orElse(new BalanceEntity());
    entity.setAccountId(input.accountId());
    entity.setBalance(input.balance());
    repository.save(entity);
  }
}
