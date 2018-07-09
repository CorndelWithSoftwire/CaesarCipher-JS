Feature: Send and receive messages

  Scenario: previewing a message
    When I preview the message "this is my deepest darkest secret" with shift 6
    Then I see the preview "znoy oy se jkkvkyz jgxqkyz ykixkz"

  Scenario: sending a message
    When I send the message "a secret message to send" to "Andre" with shift 15
    Then the encrypted message "p htrgti bthhpvt id htcs" should be sent to "Andre"

  Scenario: receiving a message
    Given "alice" has sent me the message "ab ykhf tebvx"
    When I check my messages with shift 19
    Then I should receive the message "hi from alice"
