import dotenv from "dotenv";
import express from "express";
import sql from "./db.js";
import path, { parse } from "path";
import { resolve } from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

function generateRoomCode(length = 6){
    let code = "";
    for(let i = 0; i < length;i++){
        code += Math.floor(Math.random() * 9)+1; 
    }
    return code;
}



app.get("/", async(req,res)=>{
    try{
        const result = await sql`SELECT 1`;
        res.json(result);
    } catch (err){
        console.error(err);
        res.status(500).send("DB error");
    }
});




app.post("/create-room", async(req,res)=>{
    const {users} = req.body;

    try{
        let roomCode;
        let exists = true;
        while(exists){
            roomCode = generateRoomCode();
            const check = await sql`
            SELECT * FROM rooms 
            WHERE room_code = ${roomCode};
            `
            if(check.length === 0){
                exists = false;
            }

        }
        
        const room = await sql`
        INSERT INTO rooms(room_code)
        VALUES (${roomCode})
        RETURNING *
        `
        const roomId = room[0].id;

        for(let user of users){

            if (!user.username || !user.password) {
            return res.status(400).json({
            error: "Username and password required",
            });
        }

            await sql`
            INSERT INTO users(room_id, username, password)
            VALUES (${roomId}, ${user.username}, ${user.password})
            `;
        }
        res.json({
            roomCode,
            message: "Room created successfully",
        });
    } catch (err){
        console.error("CREATE ROOM ERROR: ", err);
        res.status(500).json({
            error: "Server error"
        });
    }
});







app.post("/join-room", async(req,res)=>{
    const {roomCode, password} = req.body;
    try{
        let room = await sql`
        SELECT * FROM rooms
        WHERE room_code = ${roomCode}
        `;
        if(room.length === 0){
            // room does not exists;
            return res.status(404).json({
                error:"Room Code or Password is incorrect",
            });
        }
        const roomId = room[0].id;
            
        let user = await sql`
        SELECT id, username FROM users
        WHERE room_id = ${roomId} AND password = ${password}
        `;

        console.log(user);

        if(user.length === 0){
            // room does not exists;
            return res.status(404).json({
                error:"Room Code or Password is incorrect",
            });
        }

        
        res.json({
            roomId,
            userId: user[0].id,
            username : user[0].username
        });
        }
    catch (err){
        console.error(err);
        res.status(500).json({error: "Server error"});
    }
})



app.post("/send-message", async(req,res)=>{
    console.log(req.body);
    const ciphertext = req.body.ciphertext;
    
    const iv = req.body.iv;
    const roomId = parseInt(req.body.roomId);
    const userId = parseInt(req.body.userId);
    
    console.log("BODY:", req.body);
    try{

        if(!roomId || !userId || !ciphertext){
            return res.status(400).json({
            error: "Missing required field",
        });
    }

    await sql`
    INSERT INTO messages(room_id, user_id, ciphertext, iv) 
    VALUES (${roomId}, ${userId}, ${ciphertext}, ${iv})
    `
    res.json({success: true});
    } catch(err){
        console.error("Send Error: ", err)
        res.status(500).json({ error: "Error in sending message"});
    }
});


app.get("/messages/:roomId", async(req,res)=>{
    const { roomId } = req.params;
    try{
        if(!roomId){
            return res.status(400).json({
                error: "Room ID required",
            });
        }
        const messages = await sql`
        SELECT m.id,m.ciphertext,m.created_at,u.username, m.iv
        FROM messages m
        JOIN users u ON m.user_id = u.id
        JOIN rooms r ON m.room_id = r.id
        WHERE m.room_id = ${roomId}
        ORDER BY m.created_at ASC
        `;
        res.json(messages);
    } catch(err){
        console.error("Fetch Error: ", err);
        res.status(500).json({error: "Error fetching messages"});
    }
});

app.get("/room-users/:roomId", async (req, res) => {
  const { roomId } = req.params;

  try {
    const users = await sql`
      SELECT username FROM users WHERE room_id = ${roomId}
    `;

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(5000,()=>{
    console.log("server is running on port 5000");
});