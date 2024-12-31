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
function updateMemberList(memberId, no, newValue) {
    // 1) 해당 아이디를 가진 멤버 찾기
    // updateMember는 undefined일 가능성이 없다고 생각하여 (why? 이미 로그인된 상태이니까) 타입 단언(!)을 했는데.. 괜찮나요?
    const updateMember = memberList.find((member) => member.memberId === memberId);
    // 2) 수정할 속성의 key 값 찾기
    let keyToUpdate;
    switch (no) {
        case 1:
            keyToUpdate = 'password';
            if (typeof newValue !== 'string') {
                throw new Error('비밀번호는 문자열이어야 합니다.');
            }
            updateMember[keyToUpdate] = newValue;
            break;
        case 2:
            keyToUpdate = 'name';
            if (typeof newValue !== 'string') {
                throw new Error('이름은 문자열이어야 합니다.');
            }
            updateMember[keyToUpdate] = newValue;
            break;
        case 3:
            keyToUpdate = 'age';
            if (typeof newValue !== 'number') {
                throw new Error('나이는 숫자여야 합니다.');
            }
            updateMember[keyToUpdate] = newValue;
            break;
        case 4:
            keyToUpdate = 'phone';
            if (typeof newValue !== 'string') {
                throw new Error('전화번호는 문자열이어야 합니다.');
            }
            updateMember[keyToUpdate] = newValue;
            break;
        case 5:
            keyToUpdate = 'hobby';
            if (!Array.isArray(newValue) ||
                !newValue.every((v) => typeof v === 'string')) {
                throw new Error('취미는 문자열 배열이어야 합니다.');
            }
            updateMember[keyToUpdate] = newValue;
            break;
        default:
            console.log('유효하지 않은 선택입니다.');
            return false;
    }
    // try {
    // } catch (error) {
    //   console.log(error);
    // }
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
