// Service model va Schema modellarni biz Classlar orqaliy quramiz
import { LoginInput, MemberInput } from "../libs/types/member"
import MemberModel from "../schema/Member.model";
import { Member } from "../libs/types/member";
import { HttpCode, Message } from "../libs/Errors";
import Errors from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
    private readonly memberModel;
    constructor() {
        this.memberModel = MemberModel;
    }
    // define
    public async processSignup(input: MemberInput): Promise<Member> {           // Promise<void> method hech nima qaytarmasligi uchun
        /* SchemaModel + staticMethod = Query */
        const exist = await this.memberModel // databasega borib RESTAURAT member bormi izlab beradi
            .findOne({ memberType: MemberType.RESTAURANT }) // Query
            .exec(); // bizga result beradi                 // Query
        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED); // bo'lsa to'xtat

        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";
            return result;                                  // Promiseni methodimiz faqat async method bo'lganda ishlatamiz
        }   catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async processLogin(input: LoginInput): Promise<Member> {
        const member = await this.memberModel
        .findOne
        ({memberNick: input.memberNick},  // query conditionni findOne ichiga kiritamiz(memberModuleda qanday malumot qidiramiz)
         { memberNick: 1, memberPassword: 1 })  
      // findOne({ memberNick: "Burak" })
        .exec();  
        if(!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK); // b'lmasa to'xtat
       
        const isMatch = await bcrypt.compare(
            input.memberPassword,
            member.memberPassword);
       // const isMatch = input.memberPassword === member.memberPassword;
         


        if(!isMatch) {
            throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD)
        }
        
        return await this.memberModel.findById(member._id).exec();

    }
}

export default MemberService;