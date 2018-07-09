Feature: Send and receive messages

  Scenario: previewing a message
    When I preview the message "this is my deepest darkest secret" with shift 6
    Then I see the preview "znoy oy se jkkvkyz jgxqkyz ykixkz"
