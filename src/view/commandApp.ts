import reader from 'readline-sync';
import Member from '../model/member';
import { getMemberListAll } from '../modules/memberManagerApi';

reader.setDefaultOptions({ encoding: 'utf8' });

function runApp(): void {
  while (true) {
    try {
      printMenu();
      const input = reader.question('> ');
      const menuNum = Number(input);
      switch (menuNum) {
        case 1: // 회원정보 리스트 보기
          console.log('<회원 목록>');
          const memberList = getMemberListAll();
          showMemberList(memberList);
          break;
        case 2: // 회원가입 하기
          console.log('<회원 가입>');
          console.log('아이디를 입력하세요');
          console.log('비밀번호를 입력하세요');
          break;
        case 3: // 로그인 -> 로그인 되면 화면 달라짐..
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

function printMenu(): void {
  console.log('<회원정보 관리 프로그램>');
  console.log('1. 회원정보 리스트 보기');
  console.log('2. 회원가입 하기');
  console.log('3. 로그인');
  console.log('99. 종료하기');
}

function printMenu2(member: Member): void {
  console.log('<회원정보 관리 프로그램>');
  console.log(`로그인이 되었습니다. (${member.memberId}, ${member.password})`);
  console.log('1. 회원정보 리스트 보기');
  console.log('2. 회원가입 하기');
  console.log('3. 로그인');
  console.log('4. 로그아웃');
  console.log('5. 회원정보 수정하기');
  console.log('6. 탈퇴하기');
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

function inputMemberInfo(): void {
  const newMemberId = reader.question(`아이디를 입력하세요.\n> `);
  if (newMemberId.length < 4) {
    console.log();
  }
}

export default runApp;
