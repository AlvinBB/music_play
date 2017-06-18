/**
 * Created by Web on 2017/6/18.
 */
const pool = require("./pool")
const qs = require("querystring")

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
                                var str = `{"code":200,"uname":"${result[0].uname}"}`
                                res.json(str)
                            }else{
                                res.json('{"code":100,"msg":"失败"}')
                            }
                            conn.release();
                        }
                    )
                }
            })
        })
    }
}