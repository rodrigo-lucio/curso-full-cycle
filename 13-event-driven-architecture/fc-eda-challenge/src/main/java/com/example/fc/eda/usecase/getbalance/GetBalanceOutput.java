package com.example.fc.eda.usecase.getbalance;

import java.math.BigDecimal;
import java.util.UUID;

public record GetBalanceOutput (UUID accountId, BigDecimal balance) { }
