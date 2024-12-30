import Member from '../model/member';

const memberList: Member[] = [
  /* 임시데이터 만들거면 여기에서 */
  {
    mno: 1,
    memberId: 'test12',
    password: '1234',
    name: '홍길동',
    age: 21,
    phone: '010-1234-1234',
    hobby: ['영화', '운동'],
    createdDate: new Date(),
  },
  {
    mno: 2,
    memberId: 'test34',
    password: '5678',
    name: '박길동',
    age: 31,
    createdDate: new Date(),
  },
];

export function getMemberListAll(): Member[] {
  return memberList;
}

export function getMemberList(memberId: string): Member[] {
  const member = memberList.filter((member) => member.memberId == memberId);
  return member;
}

export function createMemberList(newMember: Member): boolean {
  newMember.mno = memberList.length + 1;
  memberList.push(newMember);
  return true;
}

export function updateMemberList(no: number): boolean {
  return true;
}

export function deleteMemberList(): boolean {
  return true;
}
