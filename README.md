# @hm-soft/mask

개인정보를 화면·로그에서 가리는 **마스킹 유틸**. 이름·전화·이메일·카드·계좌·주민번호.
구분자(하이픈 등)는 보존하고 민감한 자리만 가립니다. 의존성 0.

[`@hm-soft/korean-validators`](https://www.npmjs.com/package/@hm-soft/korean-validators)와 짝으로 쓰기 좋습니다(검증 → 표시 마스킹).

## 설치

```bash
npm install @hm-soft/mask
```

## 사용

```ts
import { maskName, maskPhone, maskEmail, maskCard, maskRRN, maskAccount } from "@hm-soft/mask";

maskName("홍길동");                 // "홍*동"
maskPhone("010-1234-5678");         // "010-****-5678"
maskEmail("john.doe@example.com");  // "jo******@example.com"
maskCard("1234-5678-9012-3456");    // "1234-****-****-3456"
maskRRN("901010-1234567");          // "901010-1******"
maskAccount("110-1234-5678");       // "110-****-*678"
```

## API

| 함수 | 결과 예 |
|------|---------|
| `maskName(name)` | 홍길동 → 홍*동 |
| `maskPhone(phone)` | 010-1234-5678 → 010-****-5678 |
| `maskEmail(email)` | john.doe@ex.com → jo******@ex.com |
| `maskCard(card)` | …5678-9012… → …****-****… |
| `maskRRN(rrn)` | 901010-1234567 → 901010-1****** |
| `maskAccount(acc, {keepStart?, keepEnd?})` | 앞3/뒤3 유지 |
| `maskDigits(value, keepStart, keepEnd, maskChar?)` | 범용: 숫자 앞/뒤 유지 마스킹 |

모든 함수는 두 번째 인자로 `maskChar`(기본 `*`)를 받습니다.

## License

Apache-2.0
