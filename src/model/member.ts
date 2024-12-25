type Member = {
  mno: number;
  memberId: string;
  password: string;
  name: string;
  age?: number | null;
  phone?: string | null;
  hobby?: string[] | null;
  createdDate: Date;
};

export default Member;

// { mno, memberId, password, name, age, phone, hobby, createdDate }
