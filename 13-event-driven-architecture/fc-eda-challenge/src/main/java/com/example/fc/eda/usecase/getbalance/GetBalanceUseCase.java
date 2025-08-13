package com.example.fc.eda.usecase.getbalance;

import com.example.fc.eda.repository.BalanceRepository;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class GetBalanceUseCase {

  private final BalanceRepository repository;

  public GetBalanceOutput getByAccountId(UUID accountId) {
    return repository
        .findById(accountId)
        .map(entity -> new GetBalanceOutput(entity.getAccountId(), entity.getBalance()))
        .orElseThrow(
            () -> new BalanceNotFoundException("Balance not found for account id: " + accountId));
  }
}
