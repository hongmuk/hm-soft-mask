import { test } from "node:test";
import assert from "node:assert/strict";
import {
  maskDigits,
  maskName,
  maskPhone,
  maskCard,
  maskRRN,
  maskAccount,
  maskEmail,
} from "../dist/index.js";

test("maskName", () => {
  assert.equal(maskName("홍길동"), "홍*동");
  assert.equal(maskName("김철"), "김*");
  assert.equal(maskName("이"), "*");
  assert.equal(maskName("남궁민수"), "남**수");
  assert.equal(maskName(""), "");
});

test("maskPhone", () => {
  assert.equal(maskPhone("010-1234-5678"), "010-****-5678");
  assert.equal(maskPhone("01012345678"), "010****5678");
});

test("maskCard", () => {
  assert.equal(maskCard("1234-5678-9012-3456"), "1234-****-****-3456");
});

test("maskRRN", () => {
  assert.equal(maskRRN("901010-1234567"), "901010-1******");
});

test("maskEmail", () => {
  assert.equal(maskEmail("john.doe@example.com"), "jo******@example.com");
  assert.equal(maskEmail("a@b.com"), "a*@b.com");
});

test("maskAccount (기본 앞3 뒤3)", () => {
  assert.equal(maskAccount("110-1234-5678"), "110-****-*678");
  assert.equal(maskAccount("11012345678", { keepStart: 0, keepEnd: 4 }), "*******5678");
});

test("maskDigits (범용)", () => {
  assert.equal(maskDigits("123456", 2, 2), "12**56");
  assert.equal(maskDigits("12-34-56", 1, 1, "#"), "1#-##-#6"); // 구분자 보존
});
