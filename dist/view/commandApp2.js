"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const memberManagerApi_1 = require("../modules/memberManagerApi");
readline_sync_1.default.setDefaultOptions({ encoding: 'utf8' });
function runApp2(member) {
    while (true) {
        try {
            printMenu2(member);
            const input = readline_sync_1.default.question('> ');
            const menuNum = Number(input);
            switch (menuNum) {
                case 1: // 회원정보 리스트 보기
                    console.log('<회원 목록>');
                    const memberList = (0, memberManagerApi_1.getMemberListAll)();
                    showMemberList(memberList);
                    break;
                case 2: // 로그아웃
                    console.log(`${member.memberId}님이 로그아웃 하셨습니다.`);
                    return 2;
                case 3: // 회원정보 수정하기
                    printUpdateMenu();
                    const updateNum = Number(readline_sync_1.default.question('> '));
                    const newValue = readline_sync_1.default.question(`새로운 값을 입력하세요\n> `);
                    (0, memberManagerApi_1.updateMemberList)(member.memberId, updateNum, newValue);
                    break;
                case 4: // 탈퇴하기
                    console.log('<회원 탈퇴하기>');
                    console.log('정말로 탈퇴하겠습니까? (Y, N)');
                    const input = readline_sync_1.default.question('> ');
                    if (input === 'Y' || input === 'y') {
                        (0, memberManagerApi_1.deleteMemberList)(member.memberId);
                        console.log(`${member.memberId}님이 탈퇴 되었습니다.`);
                        return 4;
                    }
                    else {
                        console.log('탈퇴를 진행하지 않습니다.');
                    }
                    break;
                case 99:
                    return 99;
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
function printMenu2(member) {
    console.log('');
    console.log('<회원정보 관리 프로그램>');
    console.log(`로그인이 되었습니다. (${member.memberId}, ${member.name})`);
    console.log('1. 회원정보 리스트 보기');
    console.log('2. 로그아웃');
    console.log('3. 회원정보 수정하기');
    console.log('4. 탈퇴하기');
    console.log('99. 종료하기');
}
function printUpdateMenu() {
    console.log('<회원정보 수정>');
    console.log('1. 비밀번호 변경');
    console.log('2. 이름 변경');
    console.log('3. 나이 변경');
    console.log('4. 전화번호 변경');
    console.log('5. 취미 변경');
}
function showMemberList(memberList) {
    const result = memberList
        .map((member) => `${member.mno}, ${member.memberId}, ${member.password}, ${member.name}, ${member.age}, ${member.phone}, [${member.hobby}], ${member.createdDate.toLocaleString()}\n`)
        .join('');
    console.log(result);
}
exports.default = runApp2;
