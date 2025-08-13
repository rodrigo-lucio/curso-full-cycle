package com.example.fc.eda.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class BalanceMessageDTO {

  @JsonProperty("Name")
  private String name;

  @JsonProperty("Payload")
  private PayloadDTO payload;
}
