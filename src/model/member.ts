type Member = {
  mno: number; // 회원 번호 (필수)
  memberId: string; // 사용자ID (필수, 최소 4글자)
  password: string; // 비밀번호 (필수, 최소 4글자)
  name: string; // 이름 (필수, 최소 2글자)
  age?: number; // 나이 (선택)
  phone?: string; // 전화번호 (선택)
  hobby?: string[]; // 취미 (선택, 문자열 배열)
  createdDate: Date; // 가입일 (필수)
};

export default Member;

// { mno, memberId, password, name, age, phone, hobby, createdDate }
