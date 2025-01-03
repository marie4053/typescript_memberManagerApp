import reader from 'readline-sync';
import Member from '../model/member';
import {
  getMemberListAll,
  deleteMemberList,
  updateMemberList,
} from '../modules/memberManagerApi';

reader.setDefaultOptions({ encoding: 'utf8' });

function runApp2(member: Member): number {
  while (true) {
    try {
      printMenu(member);
      const input = reader.question('> ');
      const menuNum = Number(input);
      switch (menuNum) {
        case 1: // 회원정보 리스트 보기
          console.log('<회원 목록>');
          const memberList = getMemberListAll();
          showMemberList(memberList);
          break;
        case 2: // 로그아웃
          console.log(`${member.memberId}님이 로그아웃 하셨습니다.`);
          return 2;
        case 3: // 회원정보 수정하기
          printUpdateMenu();
          const updateNum = Number(reader.question('> '));
          const newValue = reader.question(`새로운 값을 입력하세요\n> `);
          const result = updateMemberList(member.memberId, updateNum, newValue);
          if (result === false) {
            break;
          }
          console.log('변경 되었습니다.');
          break;
        case 4: // 탈퇴하기
          console.log('<회원 탈퇴하기>');
          console.log('정말로 탈퇴하겠습니까? (Y, N)');
          const input: string = reader.question('> ');
          if (input === 'Y' || input === 'y') {
            deleteMemberList(member.memberId);
            console.log(`${member.memberId}님이 탈퇴 되었습니다.`);
            return 4;
          } else {
            console.log('탈퇴를 진행하지 않습니다.');
          }
          break;
        case 99:
          return 99;
        default:
          break;
      }
      console.log('');
    } catch (error) {
      console.error(error);
      console.log('잘못된 입력입니다.');
    }
  }
}

function printMenu(member: Member): void {
  console.log('');
  console.log('<회원정보 관리 프로그램>');
  console.log(`로그인이 되었습니다. (${member.memberId}, ${member.name})`);
  console.log('1. 회원정보 리스트 보기');
  console.log('2. 로그아웃');
  console.log('3. 회원정보 수정하기');
  console.log('4. 탈퇴하기');
  console.log('99. 종료하기');
}

function showMemberList(memberList: Member[]): void {
  const result = memberList
    .map(
      (member) =>
        `${member.mno}, ${member.memberId}, ${member.password}, ${
          member.name
        }, ${member.age}, ${member.phone}, [${
          member.hobby
        }], ${member.createdDate.toLocaleString()}\n`
    )
    .join('');
  console.log(result);
}

function printUpdateMenu(): void {
  console.log('<회원정보 수정>');
  console.log('1. 비밀번호 변경');
  console.log('2. 이름 변경');
  console.log('3. 나이 변경');
  console.log('4. 전화번호 변경');
  console.log('5. 취미 변경');
}

export default runApp2;
