import reader from 'readline-sync';
import Member from '../model/member';
import runApp2 from './commandApp2';
import {
  getMemberListAll,
  getMemberList,
  createMemberList,
} from '../modules/memberManagerApi';

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
          inputMemberInfo();
          break;
        case 3: // 로그인 -> 로그인 되면 화면 달라짐..
          const memberId = reader.question(`아이디를 입력하세요.\n> `);
          const member = getMemberList(memberId);
          const memberPassword = reader.question(`비밀번호를 입력하세요\n> `);
          if (memberPassword !== member[0].password) {
            console.log('로그인에 실패하였습니다.');
            break;
          }
          console.log('로그인에 성공하였습니다.');
          runApp2(member[0]);
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
  // 1) 아이디 입력받기
  let newMemberId: string = reader.question(`아이디를 입력하세요.\n> `);
  if (newMemberId.length < 4) {
    while (newMemberId.length < 4) {
      console.log('잘못된 입력입니다. 다시 입력하세요.');
      newMemberId = reader.question(`> `);
    }
  }
  // 2) 비밀번호 입력받기
  let newMemberPassword: string = reader.question(`비밀번호를 입력하세요.\n> `);
  if (newMemberPassword.length < 4) {
    while (newMemberPassword.length < 4) {
      console.log('잘못된 입력입니다. 다시 입력하세요.');
      newMemberPassword = reader.question(`> `);
    }
  }
  // 3) 이름 입력받기
  let newMemberName: string = reader.question(`이름을 입력하세요.\n> `);
  if (newMemberName.length < 2) {
    while (newMemberName.length < 2) {
      console.log('잘못된 입력입니다. 다시 입력하세요.');
      newMemberName = reader.question(`> `);
    }
  }
  // 4) 나이 입력받기
  let newMemberAge: number = parseInt(
    reader.question(`나이를 입력하세요.\n> `)
  );
  // 5) 전화번호 입력받기
  let newMemberPhone: string = reader.question(`전화번호를 입력하세요\n> `);
  // 6) 취미 입력받기
  let newMemberHobby: string[] = [reader.question(`취미를 입력하세요.\n> `)];
  const newMember: Member = {
    mno: 0,
    memberId: newMemberId,
    password: newMemberPassword,
    name: newMemberName,
    age: newMemberAge,
    phone: newMemberPhone,
    hobby: newMemberHobby,
    createdDate: new Date(),
  };
  createMemberList(newMember);
}

export default runApp;
