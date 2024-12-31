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
          const result = runApp2(member[0]);
          if (result === 2) {
            break;
          }
          if (result === 4) {
            break;
          }
          if (result === 99) {
            return;
          }
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
  try {
    // 1) 아이디 입력받기
    let newMemberId: string = reader
      .question(`아이디를 입력하세요.\n> `)
      .trim();
    if (newMemberId.length < 4) {
      while (newMemberId.length < 4) {
        console.log('아이디는 최소 4글자 이상이어야 합니다. 다시 입력하세요.');
        newMemberId = reader.question(`> `).trim();
      }
    }
    // 2) 비밀번호 입력받기
    let newMemberPassword: string = reader
      .question(`비밀번호를 입력하세요.\n> `)
      .trim();
    if (newMemberPassword.length < 4) {
      while (newMemberPassword.length < 4) {
        console.log(
          '비밀번호는 최소 4글자 이상이어야 합니다. 다시 입력하세요.'
        );
        newMemberPassword = reader.question(`> `).trim();
      }
    }
    // 3) 이름 입력받기
    let newMemberName: string = reader
      .question(`이름을 입력하세요.\n> `)
      .trim();
    if (newMemberName.length < 2) {
      while (newMemberName.length < 2) {
        console.log('이름은 최소 2글자 이상이어야 합니다. 다시 입력하세요.');
        newMemberName = reader.question(`> `).trim();
      }
    }
    // 4) 나이 입력받기
    let newMemberAge: number;
    let ageInput = reader.question(`나이를 입력하세요.\n> `).trim();
    if (isNaN(Number(ageInput)) || Number(ageInput) < 0) {
      while (isNaN(Number(ageInput)) || Number(ageInput) < 0) {
        console.log('유효한 숫자를 입력하세요.');
        ageInput = reader.question(`> `).trim();
      }
    }
    newMemberAge = parseInt(ageInput);
    // 5) 전화번호 입력받기
    let newMemberPhone: string = reader.question(`전화번호를 입력하세요\n> `);
    // 6) 취미 입력받기
    let newMemberHobby: string[] = [reader.question(`취미를 입력하세요.\n> `)];
    // 7) Member 객체 생성
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
    // 8) 회원 등록 함수 호출
    createMemberList(newMember);
    console.log('회원가입이 완료 되었습니다.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('회원가입 도중 오류가 발생했습니다:', error.message);
    } else {
      console.log('알 수 없는 에러:', error);
    }
  }
}

export default runApp;
