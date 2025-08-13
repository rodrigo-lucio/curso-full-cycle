package com.example.fc.eda.controller;

import com.example.fc.eda.usecase.getbalance.GetBalanceOutput;
import com.example.fc.eda.usecase.getbalance.GetBalanceUseCase;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/balances")
public class BalanceController {

  private final GetBalanceUseCase useCase;

  @GetMapping("/{accountId}")
  public GetBalanceOutput getBalance(@PathVariable UUID accountId) {
    return useCase.getByAccountId(accountId);
  }
}
