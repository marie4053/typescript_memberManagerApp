"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberListAll = getMemberListAll;
exports.getMemberList = getMemberList;
exports.createMemberList = createMemberList;
exports.updateMemberList = updateMemberList;
exports.deleteMemberList = deleteMemberList;
const memberList = [
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
function getMemberListAll() {
    return memberList;
}
function getMemberList(memberId) {
    const member = memberList.filter((member) => member.memberId == memberId);
    return member;
}
function createMemberList(newMember) {
    newMember.mno = memberList.length + 1;
    memberList.push(newMember);
    return true;
}
function updateMemberList(no) {
    return true;
}
function deleteMemberList(memberId) {
    const index = memberList.findIndex((member) => member.memberId === memberId);
    if (index !== -1) {
        memberList.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
}
