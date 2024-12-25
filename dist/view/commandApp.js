"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
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
                    break;
                case 3: // 로그인 -> 로그인 되면 화면 달라짐..
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
function showMemberList(memberList) {
    const result = memberList
        .map((member) => `${member.mno}, ${member.memberId}, ${member.password}, ${member.name}, ${member.age}, ${member.phone}, [${member.hobby}], ${member.createdDate.toLocaleString()}\n`)
        .join('');
    console.log(result);
}
exports.default = runApp;
