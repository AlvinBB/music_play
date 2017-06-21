/**
 * Created by 76419 on 2017/6/18.
 */
const pool = require("./pool")

module.exports = {
    //获取歌曲列表
    getListsSongs:(req,res)=>{
        req.on('data',(buf)=>{
            let obj = JSON.parse(buf.toString())
            let lid = obj.lid
            pool.getConnection((err,conn)=>{
                if(err){
                    console.log(err)
                }else{
                    conn.query(
                        "SELECT * FROM m_song WHERE sid in(SELECT sid FROM m_list_song WHERE lid=?)",
                        [lid],
                        (err,result)=>{
                            if(err){
                                console.log(err)
                            }else if(result.length){
                                let data=JSON.stringify(result)
                                res.json(data)
                            }else{
                                res.json('{"code":-1,"msg":"请求歌单失败"}')
                            }
                            conn.release();
                        }
                    )
                }
            })
        })
    }
}