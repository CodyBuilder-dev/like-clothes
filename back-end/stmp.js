import nodemailer from "nodemailer"
import smtpTransporter from "nodemailer-smtp-transport"

let smtpTransport;

let connect_smtp = () => {
    smtpTransport = nodemailer.createTransport(smtpTransporter({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'studyproauth@gmail.com',
            pass: 'studypro123'
        }
    }))
}

let send_mail =(receiver,title, content) =>{

    let mailOpt = {
        from: 'studyproauth@gmail.com',
        to: receiver,
        subject: title,
        html: content
    };

    smtpTransport.sendMail(mailOpt, function (err, res) {
        if (err) {
            console.log(err);
        } else {
            console.log('email has been sent.');
        }
        smtpTransport.close();
    });
}



export const auth_mail = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    
    console.log(user_email);

    let receiver = req.body.user_email;
    let title = 'Studypro 가입 이메일 인증'
    let content = '<h1>이메일 인증을 위해 다음 코드를 입력해주세요.</h1>'
    content += '<span>1234<span>'
    
    //전송
    send_mail(receiver, title , content);
    res.send("메일 발송 완료")
}

export const notice_apply = (req,res) => {
    connect_smtp();
    // var url = 'http://' + req.get('host')+'/confirmEmail'+'?key='+key_for_verify;
    const {user_email, study_name, study_id}  = req.body;
    console.log(user_email);
    
    let title = '스터디 가입신청 알림'
    let content = '<h1>'+study_name+' 에 가입신청이 왔습니다.</h1>'
    content += '<span>가입 목록 보러가기 : </span><br>'
    content += 'https://i02a106.p.ssafy.io/study/'+study_id +'/member'
    
    //전송
    send_mail(user_email, title, content);
    res.send("메일 발송 완료")
}

export const result_apply = (req,res) => {
    connect_smtp();
    
    const {user_email, study_name, study_id, result}  = req.body;
    let title, content;
    if(result){
        title = study_name + '에 가입 신청이 승인되었습니다.'
        content = '<h1>'+study_name+'그룹에 가입신청이 승인되었습니다.</h1>'
        content += '<span>가입 스터디로 이동 : </span><br>'
        content += 'https://i02a106.p.ssafy.io/study/'+study_id
    }else{
        title = study_name + '에 가입 신청이 거절되었습니다.'
        content = '<h1>'+study_name+'그룹에 가입신청이 거절되었습니다.</h1>'
        content += '<span>스터디로 이동 : </span><br>'
        content += 'https://i02a106.p.ssafy.io/study/'+study_id
    }
    //전송
    send_mail(user_email, title, content);
    res.send("메일 발송 완료")
}

export const notice_drop = (req,res) => {
    connect_smtp();
    const {user_email, study_name, study_id}  = req.body;

    let title = '스터디 탈퇴 안내'
    let content = '<h1>'+study_name+' 에서 탈퇴 당하셨습니다..</h1>'
    content += '<span>스터디로 이동 : </span><br>'
    content += 'https://i02a106.p.ssafy.io/study/'+study_id

    //전송
    send_mail(user_email, title, content);
    res.send("메일 발송 완료")
}



