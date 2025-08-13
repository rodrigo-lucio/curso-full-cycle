package com.example.fc.eda.consumer;

import com.example.fc.eda.dto.BalanceMessageDTO;
import com.example.fc.eda.usecase.updatebalance.UpdateBalanceInput;
import com.example.fc.eda.usecase.updatebalance.UpdateBalanceUseCase;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class BalanceKafkaConsumer {

  private final UpdateBalanceUseCase useCase;

  @KafkaListener(topics = "balances", groupId = "balance-consumer")
  public void consume(BalanceMessageDTO message) {
    log.info("Received message: {}", message);
    var payload = message.getPayload();
    useCase.update(
        new UpdateBalanceInput(
            UUID.fromString(payload.getAccountIdFrom()), payload.getBalanceAccountIdFrom()));
    useCase.update(
        new UpdateBalanceInput(
            UUID.fromString(payload.getAccountIdTo()), payload.getBalanceAccountIdTo()));
  }
}
