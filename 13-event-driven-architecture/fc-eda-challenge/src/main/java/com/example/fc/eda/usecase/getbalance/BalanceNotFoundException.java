package com.example.fc.eda.usecase.getbalance;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BalanceNotFoundException extends RuntimeException {
  public BalanceNotFoundException(String message) {
    super(message);
  }
}
