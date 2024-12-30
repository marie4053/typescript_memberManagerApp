"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const commandApp2_1 = __importDefault(require("./commandApp2"));
const memberManagerApi_1 = require("../modules/memberManagerApi");
readline_sync_1.default.setDefaultOptions({ encoding: 'utf8' });
function runApp() {
    while (true) {
        try {
            printMenu();
            const input = readline_sync_1.default.question('> ');
            const menuNum = Number(input);
            switch (menuNum) {
                case 1: // 회원정보 리스트 보기
                    console.log('<회원 목록>');
                    const memberList = (0, memberManagerApi_1.getMemberListAll)();
                    showMemberList(memberList);
                    break;
                case 2: // 회원가입 하기
                    console.log('<회원 가입>');
                    inputMemberInfo();
                    break;
                case 3: // 로그인 -> 로그인 되면 화면 달라짐..
                    const memberId = readline_sync_1.default.question(`아이디를 입력하세요.\n> `);
                    const member = (0, memberManagerApi_1.getMemberList)(memberId);
                    const memberPassword = readline_sync_1.default.question(`비밀번호를 입력하세요\n> `);
                    if (memberPassword !== member[0].password) {
                        console.log('로그인에 실패하였습니다.');
                        break;
                    }
                    console.log('로그인에 성공하였습니다.');
                    (0, commandApp2_1.default)(member[0]);
                    break;
                case 99:
                    return;
                default:
                    break;
            }
            console.log('');
        }
        catch (error) {
            console.error(error);
            console.log('잘못된 입력입니다.');
        }
    }
}
function printMenu() {
    console.log('<회원정보 관리 프로그램>');
    console.log('1. 회원정보 리스트 보기');
    console.log('2. 회원가입 하기');
    console.log('3. 로그인');
    console.log('99. 종료하기');
}
function printMenu2(member) {
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
function showMemberList(memberList) {
    const result = memberList
        .map((member) => `${member.mno}, ${member.memberId}, ${member.password}, ${member.name}, ${member.age}, ${member.phone}, [${member.hobby}], ${member.createdDate.toLocaleString()}\n`)
        .join('');
    console.log(result);
}
function inputMemberInfo() {
    // 1) 아이디 입력받기
    let newMemberId = readline_sync_1.default.question(`아이디를 입력하세요.\n> `);
    if (newMemberId.length < 4) {
        while (newMemberId.length < 4) {
            console.log('잘못된 입력입니다. 다시 입력하세요.');
            newMemberId = readline_sync_1.default.question(`> `);
        }
    }
    // 2) 비밀번호 입력받기
    let newMemberPassword = readline_sync_1.default.question(`비밀번호를 입력하세요.\n> `);
    if (newMemberPassword.length < 4) {
        while (newMemberPassword.length < 4) {
            console.log('잘못된 입력입니다. 다시 입력하세요.');
            newMemberPassword = readline_sync_1.default.question(`> `);
        }
    }
    // 3) 이름 입력받기
    let newMemberName = readline_sync_1.default.question(`이름을 입력하세요.\n> `);
    if (newMemberName.length < 2) {
        while (newMemberName.length < 2) {
            console.log('잘못된 입력입니다. 다시 입력하세요.');
            newMemberName = readline_sync_1.default.question(`> `);
        }
    }
    // 4) 나이 입력받기
    let newMemberAge = parseInt(readline_sync_1.default.question(`나이를 입력하세요.\n> `));
    // 5) 전화번호 입력받기
    let newMemberPhone = readline_sync_1.default.question(`전화번호를 입력하세요\n> `);
    // 6) 취미 입력받기
    let newMemberHobby = [readline_sync_1.default.question(`취미를 입력하세요.\n> `)];
    const newMember = {
        mno: 0,
        memberId: newMemberId,
        password: newMemberPassword,
        name: newMemberName,
        age: newMemberAge,
        phone: newMemberPhone,
        hobby: newMemberHobby,
        createdDate: new Date(),
    };
    (0, memberManagerApi_1.createMemberList)(newMember);
}
exports.default = runApp;
