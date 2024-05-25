import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2";

// database connection
const conn = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "atulya",
    database: "translation"
});

if (conn){
  console.log("Database connected");
}else{
  console.log("Database not connected");
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());
app.set(express.static('public'));

app.get("/", (req, res) => {
  try{
    const sql = "select * from translation_middle_school";
    conn.query(sql,(err,data)=>{
      if(err){
        res.status(500).json({
          message: err.message
        });
      }else{
        res.status(200).json(data);
      }
    });
  }catch(err){
    res.status(500).json({
      message: err.message
    });
  }
});

app.post("/add",(req,res)=>{
  try{
    const {chapter_no,sructure_no,structure_name,anubada_example} = req.body;
    const sql = "INSERT INTO translation_middle_school (chapter_no,sructure_no,structure_name,anubada_example) VALUES (?,?,?,?)";
    conn.query(sql,[chapter_no,sructure_no,structure_name,anubada_example],(err,result)=>{
      if(err){
        res.status(500).json({
          message: err.message
        });
      }else{
        res.status(200).json({
          message: "Data added successfully"
        });
      }
    });
  }catch(err){
    res.status(500).json({
      message: err.message
    });
  }
});

app.delete("/transalte/:chapter_no",(req,res)=>{
  try{
    const {chapter_no} = req.params;
    const sql = "DELETE FROM translation_middle_school WHERE chapter_no =?";
    conn.query(sql,[chapter_no],(err,result)=>{
      if(err){
        res.status(500).json({
          message: err.message
        });
      }else{
        if(result.affectedRows == 0){
          res.status(404).json({
            message: "Data not found"
          })
        
        }else{
          res.status(200).json({
            message: "Data deleted successfully"
          });
        }
      }
    });
  }catch(err){
    res.status(500).json({
      message:err.message
    });
  }
});

app.get("/transalte/:chapter_no",(req,res)=>{
  try{
    const {chapter_no} = req.params;
    const sql = "select * from translation_middle_school where chapter_no=? ";
    conn.query(sql,[chapter_no],(err,data)=>{
      if(err){
        res.status(500).json({
          message: err.message
        });
      }else{
        if(data.affectedRows == 0){
          res.status(404).json({
            message: "Data not found"
          })
        }else{
          res.status(200).json(data);
        }
      }
    });
  }catch(err){
    res.status(500).json({
      message: err.message
    });
  }
});

app.patch("/transalte/:chapter_no",(req,res)=>{
  try{
    const { chapter_no } = req.params;
    const {sructure_no,structure_name,anubada_example} = req.body;
    const sql = "UPDATE translation_middle_school SET sructure_no=?,structure_name=?,anubada_example=? WHERE chapter_no=?";
    conn.query(sql,[sructure_no,structure_name,anubada_example,chapter_no],(err,result)=>{
      if(err){
        res.status(500).json({
          message: err.message
        });
      }else{
        if(result.affectedRows == 0){
          res.status(404).json({
            message: "Data not found"
          })
        }else{
          res.status(200).json({
            message: "Data updated successfully"
          });
        }
      }
    });
  }catch(err){
    if(err){
      res.status(500).json({
        message: err.message
      });
    }
  }
});


app.listen(3000, () => console.log("Example app listening on port 3000!"));