// Service model va Schema modellarni biz Classlar orqaliy quramiz
import { MemberInput } from "../libs/types/member"
import MemberModel from "../schema/Member.model";
import { Member } from "../libs/types/member";
import { HttpCode, Message } from "../libs/Errors";
import Errors from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";

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
        console.log(!!exist)
        if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = ""
            return result;                                  // Promiseni methodimiz faqat async method bo'lganda ishlatamiz
        } catch (err) {
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }


    }

}

export default MemberService;