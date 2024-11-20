package newbie.gateway.gateway.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class MainException extends RuntimeException {
    private final CustomException errorCode;

    public MainException(CustomException errorCode) {
        super(errorCode.getMessage()); // 예외 메시지를 설정
        this.errorCode = errorCode;
    }

    public CustomException getErrorCode() {
        return errorCode;
    }
}
