/**
 * 개인정보 마스킹 유틸. 화면 표시·로그에서 민감정보를 가립니다.
 * 모든 함수는 구분자(하이픈 등)를 보존하고 숫자/문자만 가립니다.
 */

const STAR = "*";

/**
 * 숫자만 골라 앞 keepStart개, 뒤 keepEnd개를 남기고 나머지를 마스킹.
 * 구분자는 그대로 둡니다.  maskDigits("010-1234-5678", 3, 4) → "010-****-5678"
 */
export function maskDigits(value: string, keepStart: number, keepEnd: number, maskChar = STAR): string {
  const s = value ?? "";
  const total = (s.match(/\d/g) ?? []).length;
  let idx = 0;
  let out = "";
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      out += idx < keepStart || idx >= total - keepEnd ? ch : maskChar;
      idx++;
    } else {
      out += ch;
    }
  }
  return out;
}

/** 이름 마스킹. 홍길동→홍*동, 김철→김*, 이→*, 남궁민수→남**수 */
export function maskName(name: string, maskChar = STAR): string {
  const s = (name ?? "").trim();
  const chars = [...s];
  if (chars.length === 0) return "";
  if (chars.length === 1) return maskChar;
  if (chars.length === 2) return chars[0] + maskChar;
  return chars[0] + maskChar.repeat(chars.length - 2) + chars[chars.length - 1];
}

/** 전화번호 마스킹. 앞 3 / 뒤 4 자리 유지.  010-1234-5678 → 010-****-5678 */
export function maskPhone(phone: string, maskChar = STAR): string {
  return maskDigits(phone, 3, 4, maskChar);
}

/** 카드번호 마스킹. 앞 4 / 뒤 4 유지.  1234-5678-9012-3456 → 1234-****-****-3456 */
export function maskCard(card: string, maskChar = STAR): string {
  return maskDigits(card, 4, 4, maskChar);
}

/** 주민등록번호 마스킹. 생년월일+성별자리까지만.  901010-1234567 → 901010-1****** */
export function maskRRN(rrn: string, maskChar = STAR): string {
  return maskDigits(rrn, 7, 0, maskChar);
}

/** 계좌번호 마스킹. 기본 앞 3 / 뒤 3 유지. */
export function maskAccount(account: string, opts: { keepStart?: number; keepEnd?: number; maskChar?: string } = {}): string {
  return maskDigits(account, opts.keepStart ?? 3, opts.keepEnd ?? 3, opts.maskChar ?? STAR);
}

/** 이메일 마스킹. 로컬부 앞 일부만 남기고 도메인 유지.  john.doe@ex.com → jo******@ex.com */
export function maskEmail(email: string, maskChar = STAR): string {
  const s = email ?? "";
  const at = s.indexOf("@");
  const local = at < 0 ? s : s.slice(0, at);
  const domain = at < 0 ? "" : s.slice(at);
  if (local.length === 0) return s;
  const keep = local.length > 2 ? 2 : 1;
  const masked = local.slice(0, keep) + maskChar.repeat(Math.max(local.length - keep, 1));
  return masked + domain;
}
