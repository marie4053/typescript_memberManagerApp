import reader from 'readline-sync';
import Member from '../model/member';
import { getMemberListAll, getMemberList } from '../modules/memberManagerApi';

reader.setDefaultOptions({ encoding: 'utf8' });

function runApp2(member: Member): void {
  while (true) {
    try {
      printMenu2(member);
      const input = reader.question('> ');
      const menuNum = Number(input);
      switch (menuNum) {
        case 4: // 로그아웃
          console.log(`${member.memberId}님이 로그아웃 하셨습니다.`);
          return;
        case 5: // 회원정보 수정하기
          break;
        case 6: // 탈퇴하기
          break;
        case 99:
          return;
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

// function printMenu(): void {
//   console.log('<회원정보 관리 프로그램>');
//   console.log('1. 회원정보 리스트 보기');
//   console.log('2. 회원가입 하기');
//   console.log('3. 로그인');
//   console.log('99. 종료하기');
// }

function printMenu2(member: Member): void {
  console.log('');
  console.log('<회원정보 관리 프로그램>');
  console.log(`로그인이 되었습니다. (${member.memberId}, ${member.name})`);
  console.log('1. 회원정보 리스트 보기');
  console.log('2. 회원가입 하기');
  console.log('3. 로그인');
  console.log('4. 로그아웃');
  console.log('5. 회원정보 수정하기');
  console.log('6. 탈퇴하기');
  console.log('99. 종료하기');
}

// function showMemberList(memberList: Member[]): void {
//   const result = memberList
//     .map(
//       (member) =>
//         `${member.mno}, ${member.memberId}, ${member.password}, ${
//           member.name
//         }, ${member.age}, ${member.phone}, [${
//           member.hobby
//         }], ${member.createdDate.toLocaleString()}\n`
//     )
//     .join('');
//   console.log(result);
// }

export default runApp2;
