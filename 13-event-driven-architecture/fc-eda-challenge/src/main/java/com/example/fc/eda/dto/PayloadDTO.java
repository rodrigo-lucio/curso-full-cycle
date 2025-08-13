package com.example.fc.eda.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class PayloadDTO {

  @JsonProperty("account_id_from")
  private String accountIdFrom;

  @JsonProperty("account_id_to")
  private String accountIdTo;

  @JsonProperty("balance_account_id_from")
  private BigDecimal balanceAccountIdFrom;

  @JsonProperty("balance_account_id_to")
  private BigDecimal balanceAccountIdTo;
}
