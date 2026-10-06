// !! Biz controllerlarni doim Objectlar orqaliy hosil qilamiz
// libs folderda Type, const lar joylshadi
import { Request, Response } from "express"
import { T } from "../libs/types/common";
import MemberService from "../models/Member.service"
import { LoginInput, MemberInput } from "../libs/types/member"
import { MemberType } from "../libs/enums/member.enum";
import { AdminRequest } from "../libs/types/member";
import Errors, { Message } from "../libs/Errors";

const memberService = new MemberService();

const restaurantController: T = {}
restaurantController.goHome = (req: Request, res: Response) => {
    try {
        console.log("goHome")
        res.render("home");
        // send | json | redirect | end | render
    } catch (err) {
        console.log("Error, goHome", err)
        res.redirect("/admin");
    }
}

restaurantController.getSignup = (req: Request, res: Response) => {
    try {
        console.log("getSignup")
        res.render("signup");
    } catch (err) {
        console.log("Error, goSignup", err)
        res.redirect("/admin");
    }
}

restaurantController.getLogin = (req: Request, res: Response) => {
    try {
        console.log("getLogin")
        res.render("login");
    } catch (err) {
        console.log("Error, goLogin", err);
        res.redirect("/admin");
    }
}


restaurantController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processLogin")

        const input: LoginInput = req.body;
        const result = await memberService.processLogin(input)
        // TODO SESSIONS AUTHENTICATION

        req.session.member = result; //  resultimizni req.session.memberga saqlab qo'yyapmiz
        req.session.save(function () {    // sidni cookiesga joyledi
            res.send(result)
        });
           
    } catch (err) {
        console.log("Error, processLogin", err)
        const message = 
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
        res.send(
            `<script>alert("${message}"); window. location.replace('admin/login')/script>`    
        );
        res.send(err)
    }
}

restaurantController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log("logout")
        req.session.destroy(function () {
            res.redirect("/admin")
        });
    } catch (err) {
        console.log("Error, logout", err)
        res.redirect("/admin")
    }
}

// DEFINE
restaurantController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log("processSignup");

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.RESTAURANT;
        const result = await memberService.processSignup(newMember); // CALL
        // TODO SESSIONS AUTHENTICATION

        req.session.member = result;
        req.session.save(function () {
            res.send(result)
        });

    } catch (err) {
        console.log("Error, processSignup")
        const message = 
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
        res.send(
            `<script>alert("${message}"); window. location.replace('admin/signup')/script>`    
        );
        res.send(err)
    }
}


restaurantController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log("checkAuthSession");
        if (req.session?.member) 
            res.send(`<script>alert("${req.session.member.memberNick}")</script>`);
        else res.send(`<script>alert("${Message.NOT_AUTHENTICATED}")</script>`);

    } catch (err) {
        console.log("Error, checkAuthSession")
        res.send(err)
    }
}

export default restaurantController;