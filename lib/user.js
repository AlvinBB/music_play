/**
 * Created by Web on 2017/6/18.
 */
//创建用户相关请求处理模块
const pool = require("./pool")

module.exports = {
    login:(req,res)=>{
        req.on('data',(buf)=>{
            let obj = JSON.parse(buf.toString())
            let uname = obj.uname,
                upwd = obj.upwd;
            pool.getConnection((err,conn)=>{
                if(err){
                    console.log(err)
                }else{
                    conn.query(
                        "SELECT * FROM m_user WHERE uname=? AND upwd=?",
                        [uname,upwd],
                        (err,result)=>{
                            if(result.length){
                                var str = `{"code":1,"uname":"${result[0].uname}","uhead":"${result[0].uhead}"}`
                                res.json(str)
                            }else{
                                res.json('{"code":-1,"msg":"失败"}')
                            }
                            conn.release();
                        }
                    )
                }
            })
        })
    }
}