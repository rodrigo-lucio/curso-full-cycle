package com.example.fc.eda.usecase.updatebalance;

import java.math.BigDecimal;
import java.util.UUID;

public record UpdateBalanceInput(UUID accountId, BigDecimal balance) {}
